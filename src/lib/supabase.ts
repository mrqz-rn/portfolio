import { createClient } from "@supabase/supabase-js";

const getSupabaseUrl = () => {
  const raw = (import.meta.env.VITE_SUPABASE_URL || "").trim();
  const cleaned = raw.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
  
  if (typeof window !== "undefined" && window.location.hostname.endsWith("ronmarquez.tech")) {
    return window.location.origin;
  }
  return cleaned || "https://vgnfvkycjdckedpifcyl.supabase.co";
};

const supabaseUrl = getSupabaseUrl();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || "").trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith("http") &&
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
    title: "Architecting Enterprise HRIS & Payroll Systems with Vue.js, Laravel & MariaDB",
    slug: "architecting-enterprise-hris-payroll-systems",
    excerpt: "Insights into building scalable internal enterprise architectures, database restructuring, BIR tax computation engines, and seamless legacy migration.",
    tags: ["Systems Architecture", "Vue.js", "Laravel", "Database Design", "Enterprise"],
    published: true,
    cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    likes_count: 14,
    comments_count: 3,
    content: `## The Challenge of Enterprise System Modernization

Enterprise operations frequently outgrow legacy spreadsheets and monolithic legacy applications. When managing thousands of employee records, attendance timecards (DTR), and complex payroll processing, maintainability and real-time computation are essential.

### Core Architectural Considerations

When designing enterprise systems like **SWFS (Sterling Workforce System)**, here are three principles that guaranteed performance and reliability:

1. **Normalized Data Schemas & Indexed Querying**:
   - Attendance logs generate hundreds of thousands of punch records monthly. Indexing foreign keys, employee IDs, and timestamp intervals reduced average payroll calculation time from hours to mere seconds.

2. **Automated Tax & Compliance Engines**:
   - Implementing dynamic formulas for **BIR Tax Computation**, **Alphalist Generation**, and **Clearance Processing** as isolated service classes keeps business logic clean and audit-ready.

3. **Role-Based Access Control (RBAC)**:
   - Granular permissions for Admins, Supervisors, HR Specialists, and Employees ensure that sensitive employee compensation data is strictly protected.

\`\`\`php
// Example: Isolated Payroll Computation Service
class PayrollTaxCalculator {
    public function computeWithholdingTax(float $taxableIncome, string $taxBracket): float {
        // Deterministic tax deduction computation
        return $this->bracketResolver->apply($taxableIncome, $taxBracket);
    }
}
\`\`\`

### Summary
Modernizing business systems is about more than just writing code; it's about deeply understanding the business workflows and delivering tools that empower staff with zero downtime.
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
