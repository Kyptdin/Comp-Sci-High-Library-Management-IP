import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// API Key for resend put in env later
const RESEND_API_KEY = "re_fC2bHA2D_Fnxw9HMKW2LhNJxcr8FBSW2Z";

const handler = async (): Promise<Response> => {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "isaac@isaacstar.com",
      to: "hammond.gyamfi24@compscihigh.org",
      subject: "hello world",
      html: "<strong>it works!</strong>",
    }),
  });

  if (res.ok) {
    const data = await res.json();
    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    // Handle the case where the fetch request isn't successful
    return new Response("Failed to send email", { status: 500 });
  }
};

Deno.cron("sample cron", "* * * * *", () => {
  // handler();
});
