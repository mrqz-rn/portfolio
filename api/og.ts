const DEMO_POSTS_MAP: Record<string, { title: string; excerpt: string; cover_image: string }> = {
  "enterprise-hris-payroll": {
    title: "Enterprise HRIS & Payroll Architecture: Designing High-Throughput, Fault-Tolerant Workflows",
    excerpt: "Designing high-throughput payroll computation for 5,000 to 10,000+ employees with chunked queue workers, deterministic pure engines, and transport-level field security.",
    cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
  },
  "architecting-enterprise-hris-payroll-systems": {
    title: "Enterprise HRIS & Payroll Architecture: Designing High-Throughput, Fault-Tolerant Workflows",
    excerpt: "Designing high-throughput payroll computation for 5,000 to 10,000+ employees with chunked queue workers, deterministic pure engines, and transport-level field security.",
    cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
  },
  "real-time-queuing-systems-websockets-laravel": {
    title: "Building Real-Time AASP Queue Management with WebSockets & Interactive Kiosks",
    excerpt: "How we engineered a live queue ticketing, dispatching, and waiting area status system for MobileCare service centers.",
    cover_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
  },
  "iot-hardware-prototyping-microcontrollers-cloud": {
    title: "From Hardware to Cloud: Microcontroller Telemetry and IoT System Integration",
    excerpt: "A practical guide to connecting embedded sensors (ESP32 / Arduino) to cloud dashboards and digital automated monitoring.",
    cover_image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80"
  }
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req: any, res: any) {
  let slug = (req.query?.slug || "").toString().toLowerCase().trim();

  // If slug has leading/trailing slashes or includes 'blog/'
  slug = slug.replace(/^\/+|\/+$/g, "").replace(/^blog\//, "");

  let title = "Ron Marquez | Systems Developer";
  let excerpt = "Portfolio of Ron Marquez, a Systems Developer specializing in scalable enterprise systems, web & mobile applications, and digital business workflows.";
  let image = "https://www.ronmarquez.tech/icons/siteicon.png";

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (slug) {
    // Check fallback demo posts first
    if (DEMO_POSTS_MAP[slug]) {
      title = DEMO_POSTS_MAP[slug].title;
      excerpt = DEMO_POSTS_MAP[slug].excerpt;
      image = DEMO_POSTS_MAP[slug].cover_image;
    }

    // Try fetching live post from Supabase REST API
    if (supabaseUrl && supabaseKey) {
      try {
        const cleanBaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
        const queryUrl = `${cleanBaseUrl}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}&select=title,excerpt,cover_image&limit=1`;
        
        const resp = await fetch(queryUrl, {
          headers: {
            "apikey": supabaseKey,
            "Authorization": `Bearer ${supabaseKey}`
          }
        });

        if (resp.ok) {
          const data = await resp.json();
          if (Array.isArray(data) && data.length > 0 && data[0].title) {
            title = data[0].title;
            excerpt = data[0].excerpt || excerpt;
            image = data[0].cover_image || image;
          }
        }
      } catch (err) {
        console.warn("api/og Supabase fetch failed:", err);
      }
    }
  }

  const articleUrl = slug ? `https://ronmarquez.tech/${slug}` : "https://ronmarquez.tech";

  const safeTitle = escapeHtml(title);
  const safeExcerpt = escapeHtml(excerpt);
  const safeImage = escapeHtml(image);
  const safeUrl = escapeHtml(articleUrl);

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle} | Ron Marquez</title>
    <meta name="description" content="${safeExcerpt}" />
    <meta name="author" content="Ron Marquez" />
    <link rel="canonical" href="${safeUrl}" />

    <!-- Open Graph / Facebook / LinkedIn -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${safeUrl}" />
    <meta property="og:title" content="${safeTitle} | Ron Marquez" />
    <meta property="og:description" content="${safeExcerpt}" />
    <meta property="og:image" content="${safeImage}" />
    <meta property="og:site_name" content="Ron Marquez" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${safeUrl}" />
    <meta name="twitter:title" content="${safeTitle} | Ron Marquez" />
    <meta name="twitter:description" content="${safeExcerpt}" />
    <meta name="twitter:image" content="${safeImage}" />

    <!-- Automatic redirect for human visitors who hit this endpoint directly -->
    <meta http-equiv="refresh" content="0;url=${safeUrl}" />
  </head>
  <body style="font-family: sans-serif; padding: 2rem; background: #090d16; color: #fff;">
    <h1>${safeTitle}</h1>
    <p>${safeExcerpt}</p>
    <p><a href="${safeUrl}" style="color: #60a5fa;">Read full article &rarr;</a></p>
    <script>
      window.location.replace("${safeUrl}");
    </script>
  </body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=60, s-maxage=3600");
  return res.status(200).send(html);
}
