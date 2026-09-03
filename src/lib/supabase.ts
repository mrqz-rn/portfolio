import { createClient } from "@supabase/supabase-js";

const envUrl = (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) || (typeof process !== "undefined" && process.env?.VITE_SUPABASE_URL) || "";
const rawUrl = envUrl.trim();
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "") || "https://vgnfvkycjdckedpifcyl.supabase.co";
const envKey = (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) || (typeof process !== "undefined" && process.env?.VITE_SUPABASE_ANON_KEY) || "";
const supabaseAnonKey = envKey.trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith("https://") &&
  !supabaseUrl.includes("your-project-id") &&
  !supabaseAnonKey.includes("your-anon-public-key") &&
  supabaseAnonKey.length > 20
);

// Create Supabase client (fallback to dummy url if not set to prevent runtime crashes)
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : "https://placeholder-project.supabase.co",
  isSupabaseConfigured ? supabaseAnonKey : "placeholder-anon-key",
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    }
  }
);

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: "admin" | "user";
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  tags: string[];
  published: boolean;
  author_id?: string;
  created_at: string;
  updated_at: string;
  author?: Profile;
  likes_count?: number;
  comments_count?: number;
  user_has_liked?: boolean;
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at?: string;
  user?: Profile;
}

export interface PostLike {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

// Initial starter blog posts for preview and demonstration
export const INITIAL_DEMO_POSTS: BlogPost[] = [
  {
    id: "demo-post-1",
    title: "Enterprise HRIS & Payroll Architecture: Designing High-Throughput, Fault-Tolerant Workflows",
    slug: "enterprise-hris-payroll",
    excerpt: "Designing high-throughput payroll computation for 5,000 to 10,000+ employees with chunked queue workers, deterministic pure engines, and transport-level field security.",
    tags: ["Engineering", "Systems Architecture", "Vue.js", "Laravel", "Enterprise", "High-Throughput"],
    published: true,
    cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    likes_count: 24,
    comments_count: 7,
    content: `## Executive Overview: The Payroll Engineering Challenge

Processing payroll and timekeeping for **5,000 to 10,000+ employees** is one of the most data-intensive, computationally unforgiving domains in enterprise software engineering.

During cutoff windows, the system must process hundreds of thousands of raw biometric timestamps, apply intricate shift policies (grace periods, flexi-windows, night differentials, holiday premiums), deduct dynamic statutory contributions (SSS, PhilHealth, HDMF, withholding tax), apply recurring amortizations (loans, company purchases, savings programs), and generate journal vouchers and bank disbursement advice files — all within strict deadlines.

A naive, synchronous request-response architecture quickly results in:

* **Database Deadlocks & CPU Spikes** — long-running transactions blocking concurrent web and mobile users.
* **Calculation Drift** — inconsistent computation logic scattered across different microservices or UI controllers.
* **Security & Compliance Breaches** — unmasked executive salaries exposed through unpartitioned APIs.

Below is the blueprint of an enterprise-grade architecture developed and tested in mission-critical production environments.

\`\`\`mermaid
flowchart TB
    subgraph EDGE["Ingestion and Edge Layer"]
        BIO["Biometric Hardware / Mobile SPOTT App"] -->|Raw Attlogs Stream| GATEWAY["API Gateway and Auth Proxy"]
        UI["Web / ESS Portal"] -->|User Requests| GATEWAY
    end

    subgraph ASYNC["Batching and Asynchronous Workers"]
        GATEWAY --> REDIS[("Redis Queue / Message Broker")]
        REDIS --> WORKER1["DTR Manhour Processor Worker"]
        REDIS --> WORKER2["Gross-to-Net Payroll Computation Worker"]
        REDIS --> WORKER3["Bank Advice and Report Generator Worker"]
    end

    subgraph CORE["Deterministic Core Engine"]
        PAM["Personnel Action Memo SSoT"]
        STAT["Statutory Rule Tables: SSS / PHIC / HDMF / Tax"]
        SDSA["SDSA Recurring Amortization Engine"]
    end

    subgraph DATA["Multi-Schema Data Layer"]
        DB_EMP[("hris_employee")]
        DB_TK[("hris_timekeeping")]
        DB_PAY[("hris_payroll")]
    end

    WORKER1 & WORKER2 --> PAM
    WORKER1 & WORKER2 --> STAT
    WORKER1 & WORKER2 --> SDSA

    WORKER1 & WORKER2 & WORKER3 --> DB_EMP
    WORKER1 & WORKER2 & WORKER3 --> DB_TK
    WORKER1 & WORKER2 & WORKER3 --> DB_PAY
\`\`\`

---

## 1. High-Throughput Batch Processing & Asynchronous Queueing

### The Problem: Cutoff Spike & Transaction Blocking

When HR triggers a pay run for 8,000 employees across 15 cutoff days, the engine must evaluate:

\`\`\`
Total Records = 8,000 employees x 15 days = 120,000 Daily Time Records (DTR)
\`\`\`

Executing this synchronously over HTTP causes web server worker thread starvation, 504 Gateway Timeouts, and locks on database tables needed by active users.

### The Solution: Chunked Parallelism & Idempotent Cutoff Posting

* **Chunking Strategy** — split the master employee list into decoupled chunks of 250–500 employees, segmented by \`companyId\` and \`departmentId\`.
* **Worker Dispatch** — push computation payloads to a background queue (Redis / BullMQ / Celery).
* **Idempotency & Cutoff Locks** — prevent duplicate calculations through atomic pay period state tagging.

### Production Implementation: Asynchronous Job Dispatcher

\`\`\`javascript
// Server-Side Payroll Job Chunking & Dispatching
async function dispatchPayrollComputation(payperiodId, companyId, initiatedBy) {
  // 1. Acquire atomic lock on pay period to prevent race conditions
  const lockAcquired = await db('hris_timekeeping.payperiod')
    .where({ id: payperiodId, companyId: companyId, isLocked: 0 })
    .update({ isLocked: 1, updated_at: new Date() });

  if (!lockAcquired) {
    throw new Error('Pay period is currently locked or undergoing active processing.');
  }

  // 2. Extract eligible employee roster from the Single-Source-of-Truth view
  const employeeList = await db('hris_employee.latest_pam_view')
    .select('employeeNo')
    .where({ companyId: companyId, approverStatus: 1, status: 1 });

  // 3. Partition into chunks of 250 employees
  const CHUNK_SIZE = 250;
  const chunks = _.chunk(employeeList, CHUNK_SIZE);

  // 4. Dispatch jobs to background queue workers
  const jobPromises = chunks.map((chunk, index) => {
    return payrollQueue.add('compute_chunk', {
      payperiodId,
      companyId,
      employeeBatch: chunk.map(e => e.employeeNo),
      chunkIndex: index + 1,
      totalChunks: chunks.length,
      initiatedBy
    }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: true
    });
  });

  await Promise.all(jobPromises);

  return {
    status: 'QUEUED',
    totalEmployees: employeeList.length,
    totalBatches: chunks.length
  };
}
\`\`\`

The HTTP request returns in milliseconds with a \`QUEUED\` receipt. Progress is surfaced to the HR operator by polling chunk completion counters or by pushing worker events over a websocket channel — never by holding the original connection open.

---

## 2. Deterministic & Centralized Computation Engine

### The Problem: Calculation Drift Across Modules

A classic pitfall in legacy systems is implementing overtime or tax formulas in multiple controllers:

* The DTR viewer computes OT for display using **Controller A**.
* Final pay computes pro-rated OT using **Controller B**.
* The 13th-month bonus calculates basic pay using **Stored Procedure C**.

Over time, discrepancies arise from differing rounding precision, grace period handling, or holiday rate edge cases. The symptom is always the same: three screens, three numbers, one very unhappy finance department.

### The Solution: Shared Pure Functions & PAM as the Single Source of Truth

* **Personnel Action Memo (PAM)** — every employee movement (hire, promotion, salary increment, transfer) is an immutable PAM record. The system queries \`latest_pam_view\` where \`isLatest = 1 AND approverStatus = 1\`, ensuring the entire engine reads identical salary rates.
* **Deterministic Multiplier Matrices** — rate multipliers live in dedicated master lookup tables rather than hardcoded constants, so a labor advisory change is a data migration, not a redeploy.

\`\`\`mermaid
flowchart LR
    subgraph SOURCES["Immutable Inputs"]
        PAMREC["personnel_action_memo<br/>isLatest = 1, approverStatus = 1"]
        MULT["Rate Multiplier Master Tables<br/>Holiday / OT / Night Diff"]
        TKREC["employee_tk<br/>Approved DTR"]
    end

    subgraph ENGINE["Single Pure Calculation Module"]
        CALC["PayrollCalculator<br/>Stateless static methods"]
    end

    subgraph CONSUMERS["All Consumers Share One Engine"]
        DTRVIEW["DTR Viewer"]
        FINALPAY["Final Pay / Clearance"]
        THIRTEENTH["13th Month Computation"]
        PAYRUN["Regular Cutoff Pay Run"]
    end

    PAMREC --> CALC
    MULT --> CALC
    TKREC --> CALC

    CALC --> DTRVIEW
    CALC --> FINALPAY
    CALC --> THIRTEENTH
    CALC --> PAYRUN
\`\`\`

### Production Implementation: Pure Mathematical Calculation Engine

\`\`\`typescript
export interface ComputationInput {
  hourlyRate: number;
  dailyRate: number;
  monthlyRate: number;
  regularHours: number;
  lateMinutes: number;
  undertimeMinutes: number;
  overtimeHours: number;
  nightDiffHours: number;
  holidayRateMultiplier: number;
  holidayOtMultiplier: number;
}

export class PayrollCalculator {
  /**
   * Deterministic Gross Pay Component Calculation
   */
  public static computeGrossComponents(input: ComputationInput) {
    const minuteRate = input.hourlyRate / 60;

    // 1. Tardy & Undertime Deductions (standard rounding to 4 decimal places)
    const lateDeduction = +(input.lateMinutes * minuteRate).toFixed(4);
    const undertimeDeduction = +(input.undertimeMinutes * minuteRate).toFixed(4);

    // 2. Regular Earnings
    const basicEarned = +(input.regularHours * input.hourlyRate).toFixed(4);

    // 3. Overtime Pay (base OT multiplier 1.25x regular, or dynamic holiday OT)
    const otRate = input.hourlyRate * (input.holidayOtMultiplier || 1.25);
    const overtimePay = +(input.overtimeHours * otRate).toFixed(4);

    // 4. Night Differential (Philippine Labor Code: 10% premium, 10:00 PM - 6:00 AM)
    const ndRate = input.hourlyRate * 0.10;
    const nightDiffPay = +(input.nightDiffHours * ndRate).toFixed(4);

    const totalGross = +(
      basicEarned + overtimePay + nightDiffPay - (lateDeduction + undertimeDeduction)
    ).toFixed(2);

    return {
      basicEarned: Math.round(basicEarned * 100) / 100,
      lateDeduction: Math.round(lateDeduction * 100) / 100,
      undertimeDeduction: Math.round(undertimeDeduction * 100) / 100,
      overtimePay: Math.round(overtimePay * 100) / 100,
      nightDiffPay: Math.round(nightDiffPay * 100) / 100,
      grossPay: totalGross
    };
  }

  /**
   * Progressive Tax Engine (TRAIN Law Semi-Monthly Brackets)
   */
  public static computeWithholdingTax(taxableIncome: number, taxTable: any[]): number {
    if (taxableIncome <= 10417) return 0.00; // Lower bracket exempt

    const bracket = taxTable.find(
      b => taxableIncome >= b.minCompensation && taxableIncome <= b.maxCompensation
    );
    if (!bracket) return 0.00;

    const excess = taxableIncome - bracket.minCompensation;
    const computedTax = bracket.fixedTax + (excess * bracket.excessRate);

    return Math.round(computedTax * 100) / 100;
  }
}
\`\`\`

Because these are static, side-effect-free methods, they are trivially unit-testable against a fixture matrix of edge cases: a rest-day double holiday with night differential OT, a mid-cutoff salary increment, a zero-hour suspended employee.

---

## 3. Data Confidentiality & Field-Level Security Architecture

### The Problem: Salary Leakage & Privilege Escalation

In enterprise companies, standard HR clerks must manage attendance and leave filing for executives and VIPs **without** having visibility into their executive compensation, stock allowances, or net salaries. A single unfiltered \`SELECT *\` reaching the client bundle is a compliance incident, even if the UI never renders the field.

### The Solution: Transport Envelope Encryption & Role Scoping

* **Dynamic Field Masking on the Gateway** — sensitive fields (\`basicPay\`, \`monthlyAllowance\`, \`grossPay\`, \`netPay\`) are encrypted at rest and Base64-masked on the wire.
* **Context-Aware Decoding** — unmasking occurs only inside authorized frontend store actions (\`decodeBase64\`) when the authenticated session carries verified permission bits (\`showSalary = 1\` or \`showSalaryVip = 1\`).

\`\`\`mermaid
sequenceDiagram
    participant C as Client / ESS Portal
    participant G as API Gateway
    participant A as RBAC Permission Resolver
    participant D as hris_payroll DB

    C->>G: GET /payroll/details?payperiodId=...
    G->>A: Resolve session permission bits
    A-->>G: showSalary = 0, showSalaryVip = 0
    G->>D: Query payroll_details
    D-->>G: Rows with encrypted salary columns
    Note over G: Strip or mask basicPay, grossPay,<br/>netPay before serialization
    G-->>C: Payload with masked salary fields
    Note over C: Vuex decodeBase64 is a no-op<br/>without permission bits
\`\`\`

The critical property is that the **gateway**, not the client, decides what leaves the server. Client-side hiding of a field that was still transmitted is decoration, not security.

---

## 4. Multi-Schema Database Partitioning & Index Strategy

To maintain sub-100ms query latency under load, isolate system modules into logical schemas:

| Schema Name | Responsibility | Critical Table / View | Index Optimization Pattern |
| --- | --- | --- | --- |
| \`hris_admin\` | User RBAC, tabs, filters | \`users\`, \`userpermissions\` | \`UNIQUE(userId, tabId)\` |
| \`hris_employee\` | Demographics, PAM SSoT, benefits | \`personnel_action_memo\` | \`INDEX(employeeNo, isLatest, status)\` |
| \`hris_timekeeping\` | Raw logs, DTR, leave bank | \`employee_tk\` | \`UNIQUE(employeeNo, date)\`, \`INDEX(payperiodId)\` |
| \`hris_payroll\` | Calculated slips, tax brackets | \`payroll_details\` | \`UNIQUE(payperiodId, employeeNo)\` |
| \`hris_orgchart\` | Plantilla headcount budgets | \`plantilla_dept_chart\` | \`INDEX(plantillaChartId, departmentId)\` |

### Production Database Index Optimization (SQL DDL)

\`\`\`sql
-- High-Performance Composite Indexes for Batch Cutoff Aggregations
ALTER TABLE \`hris_timekeeping\`.\`employee_tk\`
    ADD UNIQUE INDEX \`uk_emp_date\` (\`employeeNo\`, \`date\`),
    ADD INDEX \`idx_tk_batch_eval\` (\`payperiodId\`, \`isAbsent\`, \`dtrStatus\`);

ALTER TABLE \`hris_payroll\`.\`payroll_details\`
    ADD UNIQUE INDEX \`uk_payroll_cutoff\` (\`payperiodId\`, \`employeeNo\`),
    ADD INDEX \`idx_payroll_reporting\` (\`companyId\`, \`departmentId\`, \`isHold\`, \`isPosted\`);
\`\`\`

The \`UNIQUE\` constraints do double duty here: they accelerate lookups *and* act as the database-level guarantee behind idempotent recomputation. A retried worker chunk collides on \`uk_payroll_cutoff\` and upserts rather than duplicating.

---

## 5. Fail-Safe Operations: Unposting & Bank Advice Layout Engines

### Automated Unposting Mechanics

In production, human errors happen — a department manager submits retroactive OT approvals after payroll has already been generated.

Enterprise engines must implement atomic rollbacks (unposting). When unposting a pay period, the system:

1. Reverts \`hris_timekeeping.payperiod_posting\` to an open state.
2. Resets remaining balances on recurring loans in \`hris_payroll.salary_adjustments\`.
3. Marks computed payslips as **draft** without deleting audit history.

Step 2 is where naive implementations lose money. If an amortization schedule is decremented at post time but not restored at unpost time, a recomputation double-deducts the employee — a class of bug that surfaces months later as an unreconcilable loan ledger.

### Dynamic Corporate Bank Advice Generation

Disbursement cannot rely on generic spreadsheets. The engine implements a configurable layout formatter that generates exact fixed-width or delimited files tailored for major clearing banks (BDO, BPI, Metrobank, UnionBank):

\`\`\`javascript
// Bank File Advice Exporter
function generateBankDisbursementFile(records, bankConfig) {
  const { headerFormat, bodyFormat, trailerFormat, delimiter } = bankConfig;
  let lines = [];

  // Header Record (Company Corporate Code, Batch ID, Value Date)
  lines.push(interpolateFormat(headerFormat, {
    batchDate: moment().format('YYYYMMDD'),
    recordCount: records.length
  }));

  // Detail Records (Employee Bank Account, Net Pay in Cents, Employee Name)
  let totalDisbursement = 0;
  for (const row of records) {
    totalDisbursement += row.netPay;
    lines.push(interpolateFormat(bodyFormat, {
      accountNo: row.bankAccountNo.padEnd(16, ' '),
      amount: Math.round(row.netPay * 100).toString().padStart(12, '0'),
      employeeName: \`\${row.lastName}, \${row.firstName}\`.substring(0, 30).padEnd(30, ' ')
    }));
  }

  // Trailer Record (Checksum Total, Total Hashes)
  lines.push(interpolateFormat(trailerFormat, {
    totalAmount: Math.round(totalDisbursement * 100).toString().padStart(15, '0'),
    totalRows: records.length.toString().padStart(6, '0')
  }));

  return lines.join('\\r\\n');
}
\`\`\`

Note the deliberate \`\\r\\n\` line terminator and the amount expressed in integer cents. Bank clearing parsers are unforgiving of floating-point representations and Unix line endings; both are common causes of a rejected batch at 4:00 PM on a payday.

---

## 6. Key Takeaways & Enterprise Best Practices Checklist

- [ ] **Decouple ingestion from processing.** Ingest biometric timestamps asynchronously via high-speed Redis buffers; never compute DTR inline on log receipt.
- [ ] **Treat salary changes as immutable events.** Implement Personnel Action Memos (PAM) as timestamped, approved records rather than mutating employee rows in place.
- [ ] **Enforce idempotent computation.** Every payroll computation script must be safe to re-run on the same cutoff without double-deducting amortizations.
- [ ] **Centralize the math.** One pure calculation module consumed by every screen and report — no parallel implementations.
- [ ] **Isolate high-security data on the wire.** Never send plaintext executive salaries to client bundles; apply server-side masking with role-scoped decryption.
- [ ] **Architect for atomic rollbacks.** Build robust unposting and versioned recalculation workflows from day one, not after the first bad pay run.
- [ ] **Index for the batch, not just the lookup.** Composite indexes aligned to cutoff aggregation predicates keep pay runs linear instead of quadratic.

---

*This article reflects architectural solutions and production implementations engineered for enterprise workforce suites.*
`
  },
  {
    id: "demo-post-2",
    title: "Building Real-Time AASP Queue Management with WebSockets & Interactive Kiosks",
    slug: "real-time-queuing-systems-websockets-laravel",
    excerpt: "How we engineered a live queue ticketing, dispatching, and waiting area status system for MobileCare service centers.",
    tags: ["WebSockets", "Laravel", "Vue.js", "Real-Time", "Queuing"],
    published: true,
    cover_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 8).toISOString(),
    likes_count: 21,
    comments_count: 5,
    content: `## Real-Time Customer Experience at Scale

In high-volume service centers like Apple Authorized Service Providers (AASP), walk-in management can quickly become a bottleneck without automated coordination.

### System Architecture
The MobileCare Queuing platform combines three core interfaces:
- **Tablet Kiosk Station**: Self-service check-in for arrivals with *Courtesy Lane* support.
- **Technician Dispatch Console**: Allows service technicians to call the next ticket, hold, transfer, or complete tickets.
- **Live Display Board**: Instant audiovisual alert broadcasted across customer waiting area displays.

### WebSockets & Asynchronous Event Broadcasting
By integrating **WebSockets** and Laravel Echo, every ticket state change triggers an instantaneous broadcast event with sub-50ms latency across connected display boards.

\`\`\`typescript
// Client-side WebSocket Ticket Broadcast Listener
echo.channel('service-center.1')
    .listen('TicketCalledEvent', (e) => {
        announceQueueNumber(e.ticketNumber, e.counterName);
        updateActiveDisplayBoard(e.ticket);
    });
\`\`\`

### Key Takeaway
Real-time queuing systems drastically reduce perceived wait times and provide analytics on average service duration to optimize staffing.
`
  },
  {
    id: "demo-post-3",
    title: "From Hardware to Cloud: Microcontroller Telemetry and IoT System Integration",
    slug: "iot-hardware-prototyping-microcontrollers-cloud",
    excerpt: "A practical guide to connecting embedded sensors (ESP32 / Arduino) to cloud dashboards and digital automated monitoring.",
    tags: ["IoT", "Embedded", "Hardware", "Arduino", "ESP32"],
    published: true,
    cover_image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80",
    created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    likes_count: 18,
    comments_count: 2,
    content: `## Bridging the Physical and Digital Worlds

Connecting physical hardware prototypes to web platforms unlocks incredible automation opportunities—from inventory gate sensors to smart office monitors.

### Hardware Prototyping Checklist
1. **Microcontroller Selection**: ESP32 provides built-in Wi-Fi and Bluetooth BLE capabilities at a very cost-effective price point.
2. **Sensor Calibration & Noise Filtering**: Analog telemetry requires smoothing algorithms (e.g. moving average or Kalman filters) to eliminate false spikes.
3. **Low-Power Telemetry**: Implementing Deep Sleep modes allows battery-powered prototypes to operate for months.

\`\`\`cpp
// ESP32 Telemetry Snapshot Broadcast
void sendTelemetryData(float temperature, float humidity) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin("https://api.ronmarquez.tech/v1/telemetry");
        http.addHeader("Content-Type", "application/json");
        String payload = "{\"temp\":" + String(temperature) + ",\"humidity\":" + String(humidity) + "}";
        http.POST(payload);
        http.end();
    }
}
\`\`\`

Stay tuned for more deep dives on hardware-software integration!
`
  }
];

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const normalizedSlug = slug.trim().toLowerCase();

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*, author:profiles(*)")
        .eq("slug", normalizedSlug)
        .maybeSingle();

      if (!error && data) {
        const [{ count: likesCount }, { count: commentsCount }] = await Promise.all([
          supabase.from("likes").select("*", { count: "exact", head: true }).eq("post_id", data.id),
          supabase.from("comments").select("*", { count: "exact", head: true }).eq("post_id", data.id)
        ]);

        return {
          ...data,
          likes_count: likesCount || 0,
          comments_count: commentsCount || 0
        } as BlogPost;
      }
    } catch (err) {
      console.warn("fetchPostBySlug Supabase error:", err);
    }
  }

  // Fallback to local demo posts
  const found = INITIAL_DEMO_POSTS.find(
    p => p.slug.toLowerCase() === normalizedSlug ||
         (normalizedSlug === "architecting-enterprise-hris-payroll-systems" && p.slug === "enterprise-hris-payroll")
  );

  return found || null;
}

// ---------------------------------------------------------------------------
// Chatbot Audit Logging & Analytics
// ---------------------------------------------------------------------------

export interface ChatbotLog {
  id: string;
  session_id: string;
  user_id?: string | null;
  user_email?: string | null;
  user_name?: string | null;
  user_message: string;
  bot_response: string;
  device: string;
  user_agent: string;
  ip_address: string;
  provider?: string;
  created_at: string;
}

export const CHATBOT_LOGS_SQL_SCHEMA = `-- 1. Create table for chatbot visitor & client audit logs
CREATE TABLE IF NOT EXISTS public.chatbot_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_email TEXT,
    user_name TEXT,
    user_message TEXT NOT NULL,
    bot_response TEXT,
    device TEXT,
    user_agent TEXT,
    ip_address TEXT,
    provider TEXT DEFAULT 'ai',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.chatbot_logs ENABLE ROW LEVEL SECURITY;

-- 3. Allow public visitors to insert logs
CREATE POLICY "Allow public insert to chatbot_logs" 
ON public.chatbot_logs 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- 4. Allow Admin to view all audit logs
CREATE POLICY "Allow admin read chatbot_logs" 
ON public.chatbot_logs 
FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND (profiles.role = 'admin' OR profiles.email IN ('marquez.ronrons@gmail.com'))
    )
    OR auth.jwt() ->> 'email' = 'marquez.ronrons@gmail.com'
);

-- 5. Allow Admin to delete audit logs
CREATE POLICY "Allow admin delete chatbot_logs" 
ON public.chatbot_logs 
FOR DELETE 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND (profiles.role = 'admin' OR profiles.email IN ('marquez.ronrons@gmail.com'))
    )
    OR auth.jwt() ->> 'email' = 'marquez.ronrons@gmail.com'
);

-- 6. High-performance composite index on created_at
CREATE INDEX IF NOT EXISTS idx_chatbot_logs_created_at ON public.chatbot_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chatbot_logs_session_id ON public.chatbot_logs (session_id);
`;

const LOCAL_AUDIT_LOGS_KEY = "rom_chatbot_local_audit_logs";

function getLocalAuditLogs(): ChatbotLog[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_AUDIT_LOGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalAuditLog(log: ChatbotLog) {
  if (typeof window === "undefined") return;
  try {
    const logs = getLocalAuditLogs();
    const updated = [log, ...logs.filter(l => l.id !== log.id)].slice(0, 500);
    localStorage.setItem(LOCAL_AUDIT_LOGS_KEY, JSON.stringify(updated));
  } catch (e) {
    // ignore
  }
}

/**
 * Log a chat message pair (User message + Bot response + Client metadata) to Supabase.
 * Also persists to local storage cache so logs are never lost.
 */
export async function logChatMessage(entry: Omit<ChatbotLog, "id" | "created_at">): Promise<ChatbotLog> {
  const localRecord: ChatbotLog = {
    ...entry,
    id: "log_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 7),
    created_at: new Date().toISOString()
  };

  // Always save locally first for instantaneous availability
  saveLocalAuditLog(localRecord);

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("chatbot_logs")
        .insert([{
          session_id: entry.session_id,
          user_id: entry.user_id || null,
          user_email: entry.user_email || null,
          user_name: entry.user_name || null,
          user_message: entry.user_message,
          bot_response: entry.bot_response,
          device: entry.device,
          user_agent: entry.user_agent,
          ip_address: entry.ip_address,
          provider: entry.provider || "ai"
        }])
        .select()
        .maybeSingle();

      if (!error && data) {
        saveLocalAuditLog(data as ChatbotLog);
        return data as ChatbotLog;
      }
    } catch (err) {
      console.warn("Supabase logChatMessage warning:", err);
    }
  }

  return localRecord;
}

/**
 * Fetch audit logs for Admin Audit Module.
 * Merges Supabase records with any locally captured logs.
 */
export async function fetchChatbotLogs(): Promise<{ logs: ChatbotLog[]; fromSupabase: boolean }> {
  let supabaseLogs: ChatbotLog[] = [];
  let fromSupabase = false;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("chatbot_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(300);

      if (!error && data) {
        supabaseLogs = data as ChatbotLog[];
        fromSupabase = true;
      }
    } catch (err) {
      console.warn("fetchChatbotLogs Supabase error:", err);
    }
  }

  const localLogs = getLocalAuditLogs();
  const seenIds = new Set<string>();
  const merged: ChatbotLog[] = [];

  for (const log of [...supabaseLogs, ...localLogs]) {
    if (!seenIds.has(log.id)) {
      seenIds.add(log.id);
      merged.push(log);
    }
  }

  // Sort descending by created_at
  merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return { logs: merged, fromSupabase };
}

/**
 * Delete a single audit log entry
 */
export async function deleteChatbotLog(id: string): Promise<boolean> {
  // Remove from localStorage
  if (typeof window !== "undefined") {
    const logs = getLocalAuditLogs().filter(l => l.id !== id);
    localStorage.setItem(LOCAL_AUDIT_LOGS_KEY, JSON.stringify(logs));
  }

  if (isSupabaseConfigured) {
    try {
      await supabase.from("chatbot_logs").delete().eq("id", id);
      return true;
    } catch (e) {
      console.warn("deleteChatbotLog Supabase error:", e);
    }
  }
  return true;
}

/**
 * Clear all local audit logs
 */
export function clearLocalChatbotLogs(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOCAL_AUDIT_LOGS_KEY);
  }
}

