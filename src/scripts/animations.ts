/**
 * animations.ts — инициализация GSAP-анимаций. Загружается ЛЕНИВО (после первого
 * скролла или простоя) и только если пользователь не просил reduced-motion.
 *
 * Принципы:
 *  - Скрытые стартовые состояния (opacity:0, сдвиг) ставит ТОЛЬКО GSAP здесь, в рантайме.
 *    В разметке/CSS их нет → без JS контент полностью видим.
 *  - Элементы, уже видимые на момент загрузки, не прячем (без мигания).
 *  - Все scroll-триггеры once:true. Анимируем только transform/opacity (+ счётчики текста).
 */

interface CounterParts {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  hasComma: boolean;
}

/** Разбирает строку вида «1,9 млрд ₽», «214», «+28%», «32 дня» на префикс/число/суффикс. */
function parseCounter(text: string): CounterParts | null {
  const match = text.match(/^(\D*?)(\d+(?:,\d+)?)(.*)$/s);
  if (!match) return null;
  const prefix = match[1];
  const raw = match[2];
  const suffix = match[3];
  const hasComma = raw.includes(',');
  const cleaned = raw.replace(',', '.');
  const target = Number.parseFloat(cleaned);
  if (Number.isNaN(target)) return null;
  const decimals = hasComma ? (cleaned.split('.')[1]?.length ?? 0) : 0;
  return { prefix, suffix, target, decimals, hasComma };
}

function formatNumber(value: number, decimals: number, hasComma: boolean): string {
  const fixed = value.toFixed(decimals);
  return hasComma ? fixed.replace('.', ',') : fixed;
}

export async function initAnimations(): Promise<void> {
  // Доп. защита: даже если модуль как-то загрузился — уважаем reduced-motion.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  const viewportH = window.innerHeight;
  const REVEAL = { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' } as const;

  // 1. Одиночные появления
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top < viewportH) return; // уже видим — не прячем
    gsap.from(el, {
      ...REVEAL,
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    });
  });

  // 1b. Группы со stagger
  gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = gsap.utils.toArray<HTMLElement>(group.querySelectorAll('[data-reveal-item]'));
    if (items.length === 0) return;
    if (group.getBoundingClientRect().top < viewportH) return;
    gsap.from(items, {
      ...REVEAL,
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: 'top 80%', once: true },
    });
  });

  // 2. Счётчики чисел
  gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
    const parts = parseCounter(el.textContent ?? '');
    if (!parts) return;
    // Резервируем ширину по финальному значению — цифры не прыгают и не двигают соседей
    el.style.display = 'inline-block';
    el.style.minWidth = `${Math.ceil(el.getBoundingClientRect().width)}px`;
    const proxy = { value: 0 };
    gsap.to(proxy, {
      value: parts.target,
      duration: 1.2,
      ease: 'power1.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => {
        el.textContent = parts.prefix + formatNumber(proxy.value, parts.decimals, parts.hasComma) + parts.suffix;
      },
      onComplete: () => {
        el.textContent = parts.prefix + formatNumber(parts.target, parts.decimals, parts.hasComma) + parts.suffix;
      },
    });
  });

  // 3. Hero-параллакс: фоновый SVG-план (форму не трогаем)
  const heroPlan = document.querySelector('.hero-plan');
  const hero = document.querySelector('#hero');
  if (heroPlan && hero) {
    gsap.to(heroPlan, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  // 4. Чертёжная линия: прорисовывается по скроллу через stroke-dashoffset
  const line = document.querySelector('[data-draft-line]');
  const main = document.querySelector('#main');
  if (line && main) {
    gsap.set(line, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.to(line, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: { trigger: main, start: 'top top', end: 'bottom bottom', scrub: 0.5 },
    });
  }

  ScrollTrigger.refresh();
}
