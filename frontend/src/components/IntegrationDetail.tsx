import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './IntegrationDetail.css'

interface Integration {
  id: string
  system: string
  direction: string
  method: string
  phase: string
  phaseClass: string
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'llm',
    system: 'OpenAI / Anthropic / Azure OpenAI',
    direction: '→ Outbound',
    method: 'REST API via LLM abstraction layer; PII anonymised before dispatch',
    phase: 'Phase 1',
    phaseClass: 'overview-badge--ok',
  },
  {
    id: 'sso',
    system: 'SSO (Google WS / Azure AD / Okta / SAML)',
    direction: '↔ Bi-directional',
    method: 'OAuth 2.0 / SAML 2.0',
    phase: 'Phase 3',
    phaseClass: 'overview-badge--warn',
  },
  {
    id: 'teams',
    system: 'MS Teams',
    direction: '→ Outbound',
    method: 'Incoming webhook',
    phase: 'Phase 1',
    phaseClass: 'overview-badge--ok',
  },
  {
    id: 'confluence',
    system: 'Confluence',
    direction: '→ Outbound',
    method: 'REST API — page create/update',
    phase: 'Phase 2',
    phaseClass: 'overview-badge--warn',
  },
  {
    id: 'salesforce',
    system: 'Salesforce',
    direction: '↔ Bi-directional',
    method: 'REST API + webhooks; creates/updates projects within 60 s',
    phase: 'Phase 3',
    phaseClass: 'overview-badge--warn',
  },
  {
    id: 'slack',
    system: 'Slack',
    direction: '→ Outbound',
    method: 'Incoming webhook',
    phase: 'Phase 2',
    phaseClass: 'overview-badge--warn',
  },
]

const ACTORS = ['User / UI', 'Blueprint API', '', 'Auth Provider']

const STEPS: Array<{ from: number; to: number; label: string; dashed?: boolean }> = [
  { from: 0, to: 1, label: '1. Trigger request' },
  { from: 1, to: 3, label: '2. Validate token (OAuth / SAML)' },
  { from: 3, to: 1, label: '3. Token confirmed', dashed: true },
  { from: 1, to: 2, label: '4. API call (REST / webhook)' },
  { from: 2, to: 1, label: '5. Response / acknowledgement', dashed: true },
  { from: 1, to: 1, label: '6. Audit log + OpenTelemetry span' },
  { from: 1, to: 0, label: '7. Return result to user', dashed: true },
]

function SequenceDiagram({ externalSystem }: { externalSystem: string }) {
  const [scale, setScale] = useState(80)
  const scaleStep = 10
  const scaleMin = 40
  const scaleMax = 100

  const actors = [...ACTORS]
  actors[2] = externalSystem

  const W = 780
  const colW = W / actors.length
  const cols = actors.map((_, i) => colW * i + colW / 2)
  const rowH = 52
  const headerH = 44
  const totalH = headerH + STEPS.length * rowH + 20

  return (
    <div className="integration-detail-seq-wrap">
      <div className="integration-detail-seq-scale-controls">
        <button onClick={() => setScale(s => Math.max(scaleMin, s - scaleStep))} className="integration-detail-seq-scale-btn">−</button>
        <span className="integration-detail-seq-scale-label">{scale}%</span>
        <button onClick={() => setScale(s => Math.min(scaleMax, s + scaleStep))} className="integration-detail-seq-scale-btn">+</button>
      </div>
      <svg
        viewBox={`0 0 ${W} ${totalH}`}
        width={`${scale}%`}
        style={{ display: 'block' }}
        className="integration-detail-seq-svg"
      >
        {/* Actor boxes */}
        {actors.map((name, i) => (
          <g key={i}>
            <rect
              x={cols[i] - 72}
              y={4}
              width={144}
              height={30}
              rx={5}
              className="seq-actor-box"
            />
            <text x={cols[i]} y={24} textAnchor="middle" className="seq-actor-text">
              {name}
            </text>
          </g>
        ))}

        {/* Lifelines */}
        {cols.map((x, i) => (
          <line
            key={i}
            x1={x} y1={34}
            x2={x} y2={totalH - 10}
            className="seq-lifeline"
            strokeDasharray="4 4"
          />
        ))}

        {/* Arrows */}
        {STEPS.map((step, si) => {
          const y = headerH + si * rowH + rowH / 2
          const x1 = cols[step.from]
          const x2 = cols[step.to]
          const isSelf = step.from === step.to
          const dir = x2 > x1 ? 1 : -1
          const midX = (x1 + x2) / 2

          if (isSelf) {
            const lx = x1 + 18
            return (
              <g key={si}>
                <path
                  d={`M ${x1} ${y - 10} H ${lx + 20} V ${y + 10} H ${x1}`}
                  className={`seq-arrow-path${step.dashed ? ' seq-arrow-path--dashed' : ''}`}
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
                <text x={lx + 24} y={y + 4} className="seq-step-label">{step.label}</text>
              </g>
            )
          }

          return (
            <g key={si}>
              <line
                x1={x1 + (dir * 4)}
                y1={y}
                x2={x2 - (dir * 4)}
                y2={y}
                className={`seq-arrow-line${step.dashed ? ' seq-arrow-line--dashed' : ''}`}
                markerEnd="url(#arrowhead)"
              />
              <text x={midX} y={y - 7} textAnchor="middle" className="seq-step-label">
                {step.label}
              </text>
            </g>
          )
        })}

        <defs>
          <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" className="seq-arrowhead" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

export function IntegrationDetail({ integrationId }: { integrationId?: string }) {
  const navigate = useNavigate()
  const integration = integrationId ? INTEGRATIONS.find((i) => i.id === integrationId) : null

  if (!integration) {
    return (
      <div className="overview">
        <div className="integration-detail-empty">
          <span className="integration-detail-empty-icon">🔗</span>
          <div className="integration-detail-empty-title">Select an integration to view its specification</div>
          <div className="integration-detail-empty-desc">
            Choose a system from the Integration Map in Solution Architecture to see its full technical detail.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="overview">
      <div className="integration-detail-header">
        <div className="integration-detail-header-left">
          <span className="overview-card-icon">🔗</span>
          <div>
            <div className="integration-detail-title">{integration.system}</div>
            <div className="integration-detail-meta">
              <span>{integration.direction}</span>
              <span className={`overview-badge ${integration.phaseClass}`}>{integration.phase}</span>
            </div>
          </div>
        </div>
        <button className="integration-detail-back-btn" onClick={() => navigate('/solution-architecture/integration-data')}>
          ← Back to Integration Map
        </button>
      </div>

      <div className="integration-detail-discovery-notice">
        <span className="integration-detail-notice-icon">🔍</span>
        <div>
          <div className="integration-detail-notice-title">Specification to be finalised at Discovery</div>
          <div className="integration-detail-notice-body">
            The sections below represent the expected scope based on our understanding of your requirements.
            During the <strong>Discovery phase</strong> (Weeks 1–2), we will work with your team to confirm
            exact API versions, authentication flows, field mappings, and error-handling contracts.
            Each item marked <em>"TBC at Discovery"</em> will be locked and added to the Integration
            Specification Document before development begins.
          </div>
        </div>
      </div>

      <div className="integration-detail-grid">

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">⚙️</span>
            Technical Specification
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Integration method</td>
                <td>{integration.method}</td>
              </tr>
              <tr>
                <td className="overview-table-label">Authentication</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">API version / endpoint</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Rate limits</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Retry & timeout policy</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📦</span>
            Data Contract
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Payload format</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Key fields mapped</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">PII / sensitive data</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Data volume (est.)</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Schema versioning</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🛡️</span>
            Security & Compliance
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Transport encryption</td>
                <td>TLS 1.2+ enforced</td>
              </tr>
              <tr>
                <td className="overview-table-label">Credential storage</td>
                <td>AWS Secrets Manager / Azure Key Vault</td>
              </tr>
              <tr>
                <td className="overview-table-label">Scopes / permissions required</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Audit logging</td>
                <td>All calls logged to centralised audit trail</td>
              </tr>
              <tr>
                <td className="overview-table-label">Data residency constraints</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🚨</span>
            Error Handling & Observability
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Failure mode</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Circuit breaker</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Alerting threshold</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Dashboards / traces</td>
                <td>Distributed tracing via OpenTelemetry</td>
              </tr>
              <tr>
                <td className="overview-table-label">Runbook location</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card integration-detail-card--wide">
          <div className="overview-card-header">
            <span className="overview-card-icon">🔄</span>
            Sequence Diagram
            <span className="integration-detail-example-badge">Example — exact flow confirmed at Discovery</span>
          </div>
          <div className="integration-detail-seq-notice">
            The diagram below illustrates a representative happy-path flow based on our current understanding.
            Precise steps, actors, and error branches will be finalised with your team during Discovery (Weeks 1–2).
          </div>
          <SequenceDiagram externalSystem={integration.system.split('/')[0].trim()} />
        </div>

        <div className="overview-card integration-detail-card--wide">
          <div className="overview-card-header">
            <span className="overview-card-icon">🏛️</span>
            Architecturally Significant Requirements (ASRs)
            <span className="integration-detail-example-badge">Each ASR below will produce an ADR during Discovery</span>
          </div>
          <div className="integration-detail-asr-intro">
            The requirements listed here are <strong>architecturally significant</strong> — they constrain the design
            in ways that cannot be reversed cheaply once development begins. Because the correct solution depends on
            information only your team holds (existing infrastructure, compliance obligations, operational policies),
            each ASR must be resolved through a documented <strong>Architecture Decision Record (ADR)</strong> before
            coding starts. Leaving these open risks costly rework, security gaps, or integration failures in production.
          </div>
          <div className="integration-detail-asr-list">

            <div className="integration-detail-asr-item">
              <div className="integration-detail-asr-header">
                <span className="integration-detail-asr-id">ASR-01</span>
                <span className="integration-detail-asr-title">Authentication &amp; Token Lifecycle</span>
                <span className="integration-detail-asr-category">Security</span>
              </div>
              <div className="integration-detail-asr-body">
                <div className="integration-detail-asr-requirement">
                  The integration must authenticate with {integration.system.split('/')[0].trim()} using a mechanism
                  that supports secret rotation without downtime, satisfies your organisation's token expiry policy,
                  and does not store long-lived credentials in application code or environment variables.
                </div>
                <div className="integration-detail-asr-why-adr">
                  <span className="integration-detail-asr-why-label">Why an ADR is required:</span>
                  The choice between service-account keys, OAuth client-credentials flow, workload-identity federation,
                  and managed identities has irreversible consequences for secret sprawl, audit trails, and rotation
                  automation. The right answer depends on your cloud provider, existing IAM setup, and compliance
                  requirements — facts only your team can confirm.
                </div>
              </div>
            </div>

            <div className="integration-detail-asr-item">
              <div className="integration-detail-asr-header">
                <span className="integration-detail-asr-id">ASR-02</span>
                <span className="integration-detail-asr-title">Latency &amp; Throughput Envelope</span>
                <span className="integration-detail-asr-category">Performance</span>
              </div>
              <div className="integration-detail-asr-body">
                <div className="integration-detail-asr-requirement">
                  The integration must meet a defined maximum end-to-end latency (p95) and peak request-per-second
                  ceiling under normal load, without triggering the external system's rate-limit quotas or
                  degrading Blueprint's own response times.
                </div>
                <div className="integration-detail-asr-why-adr">
                  <span className="integration-detail-asr-why-label">Why an ADR is required:</span>
                  Whether to use synchronous calls, an async queue, or a batch job is not a stylistic choice —
                  it is driven by your SLA, the external API's rate limits, and expected call volume. Building
                  the wrong pattern means either unacceptable latency or throttling errors visible to end users.
                  Your team must confirm expected volumes before we commit to a concurrency model.
                </div>
              </div>
            </div>

            <div className="integration-detail-asr-item">
              <div className="integration-detail-asr-header">
                <span className="integration-detail-asr-id">ASR-03</span>
                <span className="integration-detail-asr-title">Failure Isolation &amp; Graceful Degradation</span>
                <span className="integration-detail-asr-category">Reliability</span>
              </div>
              <div className="integration-detail-asr-body">
                <div className="integration-detail-asr-requirement">
                  If {integration.system.split('/')[0].trim()} becomes unavailable, Blueprint must continue to
                  operate its core workflow without data loss and without presenting unhandled errors to users.
                  The acceptable degraded behaviour (queue, skip, warn, or block) must be specified per use-case.
                </div>
                <div className="integration-detail-asr-why-adr">
                  <span className="integration-detail-asr-why-label">Why an ADR is required:</span>
                  "Fail gracefully" means different things depending on business priority: blocking the workflow
                  is safest for financial data; silently queuing is better for notifications. The wrong default
                  either corrupts data or locks out users. Only your team can define acceptable degraded
                  behaviour, and the circuit-breaker, retry, and dead-letter design must follow from that decision.
                </div>
              </div>
            </div>

            <div className="integration-detail-asr-item">
              <div className="integration-detail-asr-header">
                <span className="integration-detail-asr-id">ASR-04</span>
                <span className="integration-detail-asr-title">PII &amp; Sensitive-Data Boundary</span>
                <span className="integration-detail-asr-category">Compliance</span>
              </div>
              <div className="integration-detail-asr-body">
                <div className="integration-detail-asr-requirement">
                  Any personally identifiable information (PII) or data classified as sensitive under your
                  data-governance policy must be identified, minimised, and either anonymised or encrypted
                  before being transmitted to or stored by {integration.system.split('/')[0].trim()}.
                </div>
                <div className="integration-detail-asr-why-adr">
                  <span className="integration-detail-asr-why-label">Why an ADR is required:</span>
                  The field-level classification of data depends on your internal data catalogue and applicable
                  regulations (GDPR, HIPAA, SOC 2). We cannot determine which fields are PII without your
                  data-governance team's input. The ADR will document the agreed field inventory, masking
                  strategy, and the legal basis for the transfer — serving as the audit record if ever challenged.
                </div>
              </div>
            </div>

            <div className="integration-detail-asr-item">
              <div className="integration-detail-asr-header">
                <span className="integration-detail-asr-id">ASR-05</span>
                <span className="integration-detail-asr-title">Data-Residency &amp; Sovereignty</span>
                <span className="integration-detail-asr-category">Compliance</span>
              </div>
              <div className="integration-detail-asr-body">
                <div className="integration-detail-asr-requirement">
                  All data in transit and at rest must remain within approved geographic regions.
                  If {integration.system.split('/')[0].trim()} routes traffic or stores data outside your
                  permitted jurisdictions, a compliant routing or proxy strategy must be adopted.
                </div>
                <div className="integration-detail-asr-why-adr">
                  <span className="integration-detail-asr-why-label">Why an ADR is required:</span>
                  Regional API endpoint availability varies per vendor and per subscription tier. A routing
                  decision made without this knowledge can violate data-sovereignty obligations that carry
                  regulatory penalties. The ADR locks in the approved region list and documents the
                  verification steps taken — required evidence for compliance audits.
                </div>
              </div>
            </div>

            <div className="integration-detail-asr-item">
              <div className="integration-detail-asr-header">
                <span className="integration-detail-asr-id">ASR-06</span>
                <span className="integration-detail-asr-title">Schema Versioning &amp; Backward Compatibility</span>
                <span className="integration-detail-asr-category">Maintainability</span>
              </div>
              <div className="integration-detail-asr-body">
                <div className="integration-detail-asr-requirement">
                  The integration must handle breaking changes to the {integration.system.split('/')[0].trim()} API
                  schema without requiring a coordinated, same-day deployment of Blueprint.
                  A versioning and migration strategy must be agreed upon before go-live.
                </div>
                <div className="integration-detail-asr-why-adr">
                  <span className="integration-detail-asr-why-label">Why an ADR is required:</span>
                  External APIs change: fields are deprecated, authentication flows are retired, and new
                  required fields appear. Without a documented versioning contract and tested migration
                  path, a vendor-side update can silently break production overnight. The ADR specifies
                  the canary-testing, contract-testing, and rollback strategy your operations team will own.
                </div>
              </div>
            </div>

            <div className="integration-detail-asr-item">
              <div className="integration-detail-asr-header">
                <span className="integration-detail-asr-id">ASR-07</span>
                <span className="integration-detail-asr-title">Network Topology &amp; Access Control</span>
                <span className="integration-detail-asr-category">Security</span>
              </div>
              <div className="integration-detail-asr-body">
                <div className="integration-detail-asr-requirement">
                  Outbound connections to {integration.system.split('/')[0].trim()} must traverse only
                  approved network paths. Any IP allowlisting, VPN tunnels, private link configurations,
                  or firewall rules required by your security team must be provisioned before integration
                  testing begins.
                </div>
                <div className="integration-detail-asr-why-adr">
                  <span className="integration-detail-asr-why-label">Why an ADR is required:</span>
                  Network provisioning often has a lead time of days to weeks and requires sign-off from
                  your infrastructure and security teams. If the approved egress path is not established
                  before development, the integration cannot be tested in a representative environment,
                  and security issues surface too late to fix without delaying the phase. The ADR triggers
                  this provisioning work in parallel with development.
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="overview-card integration-detail-card--wide">
          <div className="overview-card-header">
            <span className="overview-card-icon">📋</span>
            Discovery Questions
          </div>
          <div className="integration-detail-questions">
            <div className="integration-detail-question">
              <span className="integration-detail-q-num">1</span>
              <span>Which environment (sandbox / production) will be available during Phase 1 testing?</span>
            </div>
            <div className="integration-detail-question">
              <span className="integration-detail-q-num">2</span>
              <span>Who on your team is the integration owner / technical contact for this system?</span>
            </div>
            <div className="integration-detail-question">
              <span className="integration-detail-q-num">3</span>
              <span>Are there existing API credentials or does provisioning require a procurement process?</span>
            </div>
            <div className="integration-detail-question">
              <span className="integration-detail-q-num">4</span>
              <span>Are there IP allowlisting, VPN, or network access requirements?</span>
            </div>
            <div className="integration-detail-question">
              <span className="integration-detail-q-num">5</span>
              <span>What data retention and deletion obligations apply to payloads sent through this integration?</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
