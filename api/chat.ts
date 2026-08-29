const ROM_SYSTEM_PROMPT = `You are Rom, an intelligent, helpful, and friendly AI assistant embedded in the personal portfolio website of Ron Marquez.
Your primary role is to answer inquiries from prospective clients, recruiters, hiring managers, and visitors about Ron's professional background, skills, work history, projects, certifications, and availability.

### About Ron Marquez:
- **Full Name**: Ron Marquez
- **Current Title**: Systems Developer & Software Engineer
- **Core Specialization**: Building modern enterprise internal systems, web & mobile applications, automated business workflows, and API integrations.
- **Location**: Antipolo City, Philippines
- **Direct Email**: marquez.ronrons@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/ronmarquez/
- **GitHub**: https://github.com/mrqz-rn

### Work Experience:
1. **Power Mac Center** (Aug 2025 — Present)
   - Role: Systems Developer (Full-time)
   - Focus: Internal enterprise solutions, ticketing system (Basecamp TMS), HR & inventory automation tools, database optimizations, and cross-platform API integrations.
2. **WMedLaw** (July 2026 — Present)
   - Role: Website Support Specialist (Part-time / Remote)
   - Focus: Client-facing web platforms, performance optimization, UI/UX maintenance, and technical support.
3. **SL Agritech Corporation** (July 2023 — June 2025, 2 yrs)
   - Role: Programmer (Full-time)
   - Focus: Developed enterprise resource planning (ERP) modules, seed inventory & logistics tracking systems, MariaDB/MySQL database design, and internal developer tools.
4. **Volenday Philippines Inc.** (Feb 2023 — April 2023, 3 mos)
   - Role: AHAmatic Engineer (Intern / Contract)
   - Focus: Business process automation, script development, and workflow optimization.

### Key Production Projects:
1. **Basecamp TMS (Training Monitoring System)**:
   - Web-based enterprise platform streamlining the scheduling, tracking, and reporting of training activities across teams.
   - Built with role-based access control (Trainer, Supervisor, Assistant Supervisor, Manager, Director, Guest), calendar view, and custom OTRS integration to convert training requests into records.
   - Tech: Vue.js, Laravel, MariaDB, OTRS Integration, Tailwind CSS.

2. **SWFS (Sterling Workforce System)**:
   - A modern enterprise HRIS and payroll solution built for Sterling Paper Group of Companies to replace legacy systems.
   - Ron led the implementation of major system modules including BIR Tax Computation, Alphalist Generation, Employee Clearance Processing, and Last Pay Computation.
   - Restructured data models to boost system performance and led legacy database migration.
   - Tech: Vue.js, PHP (CodeIgniter), MariaDB.

3. **SPOTT (Sterling Paper Online Time Tracker)**:
   - Mobile and web application serving as a digital Daily Time Record (DTR) for employees to track work hours accurately.
   - Ron served as Lead Developer, building RESTful APIs for user attendance logs (attlogs) and transition from manual to digital timekeeping.
   - Tech: Ionic, Vue.js, CodeIgniter, MariaDB.

4. **ESS-PORTAL (Employee Self-Service Portal)**:
   - Centralized self-service portal for employees and HR teams for timekeeping and request filing, integrated with SPOTT attendance logs.
   - Tech: Vue.js, CodeIgniter, MySQL.

5. **OBS (Onboarding System)**:
   - Streamlines recruitment and onboarding from job posting and applications to new hire onboarding.
   - Tech: Vue.js, CodeIgniter, MySQL.

6. **Asia CEO Forum Website**:
   - Modernized website for the premier national business event series in the Philippines.
   - Tech: Next.js, NoSQL.

### Technical Arsenal:
- **Languages**: PHP, TypeScript, JavaScript, SQL, HTML5, CSS3, Python, C#
- **Frameworks & Libraries**: Vue.js, React, Next.js, Node.js, Laravel, CodeIgniter, Express, Ionic, Tailwind CSS
- **Databases**: MySQL, MariaDB, SQLite, PostgreSQL
- **Cloud & DevOps**: AWS (EC2, S3, RDS), Git, Linux, Docker, CI/CD, Vercel

### Official Certifications:
- **AWS Cloud Practitioner Essentials** (AWS, 2026)
- **Lean Six Sigma White Belt** (Council for Six Sigma Certification, 2026)
- **Atlassian Agile Project Management Professional Certificate** (Atlassian, 2025)
- **Technical Support Fundamentals** (Google / Coursera, 2022)
- **IP Addressing and Subnetting** (Udemy, 2022)
- **Cisco Networking Foundation: Fundamentals of Cisco Networking** (LinkedIn, 2022)
- **Computer System Servicing NC II** (TESDA, 2019)

### Guidelines for Responses:
- Speak as **Rom**, Ron's virtual AI assistant. Be courteous, concise, professional, and enthusiastic.
- When asked about specific projects like **SWFS**, **SPOTT**, **Basecamp TMS**, **ESS-PORTAL**, **OBS**, explain their purpose, technologies, and Ron's exact contributions.
- Format responses clearly with markdown formatting (bullet points, bold text, links).
- When asked about hiring or contacting Ron, provide his email (marquez.ronrons@gmail.com) and LinkedIn link.
`;

function generateKnowledgeReply(lastUserMessage: string): string {
  const query = (lastUserMessage || "").toLowerCase().trim();

  // SWFS
  if (
    query.includes("swfs") ||
    query.includes("sterling workforce") ||
    query.includes("workforce system")
  ) {
    return (
      `**SWFS (Sterling Workforce System)** is an enterprise HRIS and payroll solution built to replace legacy systems at Sterling Paper Group of Companies:\n\n` +
      `• **Purpose**: Improves efficiency, accuracy, and user experience in managing employee data, timekeeping, and payroll processing.\n` +
      `• **Ron's Key Contributions**:\n` +
      `  - Led the implementation of major system modules including **BIR Tax Computation**, **Alphalist Generation**, **Employee Clearance Processing**, and **Last Pay Computation**.\n` +
      `  - Restructured data models and business process flows to significantly enhance database performance and system response time.\n` +
      `  - Led the migration of legacy data from the old payroll system to the new database structure, ensuring 100% data integrity.\n` +
      `• **Tech Stack**: Vue.js, PHP (CodeIgniter), MariaDB.`
    );
  }

  // SPOTT
  if (
    query.includes("spott") ||
    query.includes("time tracker") ||
    query.includes("online time") ||
    query.includes("dtr")
  ) {
    return (
      `**SPOTT (Sterling Paper Online Time Tracker)** is a mobile and web application developed for Sterling Paper Group of Companies:\n\n` +
      `• **Purpose**: Enables employees to track working hours accurately, serving as a digital Daily Time Record (DTR) and streamlining attendance logging.\n` +
      `• **Ron's Key Contributions**:\n` +
      `  - Served as **Lead Developer** overseeing development and architecture.\n` +
      `  - Built robust RESTful APIs dedicated to handling user profiles and attendance logs (attlogs).\n` +
      `  - Collaborated directly with the HR team to transition from manual paper timekeeping to a fully digitalized workflow.\n` +
      `• **Tech Stack**: Ionic, Vue.js, CodeIgniter, MariaDB.`
    );
  }

  // ESS-PORTAL
  if (
    query.includes("ess") ||
    query.includes("self-service") ||
    query.includes("self service") ||
    query.includes("portal")
  ) {
    return (
      `**ESS-PORTAL (Employee Self-Service Portal)** is a centralized platform built for employee timekeeping and HR request filing:\n\n` +
      `• **Purpose**: Provides employees with a self-service hub to view attendance, file requests, and manage leave credits.\n` +
      `• **Ron's Key Contributions**: Implemented the process integration for employee Daily Time Record (DTR) logs in connection with the SPOTT application, automatically converting raw attendance logs into formatted DTR records for HR compliance and payroll.\n` +
      `• **Tech Stack**: Vue.js, CodeIgniter, MySQL.`
    );
  }

  // OBS
  if (
    query.includes("obs") ||
    query.includes("onboarding") ||
    query.includes("recruitment")
  ) {
    return (
      `**OBS (Onboarding System)** is an internal HR platform that manages the end-to-end recruitment and employee onboarding workflow:\n\n` +
      `• **Purpose**: Facilitates every stage of hiring—from job postings and applicant screening through to new hire onboarding.\n` +
      `• **Ron's Key Contributions**: Restructured data models to align with organizational hierarchy and integrated the system with the core HRIS platform.\n` +
      `• **Tech Stack**: Vue.js, CodeIgniter, MySQL.`
    );
  }

  // Basecamp TMS
  if (
    query.includes("tms") ||
    query.includes("basecamp") ||
    query.includes("training")
  ) {
    return (
      `**Basecamp TMS (Training Monitoring System)** is a premier enterprise internal platform developed by Ron at Power Mac Center:\n\n` +
      `• **Purpose**: Streamlines training scheduling, tracking, and reporting across teams.\n` +
      `• **Key Features Developed by Ron**:\n` +
      `  - Built role-based access control governing 6 distinct roles.\n` +
      `  - Developed Calendar View module with meeting/leave tracking.\n` +
      `  - Engineered custom **OTRS integration** converting client training requests into official records.\n` +
      `  - Built reporting & analytics with PDF/Excel/CSV exports and Google Drive submission.\n` +
      `• **Tech Stack**: Vue.js, Laravel, MariaDB, OTRS Integration, Tailwind CSS.`
    );
  }

  // Contact
  if (
    query.includes("contact") ||
    query.includes("hire") ||
    query.includes("email") ||
    query.includes("reach") ||
    query.includes("touch") ||
    query.includes("linkedin") ||
    query.includes("available")
  ) {
    return (
      `You can connect with Ron directly through the following channels:\n\n` +
      `• **Email**: [marquez.ronrons@gmail.com](mailto:marquez.ronrons@gmail.com)\n` +
      `• **LinkedIn**: [linkedin.com/in/ronmarquez](https://www.linkedin.com/in/ronmarquez/)\n` +
      `• **GitHub**: [github.com/mrqz-rn](https://github.com/mrqz-rn)\n` +
      `• **Location**: Antipolo City, Philippines\n\n` +
      `Ron is open to discussions regarding new systems development opportunities, enterprise automation, and custom software projects!`
    );
  }

  // Skills
  if (
    query.includes("skill") ||
    query.includes("tech") ||
    query.includes("stack") ||
    query.includes("language") ||
    query.includes("framework") ||
    query.includes("tools") ||
    query.includes("arsenal")
  ) {
    return (
      `Here is a summary of Ron's **Technical Arsenal**:\n\n` +
      `• **Frontend**: Vue.js, React, Next.js, TypeScript, JavaScript, Tailwind CSS, Bootstrap, Ionic\n` +
      `• **Backend & APIs**: PHP (Laravel, CodeIgniter), Node.js, Express, Python, C#\n` +
      `• **Databases**: MySQL, MariaDB, SQLite, PostgreSQL\n` +
      `• **Cloud & Tools**: AWS (EC2, S3, RDS), Git, Docker, Linux, CI/CD, Vite, Vercel\n\n` +
      `He specializes in architecting clean, maintainable systems with automated business workflows.`
    );
  }

  // Experience
  if (
    query.includes("experience") ||
    query.includes("job") ||
    query.includes("work") ||
    query.includes("career") ||
    query.includes("history") ||
    query.includes("company") ||
    query.includes("companies")
  ) {
    return (
      `Ron has over **3+ years of professional experience** in systems development and software engineering:\n\n` +
      `1. **Power Mac Center** *(Aug 2025 — Present)*\n` +
      `   • **Systems Developer** — Developed internal enterprise systems, the Basecamp TMS platform, automated HR/inventory workflows, and API integrations.\n\n` +
      `2. **WMedLaw** *(July 2026 — Present)*\n` +
      `   • **Website Support Specialist** — Maintained client-facing web infrastructure, optimized performance, and provided technical support.\n\n` +
      `3. **SL Agritech Corporation** *(July 2023 — June 2025 · 2 yrs)*\n` +
      `   • **Programmer** — Built ERP modules, agricultural inventory tracking systems, and automated logistics databases.\n\n` +
      `4. **Volenday Philippines Inc.** *(Feb 2023 — April 2023 · 3 mos)*\n` +
      `   • **AHAmatic Engineer** — Created workflow automation scripts and business bots.`
    );
  }

  // Projects list
  if (
    query.includes("project") ||
    query.includes("app") ||
    query.includes("system") ||
    query.includes("built")
  ) {
    return (
      `Here are Ron's primary enterprise production platforms:\n\n` +
      `1. **Basecamp TMS** (Training Monitoring System): Training management and scheduling with OTRS integration (Vue.js, Laravel, MariaDB).\n` +
      `2. **SWFS** (Sterling Workforce System): Comprehensive HRIS & payroll solution with BIR Tax, Alphalist, and Last Pay computation (Vue.js, CodeIgniter, MariaDB).\n` +
      `3. **SPOTT** (Sterling Paper Online Time Tracker): Mobile & web Daily Time Record (DTR) app (Ionic, Vue.js, CodeIgniter).\n` +
      `4. **ESS-PORTAL** (Employee Self-Service Portal): Centralized timekeeping and HR portal integrated with SPOTT logs (Vue.js, CodeIgniter, MySQL).\n` +
      `5. **OBS** (Onboarding System): Full recruitment and new-hire onboarding platform (Vue.js, CodeIgniter, MySQL).\n` +
      `6. **Asia CEO Forum**: Modernized Next.js platform for national business event series.\n\n` +
      `Ask me about any specific project (e.g. *"What is SWFS?"* or *"Tell me about SPOTT"*) for more details!`
    );
  }

  // Certifications
  if (
    query.includes("cert") ||
    query.includes("credential") ||
    query.includes("aws") ||
    query.includes("six sigma") ||
    query.includes("atlassian") ||
    query.includes("tesda")
  ) {
    return (
      `Ron holds several industry certifications:\n\n` +
      `• **AWS Cloud Practitioner Essentials** (AWS, 2026)\n` +
      `• **Lean Six Sigma White Belt** (Council for Six Sigma Certification, 2026)\n` +
      `• **Atlassian Agile Project Management Professional Certificate** (Atlassian, 2025)\n` +
      `• **Technical Support Fundamentals** (Google / Coursera, 2022)\n` +
      `• **IP Addressing and Subnetting** (Udemy, 2022)\n` +
      `• **Cisco Networking Foundation** (LinkedIn, 2022)\n` +
      `• **Computer System Servicing NC II** (TESDA, 2019)`
    );
  }

  return (
    `**Ron Marquez** is a Systems Developer based in Antipolo City, Philippines.\n\n` +
    `He specializes in architecting enterprise systems, scalable web applications, and automated digital workflows. With over 3+ years of experience across Power Mac Center, WMedLaw, SL Agritech, and Volenday, he builds software solutions that solve real business problems.\n\n` +
    `Feel free to ask me about his **experience**, **technical stack**, **projects (like SWFS, Basecamp TMS, SPOTT)**, or how to **get in touch** at [marquez.ronrons@gmail.com](mailto:marquez.ronrons@gmail.com)!`
  );
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body || {};
  const lastUserMessage = Array.isArray(messages) && messages.length > 0 
    ? (messages[messages.length - 1]?.content || "") 
    : "";

  const groqKey = process.env.GROQ_API_KEY || req.headers["x-groq-key"];
  const geminiKey = process.env.GEMINI_API_KEY || req.headers["x-gemini-key"];
  const claudeKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY || req.headers["x-api-key"];

  // Option 1: Groq API (Blazing Fast Inference)
  if (groqKey) {
    try {
      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "groq/compound-mini",
          messages: [
            { role: "system", content: ROM_SYSTEM_PROMPT },
            ...(messages || []).map((m: any) => ({
              role: m.role === "assistant" ? "assistant" : "user",
              content: m.content
            }))
          ],
          max_tokens: 1024
        })
      });

      if (groqRes.ok) {
        const groqData = await groqRes.json();
        const reply = groqData.choices?.[0]?.message?.content;
        if (reply) {
          return res.status(200).json({ reply, provider: "groq" });
        }
      } else {
        const err = await groqRes.text();
        console.warn("Groq API note:", err);
      }
    } catch (e) {
      console.warn("Groq request error:", e);
    }
  }

  // Option 2: Gemini API
  if (geminiKey) {
    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: ROM_SYSTEM_PROMPT }]
            },
            contents: (messages || []).map((m: any) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }]
            }))
          })
        }
      );

      if (geminiRes.ok) {
        const geminiData = await geminiRes.json();
        const geminiReply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (geminiReply) {
          return res.status(200).json({ reply: geminiReply, provider: "gemini" });
        }
      }
    } catch (e) {
      console.warn("Gemini API call failed:", e);
    }
  }

  // Option 3: Claude API
  if (claudeKey) {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": claudeKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-3-5-haiku-20241022",
          max_tokens: 1024,
          system: ROM_SYSTEM_PROMPT,
          messages: (messages || []).map((m: any) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.content?.[0]?.text;
        if (reply) {
          return res.status(200).json({ reply, provider: "claude" });
        }
      }
    } catch (error: any) {
      console.warn("Claude API call failed:", error);
    }
  }

  // Fallback: Built-in Knowledge Engine
  const fallback = generateKnowledgeReply(lastUserMessage);
  return res.status(200).json({ reply: fallback, provider: "knowledge_engine" });
}
