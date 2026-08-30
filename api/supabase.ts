export const config = {
  runtime: "edge",
};

const SUPABASE_ORIGIN = "https://vgnfvkycjdckedpifcyl.supabase.co";

export default async function handler(req: Request) {
  const incomingUrl = new URL(req.url);

  // Target URL preserving pathname and query parameters
  const targetUrl = new URL(incomingUrl.pathname + incomingUrl.search, SUPABASE_ORIGIN);

  // Clone headers and overwrite Host for Supabase
  const headers = new Headers(req.headers);
  headers.set("Host", "vgnfvkycjdckedpifcyl.supabase.co");

  // Clean edge headers that could cause conflicts with Supabase's Cloudflare layer
  headers.delete("cf-connecting-ip");
  headers.delete("cf-ipcountry");
  headers.delete("cf-ray");
  headers.delete("cf-visitor");
  headers.delete("x-forwarded-for");
  headers.delete("x-forwarded-proto");
  headers.delete("x-vercel-id");

  // Read body for mutating methods
  let body: BodyInit | undefined = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.arrayBuffer();
  }

  try {
    const upstreamRes = await fetch(targetUrl.toString(), {
      method: req.method,
      headers: headers,
      body: body,
      redirect: "manual",
    });

    const responseHeaders = new Headers(upstreamRes.headers);

    // If Supabase issues a redirect pointing to raw supabase domain, rewrite it to current host
    const location = responseHeaders.get("Location");
    if (location && location.includes("vgnfvkycjdckedpifcyl.supabase.co")) {
      responseHeaders.set(
        "Location",
        location.replace("vgnfvkycjdckedpifcyl.supabase.co", incomingUrl.host)
      );
    }

    return new Response(upstreamRes.body, {
      status: upstreamRes.status,
      statusText: upstreamRes.statusText,
      headers: responseHeaders,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Supabase proxy error" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
