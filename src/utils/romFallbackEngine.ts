/**
 * Intelligent client-side fallback engine for Rom when Claude/Gemini API is offline or out of credits.
 * This guarantees Rom always provides instant, accurate answers about Ron's career.
 */
export function getRomFallbackReply(userQuery: string): string {
  const query = userQuery.toLowerCase().trim();

  // SWFS (Sterling Workforce System)
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

  // SPOTT (Sterling Paper Online Time Tracker)
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

  // ESS-PORTAL (Employee Self-Service Portal)
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

  // OBS (Onboarding System)
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

  // PMCIE LMS (Learning Management System)
  if (
    query.includes("pmcie") ||
    query.includes("lms") ||
    query.includes("learning management")
  ) {
    return (
      `**PMCIE LMS (Learning Management System)** is an enterprise learning management platform built for the PMC Institute for Excellence:\n\n` +
      `• **Purpose**: Centralizes course delivery, batch scheduling, trainee progress tracking, and training analytics across specialized organizational training programs.\n` +
      `• **Ron's Key Contributions**:\n` +
      `  - Architected and engineered the end-to-end LMS platform with role-based access control.\n` +
      `  - Built an interactive Training Analytics Overview dashboard with dynamic filtering for batch counts, training hours, and feedback scores.\n` +
      `  - Implemented batch management for tracks like Apple Ecosystem Mastery, Customer Experience, and Technical Training.\n` +
      `  - Developed calendar scheduling and automated email notification tools for sessions.\n` +
      `• **Tech Stack**: Vue.js, Laravel, MariaDB, REST API.`
    );
  }

  // MobileCare Queuing (Queuing System)
  if (
    query.includes("mobilecare") ||
    query.includes("queuing") ||
    query.includes("queue") ||
    query.includes("aasp")
  ) {
    return (
      `**MobileCare Queuing** is a real-time queue management system developed for MobileCare (Apple Authorized Service Provider):\n\n` +
      `• **Purpose**: Automates customer walk-in check-in, ticket dispensing, service desk dispatching, and waiting area displays.\n` +
      `• **Ron's Key Contributions**:\n` +
      `  - Engineered the full-stack queuing platform and self-service tablet/kiosk interface with Courtesy Lane support.\n` +
      `  - Integrated WebSockets and asynchronous queue workers for zero-latency live ticket calling and status updates.\n` +
      `  - Built the technician & admin management console for ticket handling and wait time monitoring.\n` +
      `  - Optimized database schemas for tracking customer throughput and peak hour metrics.\n` +
      `• **Tech Stack**: Vue.js, Laravel, MariaDB, WebSockets, Queue.`
    );
  }

  // Basecamp TMS / Training Monitoring System
  if (
    query.includes("tms") ||
    query.includes("basecamp") ||
    query.includes("training")
  ) {
    return (
      `**Basecamp TMS (Training Monitoring System)** is an enterprise internal platform designed to streamline training scheduling, tracking, and reporting:\n\n` +
      `• **Purpose**: Automates training operations across teams with role-based access for Trainers, Supervisors, Managers, and Directors.\n` +
      `• **Key Features Developed by Ron**:\n` +
      `  - Built role-based access control governing 6 distinct roles.\n` +
      `  - Developed a Calendar View module with meeting and leave entry support.\n` +
      `  - Engineered custom **OTRS integration** to convert customer/client training requests into official records.\n` +
      `  - Built a reporting & analytics engine with PDF/Excel/CSV exports and Google Drive submission.\n` +
      `• **Tech Stack**: Vue.js, Laravel, MariaDB, OTRS Integration, Tailwind CSS.`
    );
  }

  // Asia CEO Forum
  if (
    query.includes("asia ceo") ||
    query.includes("ceo forum") ||
    query.includes("volenday")
  ) {
    return (
      `**Asia CEO Forum** is the website for the premier business event series and annual CEO Awards in the Philippines:\n\n` +
      `• **Ron's Contributions**: Participated in the full migration and revamp to the Next.js framework, improving SEO, load performance, and modern UI responsiveness.\n` +
      `• **Tech Stack**: Next.js, NoSQL.`
    );
  }

  // WMedLaw
  if (
    query.includes("wmedlaw") ||
    query.includes("wmed") ||
    query.includes("law firm")
  ) {
    return (
      `**WMedLaw** is the digital web platform and client management portal for a Houston-based legal firm:\n\n` +
      `• **Purpose**: Serves as the central digital face for the law firm with high availability, SEO optimization, and streamlined client intake.\n` +
      `• **Ron's Key Contributions**:\n` +
      `  - Engineered responsive layouts, legal service directories, and client intake workflows.\n` +
      `  - Implemented database caching optimizations and security hardening.\n` +
      `  - Executed technical SEO strategies to increase organic search discovery.\n` +
      `• **Tech Stack**: WordPress, PHP, JavaScript, SEO, UI/UX.`
    );
  }

  // Nexus-IMS (Trillion Residence)
  if (
    query.includes("nexus") ||
    query.includes("ims") ||
    query.includes("trillion") ||
    query.includes("inventory management") ||
    query.includes("inventory system")
  ) {
    return (
      `**Nexus-IMS (Inventory Management System)** is an enterprise multi-warehouse inventory and asset tracking platform built for Trillion Residence:\n\n` +
      `• **Purpose**: Centralizes property asset tracking, stock movement monitoring, gatekeeper approvals, and real-time inventory valuation.\n` +
      `• **Ron's Key Contributions**:\n` +
      `  - Architected and engineered the full-stack Inventory Management System with multi-hub warehouse management.\n` +
      `  - Built the **Gatekeeper Approval Workflow** for administrative review and confirmation of stock transfers, stock-in provisioning, and stock-out deductions.\n` +
      `  - Developed the **Batch Intake Terminal** with automated barcode generation and instant SKU manifest valuation.\n` +
      `  - Built real-time **Analytics & Valuation Dashboards** with aging stock liability calculations, consumption velocity tracking, and PDF/CSV reporting.\n` +
      `• **Tech Stack**: Vue.js, Laravel, MySQL, Tailwind CSS, REST APIs.`
    );
  }

  // Contact / Hire / Email
  if (
    query.includes("contact") ||
    query.includes("hire") ||
    query.includes("email") ||
    query.includes("reach") ||
    query.includes("call") ||
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

  // Skills / Tech stack / Technologies
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
      `• **Frontend & Mobile**: Vue.js, React, Next.js, Flutter, TypeScript, JavaScript, Tailwind CSS, Bootstrap, Ionic\n` +
      `• **Backend & APIs**: PHP (Laravel, CodeIgniter), Python (Django), Node.js, Express, C#\n` +
      `• **AI & Platforms**: Google Gemini, Anthropic Claude, MySQL, MariaDB, SQLite, PostgreSQL, Firebase, WordPress\n` +
      `• **Cloud, DevOps & Monitoring**: AWS (EC2, S3, RDS), Docker, Prometheus, Grafana, Git, GitLab, GitHub, Postman, Linux, CI/CD, Vite, Vercel\n\n` +
      `He specializes in architecting clean, maintainable systems with automated business workflows.`
    );
  }

  // Experience / Jobs / Companies / History
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
    query.includes("works") ||
    query.includes("built")
  ) {
    return (
      `Here are Ron's primary enterprise production platforms:\n\n` +
      `1. **PMCIE LMS** (Learning Management System): Training batch administration, module tracking, and analytics dashboard (Vue.js, Laravel, MariaDB).\n` +
      `2. **MobileCare Queuing** (AASP Queuing System): Real-time customer check-in kiosk and live ticket calling platform (Vue.js, Laravel, MariaDB, WebSockets).\n` +
      `3. **Basecamp TMS** (Training Monitoring System): Training management and scheduling with OTRS integration (Vue.js, Laravel, MariaDB).\n` +
      `4. **SWFS** (Sterling Workforce System): Comprehensive HRIS & payroll solution with BIR Tax, Alphalist, and Last Pay computation (Vue.js, CodeIgniter, MariaDB).\n` +
      `5. **SPOTT** (Sterling Paper Online Time Tracker): Mobile & web Daily Time Record (DTR) app (Ionic, Vue.js, CodeIgniter).\n` +
      `6. **ESS-PORTAL** (Employee Self-Service Portal): Centralized timekeeping and HR portal integrated with SPOTT logs (Vue.js, CodeIgniter, MySQL).\n` +
      `7. **OBS** (Onboarding System): Full recruitment and new-hire onboarding platform (Vue.js, CodeIgniter, MySQL).\n` +
      `8. **Nexus-IMS** (Inventory Management System): Multi-warehouse inventory tracking & gatekeeper workflow for Trillion Residence (Vue.js, Laravel, MySQL).\n` +
      `9. **Asia CEO Forum**: Modernized Next.js platform for national business event series.\n\n` +
      `Ask me about any specific project (e.g. *"What is Nexus-IMS?"* or *"Tell me about PMCIE LMS"*) for more details!`
    );
  }

  // Hardware / PC & Laptop Repair Services
  if (
    query.includes("repair") ||
    query.includes("hardware") ||
    query.includes("fix") ||
    query.includes("screen") ||
    query.includes("cleaning") ||
    query.includes("reinstall") ||
    query.includes("diagnos") ||
    query.includes("thermal") ||
    query.includes("ram") ||
    query.includes("ssd") ||
    query.includes("laptop") ||
    query.includes("pc service") ||
    query.includes("computer repair") ||
    query.includes("phone repair")
  ) {
    return (
      `**Yes, Ron offers professional PC, Laptop, and Hardware Maintenance & Repair Services!**\n\n` +
      `Here is the complete service breakdown and rates:\n\n` +
      `• 🔍 **Basic Diagnosis / Checkup**: **₱600** — Comprehensive hardware diagnostic screening and fault isolation.\n` +
      `• 💽 **OS Reinstallation**: **₱1,200** — Clean operating system installation, driver setup, and initial configuration.\n` +
      `• 🧹 **PC Cleaning / Dust Removal**: **₱800** — Deep interior de-dusting, fan cleaning, and fresh thermal paste reapplication.\n` +
      `• ⚙️ **Hardware Installation & Upgrades**: **₱600** — Installation and testing of RAM, SSD, GPU, power supplies, or internal peripherals.\n` +
      `• 💻 **Laptop Screen Replacement**: **₱2.5k – ₱8k+** *(depending on unit model)* — Display panel replacement and calibration for cracked or damaged screens.\n\n` +
      `🚗 **On-Site Field Support Logistics (Travel Radius Tariff from Antipolo City)**:\n` +
      `• **Tier 1 (0 – 5 km)**: **₱100 – ₱200** (Antipolo & Immediate Vicinity)\n` +
      `• **Tier 2 (5 – 10 km)**: **₱200 – ₱350** (Surrounding Metro Areas)\n` +
      `• **Tier 3 (10 – 20 km)**: **₱350 – ₱500** (Greater Rizal & Outer Metro)\n` +
      `• **Tier 4 (20+ km)**: **₱500+** (Assessed per Location & Transit)\n\n` +
      `To schedule a repair or on-site service, feel free to email Ron directly at [marquez.ronrons@gmail.com](mailto:marquez.ronrons@gmail.com)!`
    );
  }

  // Certifications / Certificates / Credentials
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

  // Services & Pricing offered
  if (
    query.includes("service") ||
    query.includes("offer") ||
    query.includes("price") ||
    query.includes("pricing") ||
    query.includes("rate") ||
    query.includes("cost") ||
    query.includes("fee") ||
    query.includes("commission") ||
    query.includes("repair") ||
    query.includes("consult") ||
    query.includes("reinstall") ||
    query.includes("cleaning") ||
    query.includes("home service") ||
    query.includes("home-service") ||
    query.includes("screen")
  ) {
    return (
      `Here is a technical overview of Ron's engineering services and fee schedules:\n\n` +
      `💻 **1. Software & Systems Engineering (Custom Scope)**\n` +
      `• **Enterprise Platform Architecture**: Custom CRM, HRIS, Inventory (IMS), LMS, and QMS suites.\n` +
      `• **Full-Stack Web & Mobile Applications** (Vue.js, React, Next.js, Laravel, Node.js, REST/WebSocket APIs).\n` +
      `• **AI Pipeline & Automated Workflow Integration** (LLM, RAG, smart document automation).\n` +
      `• **Open-Source System Adaptation & API Bridging**.\n` +
      `• **Embedded Systems & IoT Firmware** (Arduino, ESP32, multi-sensor telemetry, circuit wiring).\n\n` +
      `🤝 **2. Technical Advisory & Consulting**\n` +
      `• **Discovery Session (20 mins)**: **Complimentary / ₱0**\n` +
      `• **Technical Advisory & Retainer**: **₱2,000 / hr**\n` +
      `• *Covers systems architecture blueprinting, technical feasibility, project roadmapping, BOM sourcing, and PR/codebase audits.*\n\n` +
      `🔧 **3. Hardware / Mobile & PC Service**\n` +
      `• **Basic diagnosis / checkup**: **₱600**\n` +
      `• **OS reinstall**: **₱1,200**\n` +
      `• **PC cleaning / dust removal**: **₱800**\n` +
      `• **Hardware installation (RAM, SSD, GPU, etc.)**: **₱600**\n` +
      `• **Laptop screen replacement**: **₱2.5k – ₱8k+** *(depending on unit model)*\n\n` +
      `📍 **4. On-Site Field Support Logistics (Travel Radius Tariff)**\n` +
      `• **Tier 1 (0 – 5 km)** · Immediate Radius: **₱100 – ₱200**\n` +
      `• **Tier 2 (5 – 10 km)** · Urban Perimeter: **₱200 – ₱350**\n` +
      `• **Tier 3 (10 – 20 km)** · Extended Perimeter: **₱350 – ₱500**\n` +
      `• **Tier 4 (20+ km)** · Custom Dispatch: **₱500+** *(location dependent)*\n\n` +
      `You can navigate to the **Services** section in the portfolio or reach out directly at [marquez.ronrons@gmail.com](mailto:marquez.ronrons@gmail.com) to schedule an engagement!`
    );
  }

  // Who is Ron / About / Overview
  if (
    query.includes("who is") ||
    query.includes("about") ||
    query.includes("ron") ||
    query.includes("hi") ||
    query.includes("hello") ||
    query.includes("hey") ||
    query.includes("rom")
  ) {
    return (
      `**Ron Marquez** is a Systems Developer based in Antipolo City, Philippines.\n\n` +
      `He specializes in architecting enterprise systems, scalable web applications, and automated digital workflows. With over 3+ years of experience across Power Mac Center, WMedLaw, SL Agritech, and Volenday, he builds software solutions that solve real business problems.\n\n` +
      `Feel free to ask me about his **experience**, **technical stack**, **projects (like SWFS, Basecamp TMS, SPOTT)**, or how to **get in touch**!`
    );
  }

  // General fallback
  return (
    `Ron Marquez is a Systems Developer specializing in enterprise software, web and mobile platforms, and business automation.\n\n` +
    `You can explore his **experience**, **tech stack**, **projects (like SWFS, Basecamp TMS, SPOTT)**, or contact him directly at [marquez.ronrons@gmail.com](mailto:marquez.ronrons@gmail.com).`
  );
}
