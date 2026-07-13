/**
 * animations.ts — появление блоков, счётчики и лёгкий параллакс.
 *
 * АРХИТЕКТУРА (тут была причина бага «контент невидим на проде»):
 *  - Контент в CSS виден ВСЕГДА. Скрытие включается только классом `js-ready`
 *    на <html>, который ставится синхронно в <head> — то есть лишь тогда,
 *    когда JS точно исполняется.
 *  - Показ делает нативный IntersectionObserver + CSS-переход. Нет зависимости
 *    от сторонней библиотеки: нечему «не догрузиться» и нечему оставить блок
 *    скрытым навсегда.
 *  - Любой сбой → снимаем `js-ready` → контент виден. Плюс аварийный таймер.
 *
 * GSAP/ScrollTrigger больше не нужны (−115 КБ JS).
 */

const VISIBLE = 'is-visible';
const STAGGER_MS = 80;

/** Аварийный выход: снять гейт — весь контент становится видимым. */
function failSafe(): void {
  document.documentElement.classList.remove('js-ready');
}

/* ---------------- Счётчики: «1,9 млрд ₽», «214», «+28%» ---------------- */

interface CounterParts {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  hasComma: boolean;
}

function parseCounter(text: string): CounterParts | null {
  const match = text.match(/^(\D*?)(\d+(?:,\d+)?)(.*)$/s);
  if (!match) return null;
  const raw = match[2];
  const hasComma = raw.includes(',');
  const cleaned = raw.replace(',', '.');
  const target = Number.parseFloat(cleaned);
  if (Number.isNaN(target)) return null;
  return {
    prefix: match[1],
    suffix: match[3],
    target,
    decimals: hasComma ? (cleaned.split('.')[1]?.length ?? 0) : 0,
    hasComma,
  };
}

function formatNumber(value: number, decimals: number, hasComma: boolean): string {
  const fixed = value.toFixed(decimals);
  return hasComma ? fixed.replace('.', ',') : fixed;
}

function runCounter(el: HTMLElement, parts: CounterParts): void {
  const duration = 1200;
  const start = performance.now();
  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) * (1 - progress); // easeOutQuad
    const value = parts.target * eased;
    el.textContent = parts.prefix + formatNumber(value, parts.decimals, parts.hasComma) + parts.suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = parts.prefix + formatNumber(parts.target, parts.decimals, parts.hasComma) + parts.suffix;
  };
  requestAnimationFrame(tick);
}

/* ---------------------------- Инициализация --------------------------- */

export function initAnimations(): void {
  try {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      failSafe();
      return;
    }

    // 1. Появление блоков и групп со stagger
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          revealObserver.unobserve(el);

          const items = el.matches('[data-reveal-group]')
            ? Array.from(el.querySelectorAll<HTMLElement>('[data-reveal-item]'))
            : [];

          if (items.length > 0) {
            items.forEach((item, i) => {
              window.setTimeout(() => item.classList.add(VISIBLE), i * STAGGER_MS);
            });
          } else {
            el.classList.add(VISIBLE);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    );

    document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((el) => revealObserver.observe(el));

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.closest('[data-reveal-group]')) {
        el.classList.add(VISIBLE); // внутри группы — вскроется вместе с ней
        return;
      }
      revealObserver.observe(el);
    });

    // Осиротевшие items вне групп — показываем сразу, чтобы не зависли
    document.querySelectorAll<HTMLElement>('[data-reveal-item]').forEach((el) => {
      if (!el.closest('[data-reveal-group]')) el.classList.add(VISIBLE);
    });

    // 2. Счётчики
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          counterObserver.unobserve(el);
          const parts = parseCounter(el.textContent ?? '');
          if (!parts) return;
          const width = Math.ceil(el.getBoundingClientRect().width);
          if (width > 0) {
            el.style.display = 'inline-block';
            el.style.minWidth = width + 'px';
          }
          runCounter(el, parts);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    );
    document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => counterObserver.observe(el));

    // 3. Лёгкий параллакс фонового плана в hero
    const heroPlan = document.querySelector<HTMLElement>('.hero-plan');
    const hero = document.querySelector<HTMLElement>('#hero');
    if (heroPlan && hero) {
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
            heroPlan.style.transform = 'translate3d(0, ' + (progress * 10).toFixed(2) + '%, 0)';
          }
          ticking = false;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // 4. Страховка: через 4с показать всё, что видимо, но почему-то скрыто
    window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-item]').forEach((el) => {
        if (el.classList.contains(VISIBLE)) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add(VISIBLE);
      });
    }, 4000);
  } catch {
    failSafe();
  }
}
