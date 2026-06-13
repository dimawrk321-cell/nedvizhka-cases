'use strict';

/**
 * Яндекс Cloud Function: приём заявки с сайта и пересылка в Telegram.
 * Точка входа: index.handler. Runtime: nodejs18 или новее (глобальный fetch).
 *
 * Переменные окружения (задаются в настройках функции, НЕ в коде):
 *   TELEGRAM_BOT_TOKEN — токен бота.
 *   TELEGRAM_CHAT_ID   — id чата/канала для уведомлений.
 */

// TODO: после привязки домена сузить до 'https://ваш-домен'
const ALLOWED_ORIGIN = '*';

const CONTACT_LABELS = {
  call: 'Звонок',
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    body: JSON.stringify(payload),
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

module.exports.handler = async function handler(event, context) {
  const method = (
    (event && event.httpMethod) ||
    (event && event.requestContext && event.requestContext.http && event.requestContext.http.method) ||
    'POST'
  ).toUpperCase();

  // CORS preflight
  if (method === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders(), body: '' };
  }
  if (method !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'Method not allowed' });
  }

  // Тело запроса: строка или base64
  let rawBody = (event && event.body) || '';
  if (event && event.isBase64Encoded) {
    rawBody = Buffer.from(rawBody, 'base64').toString('utf-8');
  }

  let data;
  try {
    data = typeof rawBody === 'string' ? JSON.parse(rawBody || '{}') : rawBody || {};
  } catch (e) {
    return jsonResponse(400, { ok: false, error: 'Invalid JSON' });
  }

  const name = String(data.name || '').trim();
  const phone = String(data.phone || '').trim();
  const contactMethod = String(data.contactMethod || '').trim();
  const page = String(data.page || '').trim();
  const utm = data.utm && typeof data.utm === 'object' ? data.utm : {};
  const honeypot = String(data.company || '').trim();

  // Honeypot заполнен — притворяемся успехом, но в Telegram не шлём
  if (honeypot) {
    return jsonResponse(200, { ok: true });
  }

  // Серверная валидация
  const digits = phone.replace(/\D/g, '');
  if (name.length < 2 || digits.length < 10) {
    return jsonResponse(400, { ok: false, error: 'Validation failed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return jsonResponse(500, { ok: false, error: 'Server is not configured' });
  }

  const moscowTime = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

  const lines = [
    '🔔 <b>Новая заявка с сайта</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    `<b>Способ связи:</b> ${escapeHtml(CONTACT_LABELS[contactMethod] || contactMethod || '—')}`,
  ];
  if (page) {
    lines.push(`<b>Страница:</b> ${escapeHtml(page)}`);
  }
  const utmKeys = Object.keys(utm);
  if (utmKeys.length > 0) {
    lines.push('', '<b>UTM:</b>');
    utmKeys.forEach((key) => {
      lines.push(`• ${escapeHtml(key)}: ${escapeHtml(utm[key])}`);
    });
  }
  lines.push('', `🕐 ${escapeHtml(moscowTime)} (МСК)`);

  const text = lines.join('\n');

  try {
    const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
    if (!tgResponse.ok) {
      return jsonResponse(502, { ok: false, error: 'Telegram error' });
    }
  } catch (e) {
    return jsonResponse(502, { ok: false, error: 'Telegram request failed' });
  }

  return jsonResponse(200, { ok: true });
};
