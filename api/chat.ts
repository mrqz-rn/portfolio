const ROM_SYSTEM_PROMPT = `You are RoM, an intelligent, helpful, and friendly AI assistant embedded in the personal portfolio website of Ron Marquez.
Your primary role is to answer inquiries from prospective clients, recruiters, hiring managers, and visitors about Ron's professional background, skills, work history, projects, certifications, and availability.

### About Ron Marquez:
- **Full Name**: Ron Marquez
- **Current Title**: Systems Developer & Software Engineer
- **Core Specialization**: Building modern enterprise internal systems, web & mobile applications, automated business workflows, and API integrations.
- **Location**: Antipolo City, Philippines
- **Direct Email**: marquez.ronrons@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/ronmarquez/
- **GitHub**: https://github.com/rnmrqz-pmc

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
1. **MobileCare Queuing (AASP Queuing System)**:
   - Real-time customer queue management system built for MobileCare (Apple Authorized Service Provider).
   - Features tablet/kiosk customer check-in with Courtesy Lane support, WebSocket-powered live queue boards, counter technician dispatching console, and throughput analytics.
   - Tech: Web Kiosk, WebSockets, Redis, Hexnode (kiosk device management).
   - Live: https://service-queue.mobilecareph.com

2. **Lead to Cash Portal (L2C Portal)**:
   - Internal lead-to-cash platform for Power Mac Center and The Loop that digitizes customer waivers and centralizes lead management, tracking customers from first contact through to a completed sale.
   - Only the overview above is published; do not invent specific features, modules, or tech stack details for this project. Suggest contacting Ron for specifics.
   - Live: https://rsoconnect.powermaccenter.com (login required)

3. **PMCIE LMS (Learning Management System)**:
   - Web-based enterprise Learning Management System developed for the PMC Institute for Excellence (PMCIE) to manage batch administration, track trainee hours/KPIs, and deliver training across specialized tracks (e.g. Apple Ecosystem Mastery, Customer Experience).
   - Features real-time training analytics dashboard, calendar scheduling, trainee management, and robust role-based access control.
   - Tech: Vue.js, Laravel, MariaDB, REST APIs.
   - Live: https://pmcie.powermaccenter.com

4. **Basecamp TMS (Training Monitoring System)**:
   - Web-based enterprise platform streamlining the scheduling, tracking, and reporting of training activities across teams.
   - Built with role-based access control (Trainer, Supervisor, Assistant Supervisor, Manager, Director, Guest), calendar view, and custom OTRS integration to convert training requests into records.
   - Tech: Vue.js, Laravel, MariaDB, OTRS Integration, Tailwind CSS.

5. **WMedLaw DTR (DTR & Payroll System)**:
   - Internal Daily Time Record (DTR) and payroll system built for WMedLaw to digitize employee timekeeping, consolidate attendance records, and support payroll processing.
   - Only the overview above is published; do not invent specific features or modules for this project. Suggest contacting Ron for specifics.
   - Tech: Next.js, Supabase, Vercel.
   - Live: https://timekeeping-dtr.vercel.app (login required)

6. **WMedLaw Web Platform**:
   - Official web platform and client management portal for WMedLaw, a Texas-based legal firm.
   - Built with high availability, SEO optimization, responsive layout architectures, and streamlined client inquiry workflows.
   - Tech: WordPress, PHP, JavaScript, SEO, UI/UX.
   - Live: https://wmedlaw.com

7. **Nexus-IMS (Inventory Management System)**:
   - Comprehensive multi-warehouse Inventory Management System developed for Trillion Residence.
   - Features Gatekeeper Administrative Approval workflow for stock transfers, stock-in provisioning, and stock-out deductions with immutable audit logs.
   - Includes real-time valuation dashboard, batch intake terminal with automated barcode generation, aging stock liabilities, consumption velocity analytics, and PDF/CSV reporting.
   - Tech: Vue.js, Laravel, MySQL, Tailwind CSS, REST APIs.

8. **SWFS (Sterling Workforce System)**:
   - A modern enterprise HRIS and payroll solution built for Sterling Paper Group of Companies to replace legacy systems.
   - Ron led the implementation of major modules and optimizations: BIR Tax Computation, Alphalist Generation, Employee Clearance Processing, and Last Pay Computation.
   - Restructured data models to boost system performance and led legacy database migration.
   - Tech: Vue.js, PHP (CodeIgniter), MariaDB.

9. **SPOTT (Sterling Paper Online Time Tracker)**:
   - Mobile and web application serving as a digital Daily Time Record (DTR) for employees to track work hours accurately.
   - Ron served as Lead Developer, building RESTful APIs for user attendance logs (attlogs) and transition from manual to digital timekeeping.
   - Tech: Ionic, Vue.js, CodeIgniter, MariaDB.

10. **ESS-PORTAL (Employee Self-Service Portal)**:
   - Centralized self-service portal for employees and HR teams for timekeeping and request filing, integrated with SPOTT attendance logs.
   - Tech: Vue.js, CodeIgniter, MySQL.

11. **OBS (Onboarding System)**:
   - Streamlines recruitment and onboarding from job posting and applications to new hire onboarding.
   - Tech: Vue.js, CodeIgniter, MySQL.

12. **Asia CEO Forum Website**:
   - Modernized website for the premier national business event series in the Philippines.
   - Tech: Next.js, NoSQL.

### Side & IoT Projects:
- **Juala De Amor**: IoT-enabled smart bird cage system for pet bird owners, monitoring care, safety, and comfort. Tech: Android, Arduino, Firebase.
- **ReCSys**: Automated IoT smart clothes-drying system that protects laundry hung outdoors from sudden rain or intense sunlight. Tech: Android, Arduino, Firebase.
- **QuickCharge-Fi**: Budget-friendly device charging and Wi-Fi station for students in shared spaces (libraries, dorms, study halls). Tech: Android, Arduino, PHP, MySQL.

### Technical Arsenal:
- **Languages**: PHP, TypeScript, JavaScript, SQL, HTML5, CSS3, Python, C#
- **Frameworks & Libraries**: Vue.js, React, Next.js, Node.js, Laravel, Django, Flutter, CodeIgniter, Express, Ionic, Tailwind CSS
- **AI & Platforms**: Google Gemini, Anthropic Claude, MySQL, MariaDB, SQLite, PostgreSQL, Firebase, WordPress
- **Cloud, DevOps & Monitoring**: AWS (EC2, S3, RDS), Docker, Prometheus, Grafana, Git, GitLab, GitHub, Postman, Linux, CI/CD, Vercel

### Official Certifications:
- **AWS Cloud Practitioner Essentials** (AWS, 2026)
- **Lean Six Sigma White Belt** (Council for Six Sigma Certification, 2026)
- **Atlassian Agile Project Management Professional Certificate** (Atlassian, 2025)
- **Technical Support Fundamentals** (Google / Coursera, 2022)
- **IP Addressing and Subnetting** (Udemy, 2022)
- **Cisco Networking Foundation: Fundamentals of Cisco Networking** (LinkedIn, 2022)
- **Computer System Servicing NC II** (TESDA, 2019)

### Engineering Services & Solutions:
1. **Software & Systems Engineering (Custom Scope / Full-Cycle Development)**:
   - **Enterprise Platform Architecture**: CRM, HRIS, Inventory Management (IMS), LMS, and Quality Management (QMS) systems.
   - **Full-Stack Web & Mobile Engineering**: High-performance responsive web applications and cross-platform mobile apps (Vue.js, React, Next.js, Laravel, Node.js).
   - **AI Pipeline & Workflow Integration**: LLM implementations, retrieval-augmented generation (RAG), conversational agents, and automated data pipelines.
   - **Open-Source Customization & Adaptation**: Codebase auditing, module adaptation, and third-party API connectivity.
   - **Embedded Systems & IoT Firmware**: Low-level microcontroller programming (Arduino, ESP32, AVR), telemetry sensor integration, and motor actuator control.
   - **Circuit Schematic & Hardware Design**: Electrical circuit topology, power distribution, and functional prototyping.
   - **Pricing**: Custom milestone-based quote or commission contract.

2. **Technical Advisory & Architectural Consulting**:
   - **Scope**: Systems architecture, database schema optimization, workflow automation, feasibility roadmapping, BOM component sourcing, and codebase audits.
   - **Pricing**:
     - **Discovery Session (20 mins)**: **Complimentary / ₱0**
     - **Technical Advisory & Retainer**: **₱1,000 / hr**

3. **Hardware / Mobile & PC Service**:
   - **Basic diagnosis / checkup**: **₱600**
   - **OS reinstall**: **₱1,200**
   - **PC cleaning / dust removal**: **₱800**
   - **Hardware installation (RAM, SSD, GPU, etc.)**: **₱600**
   - **Laptop screen replacement**: **₱2.5k – ₱8k+** (depending on unit model)

### Working Schedule, Routine & Availability:
- **Timezone**: Asia/Manila (PHT / UTC+8)
- **Weekly Schedule**:
  - **Monday to Friday (Regular Workdays)**:
    - **Core Grinding / Work Hours**: 08:00 AM – 05:00 PM
    - **Free / Consultation Hours**: 07:00 PM – 09:30 PM (ideal for client discussions, discovery sessions, and technical advisory)
  - **Saturday (Rest & Maintenance)**:
    - **Rest Window**: 10:00 AM – 02:00 PM
    - **Free / Active Window**: 08:00 AM – 05:00 PM
  - **Sunday (Rest)**:
    - **Rest Window**: 10:00 AM – 02:00 PM
- **Routine Statuses**:
  - **Late Night (11:00 PM – 06:00 AM)**: Sleeping
  - **Early Morning (06:00 AM – 08:00 AM)**: Starting the day
  - **Work Hours (08:00 AM – 05:00 PM on weekdays)**: Grinding (actively building/engineering)
  - **Wrap-up (05:00 PM – 07:00 PM)**: Waiting to clock out / wrapping up
  - **Free Time (07:00 PM – 09:30 PM on weekdays)**: Having free time / open for client chats
  - **Weekends**: Resting or working on personal side projects

### Guidelines for Responses:
- Speak as **RoM**, Ron's virtual AI assistant. Be courteous, concise, professional, and enthusiastic.
- Use precise technical terminology when discussing architecture, engineering stacks, diagnostics, hardware repairs, and project roadmaps.
- **Schedule & Availability Inquiries**: When asked about Ron's schedule, working hours, availability, or what he is doing right now, explain his weekly routine (Mon–Fri 8am–5pm core engineering, 7pm–9:30pm evening consultation/free time, weekend rest windows) and recommend reaching out via email or booking a discovery session.
- **Hardware & Repair Inquiries**: When a visitor or client asks if Ron offers **hardware services, PC/laptop repairs, troubleshooting, cleaning, OS reinstall, parts upgrades, or screen replacement**, ALWAYS confirm that **YES, Ron provides professional hardware diagnostics, PC/laptop repair & maintenance services, and on-site servicing**. Provide the exact rates clearly.
- When asked about specific projects like **MobileCare Queuing**, **Lead to Cash Portal**, **PMCIE LMS**, **Basecamp TMS**, **WMedLaw DTR**, **Nexus-IMS**, **SWFS**, **SPOTT**, **ESS-PORTAL**, **OBS**, or the side projects (**Juala De Amor**, **ReCSys**, **QuickCharge-Fi**), explain their purpose, technologies, and Ron's exact contributions. Only state details listed above; never invent features.
- When asked about services or pricing, provide exact rates clearly (e.g. Free 20m discovery, ₱1k/hr advisory, ₱600 diagnostics, ₱1,200 OS provisioning, ₱800 thermal overhaul, ₱600 hardware install, ₱2.5k–₱8k+ screen replacements, custom enterprise quotes).
- Format responses clearly with markdown formatting (bullet points, bold text, links). When presenting lists of projects, experience, or skills, use structured numbered or bulleted lists for clean readability on mobile screens rather than wide markdown tables.
- When asked about hiring or contacting Ron, provide his email (marquez.ronrons@gmail.com) and LinkedIn link.
`;

const schedule = [
  { id: 0, type: "Rest", day: "Saturday", start: "10:00:00 AM", end: "02:00:00 PM", free_in: "08:00:00 AM", free_out: "05:00:00 PM" },
  { id: 1, type: "Regular", day: "Monday", start: "08:00:00 AM", end: "05:00:00 PM", free_in: "07:00:00 PM", free_out: "09:30:00 PM" },
  { id: 2, type: "Regular", day: "Tuesday", start: "08:00:00 AM", end: "05:00:00 PM", free_in: "07:00:00 PM", free_out: "09:30:00 PM" },
  { id: 3, type: "Regular", day: "Wednesday", start: "08:00:00 AM", end: "05:00:00 PM", free_in: "07:00:00 PM", free_out: "09:30:00 PM" },
  { id: 4, type: "Regular", day: "Thursday", start: "08:00:00 AM", end: "05:00:00 PM", free_in: "07:00:00 PM", free_out: "09:30:00 PM" },
  { id: 5, type: "Regular", day: "Friday", start: "08:00:00 AM", end: "05:00:00 PM", free_in: "07:00:00 PM", free_out: "09:30:00 PM" },
  { id: 6, type: "Rest", day: "Sunday", start: "10:00:00 AM", end: "02:00:00 PM" },
];

function parseHour(timeStr: string): number {
  const [time, meridiem] = timeStr.split(' ');
  const [hours] = time.split(':').map(Number);
  if (meridiem === 'AM') {
    return hours === 12 ? 0 : hours;
  } else {
    return hours === 12 ? 12 : hours + 12;
  }
}

function getMyStatus(): string {
  const now = new Date();
  const currentHours = now.getHours();
  const currentDay = now.toLocaleString('en-US', { weekday: 'long' });

  if (currentHours >= 23 || currentHours < 6) {
    return "I'm sleeping";
  }

  const currentSchedule = schedule.find(s => s.day === currentDay);
  if (!currentSchedule) return "Status Unknown";

  const startHour = parseHour(currentSchedule.start);
  const endHour = parseHour(currentSchedule.end);

  if (currentSchedule.type === "Rest") {
    return "I'm resting";
  } else if (startHour <= currentHours && endHour >= currentHours) {
    return "I'm grinding";
  } else if (startHour > currentHours) {
    return "I'm starting my day";
  } else if (endHour <= currentHours && endHour + 2 > currentHours) {
    return "I'm waiting to clock out";
  } else if (endHour <= currentHours) {
    return "I'm having free time";
  }

  return "Status Unknown";
}

function generateKnowledgeReply(lastUserMessage: string): string {
  const query = (lastUserMessage || "").toLowerCase().trim();

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
      `To schedule a repair or service, feel free to email Ron directly at [marquez.ronrons@gmail.com](mailto:marquez.ronrons@gmail.com)!`
    );
  }

  // Lead to Cash Portal (Power Mac Center) — before ESS-PORTAL, which matches "portal"
  if (
    query.includes("l2c") ||
    query.includes("lead to cash") ||
    query.includes("lead-to-cash") ||
    query.includes("waiver") ||
    query.includes("lead management") ||
    query.includes("the loop")
  ) {
    return (
      `**Lead to Cash Portal (L2C Portal)** is an internal platform for Power Mac Center and The Loop:\n\n` +
      `• **Purpose**: Digitizes customer waivers and centralizes lead management, so customers can be tracked from first contact through to a completed sale.\n` +
      `• **Ron's Role**: Design, development, testing, deployment, and maintenance.\n\n` +
      `For deeper technical details, reach out to Ron at [marquez.ronrons@gmail.com](mailto:marquez.ronrons@gmail.com).`
    );
  }

  // WMedLaw DTR & Payroll — before SPOTT, which matches "dtr"
  if (
    query.includes("payroll system") ||
    query.includes("timekeeping-dtr") ||
    (query.includes("wmed") && (query.includes("dtr") || query.includes("payroll") || query.includes("timekeeping")))
  ) {
    return (
      `**WMedLaw DTR** is a Daily Time Record (DTR) and payroll system built for WMedLaw:\n\n` +
      `• **Purpose**: Digitizes employee timekeeping, consolidates attendance records, and supports payroll processing.\n` +
      `• **Tech Stack**: Next.js, Supabase, Vercel.\n\n` +
      `For deeper technical details, reach out to Ron at [marquez.ronrons@gmail.com](mailto:marquez.ronrons@gmail.com).`
    );
  }

  // Side & IoT projects
  if (query.includes("juala") || query.includes("bird")) {
    return (
      `**Juala De Amor** is an IoT-enabled smart cage system for pet bird owners, designed to ensure optimal care, safety, and comfort for their birds.\n\n` +
      `• **Tech Stack**: Android, Arduino, Firebase.`
    );
  }

  if (query.includes("recsys") || query.includes("drying") || query.includes("clothes")) {
    return (
      `**ReCSys** is an automated IoT smart drying system that lets users dry clothes outdoors while protecting them from sudden rain or intense sunlight.\n\n` +
      `• **Tech Stack**: Android, Arduino, Firebase.`
    );
  }

  if (query.includes("quickcharge") || query.includes("quick charge") || query.includes("charging")) {
    return (
      `**QuickCharge-Fi** is a budget-friendly charging and Wi-Fi station for students in shared spaces such as libraries, dormitories, and study halls, built for high traffic at minimal cost.\n\n` +
      `• **Tech Stack**: Android, Arduino, PHP, MySQL.`
    );
  }

  if (query.includes("iot") || query.includes("side project") || query.includes("arduino")) {
    return (
      `Ron's **Side & IoT projects** include:\n\n` +
      `1. **Juala De Amor**: IoT smart bird cage system (Android, Arduino, Firebase).\n` +
      `2. **ReCSys**: Automated smart clothes-drying system (Android, Arduino, Firebase).\n` +
      `3. **QuickCharge-Fi**: Student charging & Wi-Fi station (Android, Arduino, PHP, MySQL).`
    );
  }

  // WMedLaw
  if (
    query.includes("wmedlaw") ||
    query.includes("wmed") ||
    query.includes("law firm")
  ) {
    return (
      `**WMedLaw** is the digital web platform and client management portal for a Texas-based legal firm:\n\n` +
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
      `• **Tech Stack**: Web Kiosk, WebSockets, Redis, Hexnode (kiosk device management).`
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
      `• **GitHub**: [github.com/rnmrqz-pmc](https://github.com/rnmrqz-pmc)\n` +
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
      `• **Frontend & Mobile**: Vue.js, React, Next.js, Flutter, TypeScript, JavaScript, Tailwind CSS, Bootstrap, Ionic\n` +
      `• **Backend & APIs**: PHP (Laravel, CodeIgniter), Python (Django), Node.js, Express, C#\n` +
      `• **AI & Platforms**: Google Gemini, Anthropic Claude, MySQL, MariaDB, SQLite, PostgreSQL, Firebase, WordPress\n` +
      `• **Cloud, DevOps & Monitoring**: AWS (EC2, S3, RDS), Docker, Prometheus, Grafana, Git, GitLab, GitHub, Postman, Linux, CI/CD, Vite, Vercel\n\n` +
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
      `1. **MobileCare Queuing** (AASP Queuing System): Real-time customer check-in kiosk and live ticket calling platform (Web Kiosk, WebSockets, Redis, Hexnode).\n` +
      `2. **Lead to Cash Portal** (L2C): Digital waiver and lead management platform for Power Mac Center and The Loop.\n` +
      `3. **PMCIE LMS** (Learning Management System): Training batch administration, module tracking, and analytics dashboard (Vue.js, Laravel, MariaDB).\n` +
      `4. **Basecamp TMS** (Training Monitoring System): Training management and scheduling with OTRS integration (Vue.js, Laravel, MariaDB).\n` +
      `5. **WMedLaw DTR** (DTR & Payroll System): Employee timekeeping and payroll system for WMedLaw (Next.js, Supabase, Vercel).\n` +
      `6. **WMedLaw Web Platform**: Official website and client intake portal for a Texas-based law firm (WordPress, PHP).\n` +
      `7. **Nexus-IMS** (Inventory Management System): Multi-warehouse inventory tracking & gatekeeper workflow for Trillion Residence (Vue.js, Laravel, MySQL).\n` +
      `8. **SWFS** (Sterling Workforce System): Comprehensive HRIS & payroll solution with BIR Tax, Alphalist, and Last Pay computation (Vue.js, CodeIgniter, MariaDB).\n` +
      `9. **SPOTT** (Sterling Paper Online Time Tracker): Mobile & web Daily Time Record (DTR) app (Ionic, Vue.js, CodeIgniter).\n` +
      `10. **ESS-PORTAL** (Employee Self-Service Portal): Centralized timekeeping and HR portal integrated with SPOTT logs (Vue.js, CodeIgniter, MySQL).\n` +
      `11. **OBS** (Onboarding System): Full recruitment and new-hire onboarding platform (Vue.js, CodeIgniter, MySQL).\n` +
      `12. **Asia CEO Forum**: Modernized Next.js platform for national business event series.\n\n` +
      `**Side & IoT projects**: Juala De Amor (smart bird cage), ReCSys (smart clothes-drying system), and QuickCharge-Fi (student charging & Wi-Fi station).\n\n` +
      `Ask me about any specific project (e.g. *"What is Nexus-IMS?"* or *"Tell me about the Lead to Cash Portal"*) for more details!`
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
    query.includes("consult") ||
    query.includes("advisory") ||
    query.includes("home service") ||
    query.includes("home-service")
  ) {
    return (
      `Here is an overview of Ron's engineering and technical services:\n\n` +
      `💻 **1. Software & Systems Engineering (Custom Scope / Commission)**\n` +
      `• **Enterprise Platform Architecture**: Custom CRM, HRIS, Inventory (IMS), LMS, and QMS suites.\n` +
      `• **Full-Stack Web & Mobile Applications** (Vue.js, React, Next.js, Laravel, Node.js, REST/WebSocket APIs).\n` +
      `• **AI Pipeline & Automated Workflow Integration** (LLM, RAG, smart document automation).\n` +
      `• **Open-Source System Adaptation & API Bridging**.\n` +
      `• **Embedded Systems & IoT Firmware** (Arduino, ESP32, multi-sensor telemetry, circuit wiring).\n\n` +
      `🤝 **2. Technical Advisory & Consulting**\n` +
      `• **Discovery Session (20 mins)**: **Complimentary / ₱0**\n` +
      `• **Technical Advisory & Retainer**: **₱1,000 / hr**\n` +
      `• *Covers systems architecture blueprinting, technical feasibility, project roadmapping, BOM sourcing, and PR/codebase audits.*\n\n` +
      `🔧 **3. Hardware / Mobile & PC Service & Repair**\n` +
      `• **Basic diagnosis / checkup**: **₱600**\n` +
      `• **OS reinstall**: **₱1,200**\n` +
      `• **PC cleaning / dust removal**: **₱800**\n` +
      `• **Hardware installation (RAM, SSD, GPU, etc.)**: **₱600**\n` +
      `• **Laptop screen replacement**: **₱2.5k – ₱8k+** *(depending on unit model)*\n\n` +
      `Feel free to reach out directly at [marquez.ronrons@gmail.com](mailto:marquez.ronrons@gmail.com) to book a service or request a quote!`
    );
  }

  // Schedule, Status & Availability
  if (
    query.includes("schedule") ||
    query.includes("availab") ||
    query.includes("status") ||
    query.includes("working hour") ||
    query.includes("free time") ||
    query.includes("what is ron doing") ||
    query.includes("doing right now") ||
    query.includes("grinding") ||
    query.includes("routine") ||
    query.includes("time")
  ) {
    const currentStatus = getMyStatus();
    return (
      `📅 **Ron's Current Status & Weekly Schedule**\n\n` +
      `• ⚡ **Current Live Status**: **"${currentStatus}"**\n\n` +
      `🕒 **Weekly Working & Availability Routine (Asia/Manila PHT / UTC+8)**:\n` +
      `• **Monday – Friday (Regular Workdays)**:\n` +
      `  - **Core Engineering / Grinding**: 08:00 AM – 05:00 PM\n` +
      `  - **Evening Free Time & Advisory Calls**: 07:00 PM – 09:30 PM\n` +
      `• **Saturday**:\n` +
      `  - **Rest**: 10:00 AM – 02:00 PM | **Active / Free Hours**: 08:00 AM – 05:00 PM\n` +
      `• **Sunday**:\n` +
      `  - **Rest**: 10:00 AM – 02:00 PM\n\n` +
      `💡 *The best window for technical consultations and discovery calls is during weekday evenings (7:00 PM – 9:30 PM PHT) or by scheduling ahead via email at [marquez.ronrons@gmail.com](mailto:marquez.ronrons@gmail.com).*`
    );
  }

  return (
    `**Ron Marquez** is a Systems Developer based in Antipolo City, Philippines.\n\n` +
    `He specializes in architecting enterprise systems, scalable web applications, automated digital workflows, and professional PC/laptop hardware repair services.\n\n` +
    `Feel free to ask me about his **experience**, **technical stack**, **projects (like SWFS, Basecamp TMS, Nexus-IMS)**, **hardware repair services & rates**, or how to **get in touch** at [marquez.ronrons@gmail.com](mailto:marquez.ronrons@gmail.com)!`
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

  const rawIp = 
    (req.headers["x-forwarded-for"] as string) || 
    (req.headers["x-real-ip"] as string) || 
    req.socket?.remoteAddress || 
    "127.0.0.1";
  const clientIp = rawIp.split(",")[0].trim();
  const userAgent = (req.headers["user-agent"] as string) || "Unknown User-Agent";

  const { messages, sessionId, deviceInfo, userInfo } = req.body || {};
  const lastUserMessage = Array.isArray(messages) && messages.length > 0 
    ? (messages[messages.length - 1]?.content || "") 
    : "";

  const groqKey = process.env.GROQ_API_KEY || req.headers["x-groq-key"];
  const geminiKey = process.env.GEMINI_API_KEY || req.headers["x-gemini-key"];
  const claudeKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY || req.headers["x-api-key"];

  const sendResponseAndLog = async (reply: string, provider: string) => {
    // Background server-side logging if Supabase endpoint is available
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "https://vgnfvkycjdckedpifcyl.supabase.co";
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey && lastUserMessage) {
      fetch(`${supabaseUrl.replace(/\/+$/, "")}/rest/v1/chatbot_logs`, {
        method: "POST",
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          session_id: sessionId || "sess_auto_" + Date.now().toString(36),
          user_id: userInfo?.id || null,
          user_email: userInfo?.email || null,
          user_name: userInfo?.name || null,
          user_message: lastUserMessage,
          bot_response: reply,
          device: deviceInfo?.summary || "Desktop • Browser",
          user_agent: userAgent,
          ip_address: clientIp,
          provider: provider || "ai"
        })
      }).catch(err => console.warn("Background server chat log warning:", err));
    }

    return res.status(200).json({ reply, provider, clientIp });
  };

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
          return await sendResponseAndLog(reply, "groq");
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
          return await sendResponseAndLog(geminiReply, "gemini");
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
          return await sendResponseAndLog(reply, "claude");
        }
      }
    } catch (error: any) {
      console.warn("Claude API call failed:", error);
    }
  }

  // Fallback: Built-in Knowledge Engine
  const fallback = generateKnowledgeReply(lastUserMessage);
  return await sendResponseAndLog(fallback, "knowledge_engine");
}
