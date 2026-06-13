# Cloud Function: заявка → Telegram

Обработчик формы заявки. Сайт статический и шлёт `fetch POST` (JSON) на публичный URL
этой функции; функция валидирует данные и пересылает их в Telegram. Токен бота на сайт
не попадает — он живёт только в переменных окружения функции.

## Деплой (Яндекс Cloud Functions)

- **Runtime:** `nodejs18` (или новее) — нужен встроенный `fetch`.
- **Точка входа:** `index.handler`
- **Файлы:** `index.js`, `package.json` (внешних зависимостей нет).
- Функцию сделать **публичной** (разрешить вызов без авторизации) и вызывать по её URL
  (или через API Gateway).

## Переменные окружения

| Переменная           | Описание                                  |
| -------------------- | ----------------------------------------- |
| `TELEGRAM_BOT_TOKEN` | Токен бота (от @BotFather).               |
| `TELEGRAM_CHAT_ID`   | ID чата/канала для уведомлений о заявках.  |

Как получить `chat_id`: написать боту, открыть
`https://api.telegram.org/bot<TOKEN>/getUpdates` и взять `message.chat.id`.

## Контракт запроса

`POST` с телом JSON:

```json
{
  "name": "Имя",
  "phone": "+7 (903) 123-45-67",
  "contactMethod": "call | whatsapp | telegram",
  "page": "https://site/...",
  "utm": { "utm_source": "..." }
}
```

Ответы: `200 { ok: true }` — принято; `400` — невалидно; `502` — ошибка Telegram;
`500` — не заданы переменные окружения. Preflight `OPTIONS` → `200` с CORS-заголовками.

## CORS

Сейчас `Access-Control-Allow-Origin: *`. После привязки домена сузить значение
`ALLOWED_ORIGIN` в `index.js` до адреса сайта.

## После деплоя

Вставить URL функции в `.env` сайта:

```
PUBLIC_LEAD_ENDPOINT="https://<URL функции>"
```
