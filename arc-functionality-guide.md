# Arc Functionality Guide: Complete Feature Overview

Arc is a managed AI proxy platform that sits between customer applications and AI providers. This guide covers every feature, how they work, and how users interact with them.

---

## 1. Core Value Proposition

Arc solves the **"multiple AI providers" problem**:

```
Before Arc:
Customer App → OpenAI API
Customer App → Anthropic API
Customer App → Together API
(3 separate integrations, no unified observability, manual failover)

With Arc:
Customer App → Arc Proxy (one integration)
Arc → OpenAI, Anthropic, Together (routed intelligently)
Arc Dashboard: unified spend, logs, controls
```

**What Arc provides:**
- **Single integration point** — swap `OPENAI_API_KEY` for `ARC_API_KEY`, point to `arc.cornerstone.sh/v1`
- **OpenAI API compatibility** — drop-in replacement, no code changes
- **Multi-provider visibility** — see all AI spend in one dashboard
- **Intelligent routing** — cost/quality-based routing between providers
- **Automatic failover** — if provider goes down, silently reroute
- **Request logging & analytics** — track every request with custom metadata
- **Caching** — exact + semantic caching to reduce costs
- **A/B testing models** — shadow mode to test new models safely
- **Workflow orchestration** — budget caps, rate limits, traces

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  CUSTOMER LAYER                                                 │
│  Customer App uses Arc instead of OpenAI/Anthropic directly    │
│  POST https://arc.cornerstone.sh/v1/chat/completions          │
│  Header: Authorization: Bearer arc_live_xxxx                    │
│  Header: X-Arc-Route: customer-support                          │
│  Body: { model: "gpt-4o", messages: [...] }                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│  ARC PROXY (FastAPI + Uvicorn)                                  │
│  - Request authentication (validate arc_key)                    │
│  - Route resolution (find route config)                         │
│  - Model routing (cost/quality decision)                        │
│  - Cache lookup (exact + semantic)                              │
│  - System prompt injection (if configured)                      │
│  - Geo-location tagging (country tracking)                      │
│  - Request forwarding to provider                               │
│  - Response streaming back to customer                          │
│  - Async logging (fire-and-forget)                              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼────┐      ┌─────▼──────┐    ┌────▼────┐
    │ OpenAI  │      │ Anthropic  │    │ Together│
    │   API   │      │    API     │    │   API   │
    └─────────┘      └────────────┘    └─────────┘
         │
┌────────▼────────────────────────────────────────────────────────┐
│  ARC INFRASTRUCTURE (PostgreSQL + Redis)                        │
│  - requests table (logs every call)                             │
│  - routes table (config)                                        │
│  - provider_keys table (encrypted API keys)                     │
│  - workflows table (budgets, traces)                            │
│  - memory table (agentic memory)                                │
│  - Redis cache (semantic + exact)                               │
└──────────────────────────────────────────────────────────────────┘
         │
┌────────▼────────────────────────────────────────────────────────┐
│  ARC DASHBOARD (Next.js Frontend)                               │
│  - Routes management                                            │
│  - Request logs & analytics                                     │
│  - Model catalog & pricing                                      │
│  - Cache management                                             │
│  - Shadow mode (A/B testing)                                    │
│  - Workflows & traces                                           │
│  - Team workspace                                               │
└──────────────────────────────────────────────────────────────────┘
```

---

## 3. Routes (Core Feature)

A **Route** is a named endpoint you create in Arc. Each route maps to a primary model, optional fallbacks, cache settings, and custom logic.

### Route Configuration

When you create a route, you specify:

| Setting | Purpose | Example |
|---------|---------|---------|
| **Name** | Human-readable label | "Customer Support Chat" |
| **Route Key** (path) | Identifier in `X-Arc-Route` header | `customer-support` |
| **Primary Model** | Main model to use | `gpt-4o` |
| **Cache Mode** | Caching strategy | `semantic` \| `exact` \| `off` |
| **Origin** | Source label (metadata) | "Vercel", "Railway" |
| **System Prompt** | Injected at request time (optional) | "You are a support agent..." |
| **Fallback Models** | If primary fails (optional) | `gpt-4o-mini`, `claude-sonnet` |
| **Color** | Visual badge for UI | clay, moss, ochre, etc. |
| **Status** | active \| paused \| shadow_testing \| archived | active |

### How Routes Work in Practice

```javascript
// Customer app sends request to Arc
const response = await fetch('https://arc.cornerstone.sh/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer arc_live_xxxx',
    'X-Arc-Route': 'customer-support',  // ← Route key
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4o',  // Arc ignores this; uses route's primary model
    messages: [
      { role: 'user', content: 'How do I reset my password?' }
    ],
  }),
})
```

**Arc's processing:**
1. ✓ Validates `Authorization: Bearer arc_live_xxxx` against `arc_keys` table
2. ✓ Resolves `X-Arc-Route: customer-support` → looks up route config
3. ✓ Checks cache (if enabled) for semantic match
4. ✓ Looks up customer's provider key for OpenAI (stored encrypted)
5. ✓ Injects system prompt (if configured)
6. ✓ Forwards request to OpenAI with customer's real API key
7. ✓ Streams response back to customer
8. ✓ Logs request metadata async (tokens, latency, cost, country)
9. → Response arrives at customer in real-time

### Special Routes

**Direct Route**: A pinned, read-only route at the top of routes table:
- Used when customer sends request WITHOUT `X-Arc-Route` header
- Default fallback for all unmatched requests
- Always visible, always stone color
- Cannot be deleted or configured

---

## 4. Models Catalog

The **Models page** displays all available models with pricing and performance metrics.

### What You See

For each model:
- **Name & Provider** — "GPT-4o (OpenAI)" or "Claude 3.5 Sonnet (Anthropic)"
- **Model ID** — `gpt-4o`, `claude-3-5-sonnet`, etc.
- **Status** — available, degraded, or deprecated
- **Context Window** — max tokens (128K, 200K, etc.)
- **Pricing**
  - Input per 1M tokens (e.g., $2.50 for GPT-4o)
  - Output per 1M tokens (e.g., $10.00 for GPT-4o)
- **Average Latency** — typical response time (850ms for GPT-4o)

### Current Models

**OpenAI:**
- GPT-4o (128K context, $2.50 / $10.00)
- GPT-4o Mini (128K, $0.15 / $0.60)
- GPT-4 Turbo (128K, $10 / $30)
- GPT-3.5 Turbo (16K, $0.50 / $1.50) — deprecated
- Text-Embedding-3 models

**Anthropic:**
- Claude Sonnet 4.6 (200K context, $3 / $15)
- Claude 3.5 Sonnet (200K, $3 / $15)
- Claude 3.5 Haiku (200K, $0.80 / $4)
- Claude 3 Opus (200K, $15 / $75)

### Fallback Chain Builder (Not Yet Implemented)

Drag and drop interface to build global fallback chains:
```
Primary → Fallback 1 → Fallback 2
gpt-4o → gpt-4o-mini → claude-sonnet
```

When primary model is unavailable, Arc automatically tries fallbacks in order.

---

## 5. Logs & Request Tracking

The **Logs page** is the request ledger. Every call through Arc is logged with metadata.

### What's Logged

For each request:

| Data | Purpose | Example |
|------|---------|---------|
| **Timestamp** | When request arrived | 2026-04-01 14:23:15 UTC |
| **Route** | Which route was used | customer-support (clay badge) |
| **Model** | Which model handled it | gpt-4o |
| **Tokens** | Prompt + completion tokens | 145 + 387 = 532 total |
| **Cost** | Calculated cost | $0.0156 |
| **Latency** | End-to-end time | 847ms |
| **Cache Hit** | Served from cache? | No |
| **Country** | End user's country (via geolocation) | US, UK, etc. |
| **Status** | Success or error | ✓ Success |

### Key Constraints

Arc logs **metadata only**, NEVER request/response bodies:
- Customer's messages are NOT logged
- Model responses are NOT logged
- Only tokens, cost, latency, route, model are stored
- This keeps logs lean and protects customer privacy

### Log Filtering

Users can filter by:
- **Route** — see logs for specific routes (using pill badges)
- **Date range** — today, last 7 days, last 30 days
- **Model** — gpt-4o, claude-sonnet, etc.
- **Status** — successful, errors

### Logs Table

Clickable rows open a drawer showing:
- Full request details
- Geolocation flag + country
- Related route details
- Cost breakdown

---

## 6. Cache Management

Arc caches responses to reduce costs and improve latency.

### Two Caching Modes

**Exact Match Cache**
- Input: exact same prompt, same model, same system prompt
- Output: returns cached response instantly
- **Best for:** APIs called repeatedly with identical inputs (e.g., template rendering)

**Semantic Cache**
- Input: similar (not identical) prompts are matched
- Uses embedding similarity to find related cached responses
- Output: returns cached response if similarity > threshold
- **Best for:** FAQ bots, chat apps where users ask the same thing in different ways
- **Cost savings:** 60-80% on repeated queries

### Cache Configuration

Per route, users choose:
- **Off** — no caching
- **Exact** — only identical queries
- **Semantic** — similar queries matched via embeddings

### Cache Metrics

On the Cache page, users see:
- **Cache Hit Rate** — % of requests served from cache
- **Total Requests** — requests through Arc
- **Cached Routes** — how many routes have caching enabled
- **Cache Types** — which modes are active (Exact + Semantic, or Exact only)

### Clear Cache

Per route, users can manually clear the cache (e.g., after updating system prompts).

---

## 7. Shadow Mode (A/B Testing Models)

**Shadow Mode** lets you test a new model against production traffic without impacting users.

### How It Works

1. **Enable Shadow Mode** on a route
2. **Configure:**
   - Primary model (current production model)
   - Shadow model (new model to test)
   - Shadow percentage (e.g., 10% of traffic)
3. **Arc's behavior:**
   - 90% of traffic → primary model (returned to user)
   - 10% of traffic → shadow model (run in parallel, discarded)
   - Both responses are evaluated and stored
4. **Evaluations** are run asynchronously:
   - Accuracy score (0-1)
   - Conciseness score (0-1)
   - Completeness score (0-1)
   - Reasoning (why one is better)

### Shadow Test Results

On the Shadow Mode page, users see:
- **Win Rates:**
  - Primary model win % (e.g., 65% wins)
  - Shadow model win % (e.g., 25% wins)
  - Tie % (e.g., 10%)
- **Test History:**
  - Recent tests with scores
  - Side-by-side comparison of responses
- **Recommendation:**
  - If shadow wins consistently, "Ready to promote"

### Use Cases

- Switching from GPT-4o to GPT-4o Mini (cheaper)
- Testing Claude Opus vs. GPT-4o (quality comparison)
- Validating new OpenAI model releases

---

## 8. API Keys Management

Two types of keys:

### Arc API Keys (Org-Level)

These are the keys customers use to call Arc.

**Arc Key Format:** `arc_live_xxxxxxxxxxxx` (prefix + random string)

**What users can do:**
- Generate new Arc keys
- Revoke keys (invalidates immediately)
- See key prefix (last created, when created)
- Track last usage (when key was last used)

**Security:**
- Keys are hashed in database (cannot be recovered)
- Revoked keys immediately stop working
- New keys are shown once, then hidden

### Provider Keys (Org-Level)

These are API keys for OpenAI, Anthropic, etc. that Arc uses to call providers.

**Storage:**
- Encrypted at rest (AES-256-GCM)
- `ENCRYPTION_KEY` env var holds the master key
- Never logged or exposed

**What users can do:**
- Add OpenAI API key
- Add Anthropic API key
- Revoke provider keys
- See masked key (last 4 chars: `sk_live_...ABCD`)

**Security:**
- Only Arc backend has decryption key
- Frontend never sees plaintext keys
- If provider key is revoked, all routes using that provider fail

---

## 9. Analytics & Insights

The **Analytics page** shows AI spend, usage trends, and performance metrics.

### Key Metrics

**Cost Metrics:**
- **Total Spend** — cumulative cost (today, 7d, 30d)
- **Average Cost Per Request** — normalized spend
- **Cost per Model** — breakdown by GPT-4o, Claude, etc.
- **Cost by Route** — which routes are most expensive

**Usage Metrics:**
- **Total Requests** — API calls processed
- **Requests per Model** — which models are used most
- **Requests by Route** — traffic by route

**Performance Metrics:**
- **Average Latency** — typical response time
- **P50, P95, P99** — latency percentiles
- **Cache Hit Rate** — % requests from cache

**Trends:**
- **Period Comparison** — today vs. yesterday, 7d vs. last 7d, etc.
- **Delta %** — % change with color coding (green = increase, red = decrease)
- **Charts** — line graphs showing spend/usage over time

### Data Visualization

- **Stat cards** with large numbers, secondary text, deltas
- **Charts** with animated lines
- **Pixel grid** showing hourly/daily breakdown
- **Period toggles** (today, 7d, 30d)

---

## 10. Workflows & Agent Orchestration

**Workflows** group agentic runs and apply budget/rate limit constraints.

### Workflow Config

When creating a workflow:

| Setting | Purpose | Example |
|---------|---------|---------|
| **Name** | Workflow identifier | "Customer Resolution Agent" |
| **Slug** | Used in `X-Arc-Workflow` header | `customer-resolution` |
| **Description** | What this workflow does | "Resolves support tickets" |
| **Budget Cap** | Max spend per run | $5.00 |
| **Max Duration** | Max seconds per run | 120 (2 min) |
| **Max Calls Per Trace** | Max API calls per trace | 20 |
| **Enforcement Mode** | What happens when limits exceeded | soft \| hard \| downgrade |
| **Trace Timeout** | Max seconds to wait for trace completion | 120 |

### Enforcement Modes

**Soft**
- Log warning, continue execution
- Budget exceeded? Still make the call, but mark as over-budget
- User sees warning but request completes

**Hard**
- Stop execution immediately
- Budget exceeded? Return error to caller
- Safe for strict cost control

**Downgrade**
- Automatically switch to cheaper model
- Budget exceeded? Use gpt-4o-mini instead of gpt-4o
- Balances cost + user experience

### How Workflows Work

```javascript
// Customer agent sends:
POST https://arc.cornerstone.sh/v1/chat/completions
Header: X-Arc-Workflow: customer-resolution
Header: Authorization: Bearer arc_live_xxxx

// Arc's behavior:
1. Look up workflow config for "customer-resolution"
2. Check: have we spent > $5 on this trace?
3. If yes:
   - Soft: warn but proceed
   - Hard: return error
   - Downgrade: switch to gpt-4o-mini
4. Log the call to workflow trace
5. Check: have we made > 20 calls on this trace?
6. If yes: enforce limit based on mode
```

### Workflow Traces

A **trace** is a single run of an agent through Arc.

**Trace data:**
- Workflow name & slug
- Timestamp (when trace started)
- Total cost (sum of all calls)
- Total duration (start to end)
- Call count (number of API calls made)
- Status (running, completed, failed)
- Calls list (each API call with tokens, model, cost)

### Workflows Page

Shows:
- **List of all workflows**
  - Name, description, color badge
  - Running traces count
  - 24h stats (runs, spend, avg cost)
  - Enforcement mode
- **Traces for each workflow**
  - Timeline of recent traces
  - Cost breakdown
  - Call history
- **Create Workflow modal**

---

## 11. Memory Management

**Memory** stores agentic context across requests.

### Use Case

An agent processes a support ticket, stores context in Arc Memory:
```json
{
  "ticket_id": "TICKET-123",
  "customer_id": "cust_abc",
  "conversation_history": [...],
  "resolved_items": ["payment issue", "billing address"],
  "pending_items": ["email verification"]
}
```

Later, when the same customer returns, the agent retrieves this context:
```javascript
GET /api/memory/ticket_id=TICKET-123
// Returns the stored context
// Agent continues from where it left off
```

### Memory Types

**Persistent Storage:**
- Stored in PostgreSQL
- Survives across sessions
- Associated with workflow/trace ID

**TTL (Time-to-Live):**
- Auto-expire after N days
- Configurable per memory item

**Namespacing:**
- Each workflow has isolated memory
- Ticket ID, customer ID, session ID as keys

### Memory API (Not Fully Shown in UI)

```
GET  /api/memory              → List all memory items
GET  /api/memory/:id          → Retrieve specific item
POST /api/memory              → Create memory item
PATCH /api/memory/:id         → Update item
DELETE /api/memory/:id        → Delete item
```

---

## 12. Auto-Tune (Smart Optimization)

**Auto-Tune** analyzes your usage and suggests optimizations.

### What It Does

Scans your logs and suggests:
- **Model downgrade:** "Switch route X from GPT-4o to GPT-4o Mini, save 45%"
- **Cache optimization:** "Enable semantic cache on route Y, saves 30% costs"
- **Fallback chains:** "Add Claude-Haiku fallback to route Z for resilience"

### Optimization Interface

Shows suggestions with:
- **Current state** — current config
- **Proposed change** — what to switch to
- **Impact estimate** — cost savings, latency change
- **Risk level** — low, medium, high
- **Accept / Dismiss buttons**

When user clicks Accept:
- Arc updates the route config
- Changes take effect immediately
- Old config is backed up

---

## 13. Alerts & Monitoring

**Alerts** notify users of anomalies.

### Alert Types (Planned/Partial)

- **Cost spike:** Spend in last hour > 2x average
- **Error rate spike:** Errors > 5% of requests
- **Latency spike:** P99 latency > 2s
- **Rate limiting:** Provider returned 429 (too many requests)
- **API key expiration:** Provider key about to expire
- **Quota exceeded:** Hit provider's monthly quota

### Alert Configuration

Users can enable/disable specific alerts and set thresholds:
```
[ ] Cost spikes (alert if > 150% of avg)
[x] Error rate (alert if > 5%)
[ ] Latency (alert if > 2000ms)
```

---

## 14. Organization & Workspace

**Organization** = company/team (top-level container)
**Project** = working unit within org (e.g., "Support Bot", "PDF Analysis")

### Org Structure

```
Organization: "Acme Corp"
├── Project: "Support Bot"
│   ├── Routes (support-chat, ticket-analysis, escalation)
│   ├── Workflows (support-resolution)
│   └── Analytics (scoped to this project)
├── Project: "PDF Analysis"
│   ├── Routes (pdf-extraction, summarization)
│   ├── Workflows (batch-processing)
│   └── Analytics (scoped to this project)
└── Project: "Internal Tools"
    ├── Routes (admin-chat)
    └── Workflows (admin-scripts)
```

### Key Relationships

- **Arc keys** (customer's API keys) → scoped to **project**
- **Routes** → scoped to **project**
- **Workflows** → scoped to **project**
- **Provider keys** (OpenAI, Anthropic creds) → scoped to **organization** (shared across all projects)
- **Team members** → added at **organization** level
- **Project membership** → explicit (must be invited to project)

### Switching Projects

Users can switch active project via sidebar dropdown:
```
Active Project: Support Bot ▼
  ├─ Support Bot (active, dot indicator)
  ├─ PDF Analysis
  ├─ Internal Tools
  └─ + New project
```

Clicking a project:
- Updates session's `activeProjectId`
- Refreshes dashboard to show that project's data
- All routes, workflows, analytics change to that project

---

## 15. Team Management

**Team** = organization members + their roles.

### Roles (Organization Level)

- **Owner** — full control, billing
- **Admin** — manage team, create projects
- **Member** — read/write to assigned projects

### Team Operations

- **View members:** List all org members with roles
- **Invite members:** Send email invite
- **Remove members:** Revoke access
- **Change roles:** Admin → Member, etc.
- **Pending invites:** List invitations awaiting acceptance

### Project-Level Membership

After inviting a user to org, admin can assign them to specific projects:
- User A is org member but only in "Support Bot" project
- User B is org member and in "PDF Analysis" + "Internal Tools"

---

## 16. Settings & Configuration

### Project Settings

On the Project Settings page:
- **Rename project**
- **Delete project** (with confirmation)
- **Project ID** (UUID, read-only)
- **Created at** (timestamp)

### Org Settings

On Organization Settings page:
- **Rename organization**
- **Manage team** (members, roles, invitations)
- **Billing** (subscription tier, payment method)
- **API usage** (request quota, rate limits)

### Global Preferences

In user profile/account:
- **Theme** (light / dark / auto)
- **Timezone** (for analytics dates)
- **Email preferences** (alerts, digest)

---

## 17. Authentication & Authorization

### Login Flow

1. User navigates to `arc.cornerstone.sh`
2. Redirected to `/login`
3. Options:
   - Email + password
   - Google OAuth
   - GitHub OAuth
4. On first sign-up:
   - Redirected to `/onboarding`
   - Creates organization + default project
   - Sets up first route (optional)
   - Adds provider keys (optional)
5. After completing setup:
   - Redirected to `/dashboard`

### Session Management

- **Session cookie** stored in browser
- **Active project** stored in session (not cookie)
- Session validated on every protected route
- Sign-out clears session and cookies

### OAuth Integration

- Google OAuth: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- GitHub OAuth: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`
- Callback URLs already configured in provider apps
- Users can link multiple OAuth accounts

---

## 18. Data Flow Examples

### Example 1: Create a Route and Make a Request

**Step 1: User creates route in dashboard**
```
Name: "Customer Support Chat"
Route Key: "customer-support"
Primary Model: "gpt-4o"
Cache Mode: "semantic"
System Prompt: "You are a helpful support agent..."
```

Arc stores in DB:
```sql
INSERT INTO routes (id, project_id, path, name, primary_model, cache_mode, system_prompt, color, status)
VALUES ('route_123', 'proj_abc', 'customer-support', 'Customer Support Chat', 'gpt-4o', 'semantic', '...', 'clay', 'active')
```

**Step 2: Customer app makes request**
```javascript
POST https://arc.cornerstone.sh/v1/chat/completions
Authorization: Bearer arc_live_xxxx
X-Arc-Route: customer-support
Content-Type: application/json

{
  "model": "gpt-4o",
  "messages": [
    { "role": "user", "content": "How do I reset my password?" }
  ]
}
```

**Step 3: Arc processes request**
1. ✓ Validates `arc_live_xxxx` → finds user/org
2. ✓ Looks up `customer-support` route → gets config
3. ✓ Checks semantic cache → no hit (first request)
4. ✓ Gets customer's OpenAI key from encrypted storage
5. ✓ Builds request:
   ```json
   {
     "model": "gpt-4o",
     "messages": [
       { "role": "system", "content": "You are a helpful support agent..." },
       { "role": "user", "content": "How do I reset my password?" }
     ]
   }
   ```
6. ✓ Calls OpenAI API (with customer's key)
7. ✓ Receives response, streams back to customer
8. ✓ Logs request async:
   ```sql
   INSERT INTO requests (id, project_id, route_id, model, prompt_tokens, completion_tokens, cost_usd, latency_ms, cache_hit, ip_country)
   VALUES ('req_456', 'proj_abc', 'route_123', 'gpt-4o', 34, 156, 0.0051, 847, FALSE, 'US')
   ```

**Step 4: User sees request in Logs**
- Row in logs table: "Customer Support Chat" (clay) | gpt-4o | 34+156 | $0.0051 | 847ms | cached: no | US

### Example 2: Shadow Mode Test

**Setup:**
- Route: "Support Chat"
- Primary: gpt-4o
- Shadow: claude-3-5-sonnet
- Shadow %: 10%

**Request comes in:**

```
Incoming request → Random chance: 10% or 90%?
  ├─ 90%: Route to gpt-4o
  │   └─ Response sent to customer
  └─ 10%: Route to claude-sonnet (parallel)
      ├─ Response discarded (not sent to customer)
      ├─ Both responses evaluated (accuracy, conciseness, completeness)
      └─ Scores stored in shadow_tests table
```

**User checks Shadow Mode page:**
- Sees test results: "GPT-4o wins 65%, Claude wins 25%, Tie 10%"
- If Claude consistently wins, user can "Promote" it (make it primary)

### Example 3: Workflow with Budget

**Setup:**
```
Workflow: "Customer Resolution Agent"
Budget: $5 per trace
Enforcement: hard (stop if over budget)
```

**Agent makes calls:**
```
Call 1: gpt-4o, 200 tokens → $0.50
Call 2: gpt-4o, 300 tokens → $0.75
Call 3: gpt-4o, 500 tokens → $1.25
...total so far: $2.50

Call 7: gpt-4o, 1000 tokens → would be $5.00
Arc checks: $2.50 + $5.00 = $7.50 > $5 budget

Enforcement: hard → return error to agent
Agent sees: "Budget exceeded, trace terminated"
```

---

## 19. Request Flow Diagram

```
Customer App
    ↓ POST /v1/chat/completions
    ↓ (with arc_key + X-Arc-Route header)
    ↓
Arc Proxy (FastAPI)
    ├─ Auth: Validate arc_key ✓
    ├─ Route: Resolve X-Arc-Route ✓
    ├─ Cache: Check semantic/exact ✓ (if enabled)
    ├─ Model: Resolve primary/fallback ✓
    ├─ Inject: System prompt ✓ (if configured)
    ├─ Encrypt: Customer's provider key (decrypt) ✓
    ├─ Call: Provider API (OpenAI, Anthropic, etc.) ✓
    ├─ Stream: Response back to customer ✓
    ├─ Log: Async to PostgreSQL ✓
    │   (tokens, cost, latency, model, route, country)
    └─ Return: 200 OK with response
    ↓
Customer App receives response
    ↓
Arc Dashboard (Next.js)
    ├─ Logs page: shows request in table
    ├─ Analytics: includes in cost/usage metrics
    ├─ Shadow Mode: evaluates if in shadow
    └─ Workflows: tracks against trace budget
```

---

## 20. Not Yet Implemented (Planned)

Looking at the codebase, these features exist in skeleton form but aren't fully wired:

- **Canary Deployments** (`/api/routes/[id]/canary`) — gradual rollout of model changes
- **Alerts** (`/dashboard/alerts`) — anomaly notifications
- **Advanced Memory Management** (`/dashboard/memory`) — persistent agentic state
- **Fallback Chain Builder** (Models page) — drag-drop model chains
- **Full Stripe Integration** — billing/payments (`/api/stripe/webhook`, `/stripe/checkout`, `/stripe/portal`)
- **Intelligence Chat** (`/api/intelligence/chat`) — Arc-powered meta-assistant
- **Request Traces** — detailed request flow visualization
- **Advanced Autotune** — ML-driven optimization suggestions
- **Provider Health Monitoring** — real-time provider status pages

---

## 21. User Flows

### Flow 1: First-Time User

```
1. Visit arc.cornerstone.sh
2. Sign up (email + password, or OAuth)
3. Onboarding:
   a. Add OpenAI API key (Step 1)
   b. Create first route (Step 2)
   c. Make test request (Step 3)
4. See results in Logs page
5. Explore Models, Cache, Shadow Mode
```

### Flow 2: Migrating Existing App to Arc

```
1. Create Arc account + organization
2. Add provider keys (OpenAI, Anthropic)
3. Create routes mapping to current models
4. Update customer app:
   OLD: fetch('https://api.openai.com/v1/chat/completions', { ...})
   NEW: fetch('https://arc.cornerstone.sh/v1/chat/completions', {
     headers: { 'Authorization': 'Bearer arc_live_xxxx', 'X-Arc-Route': 'support-chat' }
     ...
   })
5. Monitor logs/analytics in Arc dashboard
6. Adjust cache, fallback models as needed
7. Optional: Add shadow mode to test new models
```

### Flow 3: Cost Optimization

```
1. User reviews Analytics page
2. Sees: "40% of requests use gpt-4o, avg latency 850ms"
3. Switches to gpt-4o-mini for less-sensitive route
4. Watches shadow mode for 1 day
5. Quality is similar, cost drops 60%
6. Promotes gpt-4o-mini to primary
```

### Flow 4: Team Collaboration

```
1. Owner creates organization "Acme Corp"
2. Owner invites: dev1@acme.com, dev2@acme.com
3. Owner creates projects: "Support Bot", "Analytics"
4. Owner assigns:
   - dev1 → "Support Bot" (can edit routes)
   - dev2 → "Analytics" (can view logs, analytics)
5. Dev1 creates route, tests it
6. Dev2 views analytics, sees cost trends
7. Both use same organization API keys (shared across projects)
```

---

## 22. Pricing Model (Business Context)

Arc uses **tiered SaaS pricing**:

- **Free Tier**
  - 1 organization, 1 project
  - Limited routes (3)
  - Logs retention: 7 days
  - No advanced features (shadow mode, workflows)

- **Pro Tier** ($99/month)
  - Unlimited organizations, projects
  - Unlimited routes
  - Logs retention: 30 days
  - Shadow mode, workflows, memory
  - 5 team members

- **Scale Tier** (custom)
  - Everything in Pro
  - Priority support
  - Advanced analytics + reporting
  - Custom retention
  - Unlimited team members
  - SLA guarantees

**Billing Model:**
- Arc charges subscription fee
- Customers pay providers directly (OpenAI, Anthropic)
- Arc doesn't mark up provider costs (transparent billing)

---

## Conclusion

Arc is a comprehensive AI proxy platform that solves **"multiple provider complexity"** with a single API, unified observability, intelligent routing, and enterprise features like caching, A/B testing, and workflow orchestration.

The platform is designed for:
- **AI-native startups** (Series A-C, $5K-$100K/mo inference spend)
- **Enterprises** managing multiple AI models and teams
- **Anyone** wanting visibility + control over AI spending

---

## Appendix: API Endpoints Reference

**Frontend API Routes (Next.js):**
- `GET/POST /api/routes` — list/create routes
- `GET/PATCH/DELETE /api/routes/[id]` — get/edit/delete route
- `GET /api/requests` — list requests with filtering
- `GET /api/logs` — alias for requests
- `GET /api/stats` — cache stats, request counts
- `GET /api/analytics` — spend, latency, trends
- `GET /api/shadow` — shadow test results
- `GET /api/models` — available models catalog
- `GET /api/provider-keys` — list provider keys
- `POST /api/provider-keys` — add provider key
- `DELETE /api/provider-keys/[id]` — revoke provider key
- `GET/POST /api/keys` — Arc API keys
- `DELETE /api/keys/[id]` — revoke Arc key
- `GET/POST /api/workflows` — create/list workflows
- `GET /api/workflows/[id]/traces` — workflow traces
- `GET/POST /api/memory` — store/retrieve memory
- `GET/POST /api/project` — workspace projects
- `POST /api/project/set-active` — switch active project
- `GET /api/org/team` — workspace members

**Backend Proxy Endpoint (FastAPI):**
- `POST /v1/chat/completions` — OpenAI-compatible chat endpoint
- `POST /v1/embeddings` — embeddings endpoint
- (Others: `/v1/images/generations`, `/v1/audio/speech`, etc. for future)

