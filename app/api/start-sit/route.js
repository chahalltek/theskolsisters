import { NextResponse } from "next/server";

async function notifyResend(subject, text) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  const from = process.env.NOTIFY_EMAIL_FROM || "Skol Sisters <no-reply@theskolsisters.com>";
  if (!key || !to) return { ok: false, reason: "missing-resend-env" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
    body: JSON.stringify({ from, to, subject, text })
  });
  if (res.ok) return { ok: true, provider: "resend" };
  return { ok: false, provider: "resend", status: res.status };
}

async function logToGAS(payload) {
  const url = process.env.GOOGLE_APPS_SCRIPT_WEBAPP_URL;
  if (!url) return { ok: false, reason: "missing-gas-url" };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return { ok: res.ok, status: res.status };
}

export async function POST(request) {
  const contentType = request.headers.get("content-type") || "";
  let email = "", leagueFormat = "", question = "", name = "";
  try {
    if (contentType.includes("application/json")) {
      const body = await request.json();
      email = (body.email || "").trim();
      leagueFormat = (body.leagueFormat || body.format || "").trim();
      question = (body.question || "").trim();
      name = (body.name || "").trim();
    } else {
      const form = await request.formData();
      email = (form.get("email") || "").toString().trim();
      leagueFormat = (form.get("leagueFormat") || form.get("format") || "").toString().trim();
      question = (form.get("question") || "").toString().trim();
      name = (form.get("name") || "").toString().trim();
    }
  } catch {}

  if (!question) return NextResponse.json({ ok: false, error: "missing-question" }, { status: 400 });

  const summary = `Start/Sit request:
Name: ${name || "(n/a)"}
Email: ${email || "(n/a)"}
Format: ${leagueFormat || "(n/a)"}
Question: ${question}`;

  await logToGAS({ type: "start-sit", email, leagueFormat, question, name, ts: new Date().toISOString() });
  await notifyResend("New Start/Sit request", summary);

  if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const url = new URL(request.url);
    url.pathname = "/start-sit";
    url.searchParams.set("ok", "1");
    return NextResponse.redirect(url.toString(), { status: 303 });
  }

  return NextResponse.json({ ok: true });
}// Content of the route.js file goes here
