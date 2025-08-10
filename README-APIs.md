# Skol Sisters API & RSS Setup

## Endpoints
- `POST /api/subscribe` — Adds email to Mailchimp or ConvertKit. Falls back to Resend notif or Logs to Google Apps Script. Redirects back to `/subscribe?ok=1` on success (form posts).
- `POST /api/start-sit` — Captures lineup questions. Emails via Resend and/or logs to Google Apps Script. Redirects back to `/start-sit?ok=1`.
- `GET /feed.xml` — Podcast RSS feed from `data/episodes.json` (adds `<enclosure>` if `audio` URL is present).

## Environment
Copy `.env.example` to Vercel Project → Settings → Environment Variables.

**Mailchimp (recommended)**
- `MAILCHIMP_API_KEY` (e.g. `us21-xxxx`)
- `MAILCHIMP_DC` (e.g. `us21`)
- `MAILCHIMP_LIST_ID`

**or ConvertKit**
- `CONVERTKIT_API_KEY`
- `CONVERTKIT_FORM_ID`

**Optional logging + notifications**
- `GOOGLE_APPS_SCRIPT_WEBAPP_URL`
- `RESEND_API_KEY`
- `NOTIFY_EMAIL_TO`
- `NOTIFY_EMAIL_FROM` (e.g., `Skol Sisters <no-reply@theskolsisters.com>`)

## Importing
Add these files to your repo and deploy. The Subscribe and Start/Sit pages already POST to the new endpoints and show success banners on redirect.

## Podcast Feed
Populate `data/episodes.json` with `audio` URLs. Each episode becomes an RSS `<item>`. Submit `https://theskolsisters.com/feed.xml` to directories if self-hosting audio; otherwise link out from episode pages.
