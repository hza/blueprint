import React, { useState } from 'react'
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

interface AsrSliders {
  cost: number
  complexity: number
  novelty: number
  risk: number
  reward: number
  legalComp: number
  politics: number
  constraints: number
  principles: number
  skills: number
  doability: number
}

interface AsrCardData {
  id: string
  title: string
  domain: string
  criticality: 'Critical' | 'High' | 'Medium' | 'Low'
  status: string
  requirement: string
  significance: string
  sliders: AsrSliders
  strategy: string
  ideas: string
  stakeholders: string
}

const ASR_CARDS: AsrCardData[] = [
  {
    id: 'ASR-01',
    title: 'Authentication & Token Lifecycle',
    domain: 'Security',
    criticality: 'High',
    status: 'TBC',
    requirement:
      'The integration must authenticate using a mechanism that supports zero-downtime secret rotation, satisfies your organisation\'s token expiry policy, and stores no long-lived credentials in application code or environment variables.',
    significance:
      'Wrong auth pattern causes credential sprawl, failed compliance audits, and rotation-induced outages. Once the integration ships, switching auth mechanisms requires redeploying and re-credentialing every environment — not a cheap fix.',
    sliders: { cost: 35, complexity: 65, novelty: 40, risk: 80, reward: 70, legalComp: 75, politics: 40, constraints: 60, principles: 70, skills: 35, doability: 30 },
    strategy:
      'Week 1 — confirm cloud provider, IAM setup, and existing credential management tooling. Week 2 — evaluate OAuth client-credentials vs workload identity vs managed identity. Lock mechanism in ADR before Sprint 1 development begins.',
    ideas: 'Workload Identity Federation (preferred); OAuth 2.0 client-credentials with Secrets Manager rotation; API key with automated rotation pipeline',
    stakeholders: 'Cloud Infra Lead, Security Architect, Compliance Officer',
  },
  {
    id: 'ASR-02',
    title: 'Latency & Throughput Envelope',
    domain: 'Performance',
    criticality: 'High',
    status: 'TBC',
    requirement:
      'The integration must sustain the agreed p95 latency ceiling and peak RPS without triggering the external system\'s rate-limit quotas or degrading Blueprint\'s own response times for end users.',
    significance:
      'Choosing synchronous calls, an async queue, or a batch pattern is architecturally irreversible at scale. The wrong choice surfaces as throttling errors or user-visible latency under load — not detectable until production traffic hits.',
    sliders: { cost: 50, complexity: 70, novelty: 30, risk: 65, reward: 75, legalComp: 20, politics: 35, constraints: 70, principles: 30, skills: 40, doability: 45 },
    strategy:
      'Week 1 — gather expected call volumes, SLA targets, and vendor rate-limit quotas. Week 2 — select concurrency model (synchronous / queued / batched) and lock in ADR before integration design is finalised.',
    ideas: 'Async queue with back-pressure (preferred for high volume); synchronous with client-side throttle; nightly batch for non-realtime data',
    stakeholders: 'Product Owner (SLA targets), Platform Architect, Vendor Integration Contact',
  },
  {
    id: 'ASR-03',
    title: 'Failure Isolation & Graceful Degradation',
    domain: 'Reliability',
    criticality: 'Critical',
    status: 'TBC',
    requirement:
      'When the external system is unavailable, Blueprint must continue core operations without data loss or unhandled errors. The acceptable degraded behaviour — queue, skip, warn, or block — must be explicitly specified per use-case before coding begins.',
    significance:
      'Without a defined failure contract, outages cascade through Blueprint workflows. "Fail gracefully" means different things: blocking is safest for financial data; silently queuing is right for notifications. The wrong default either drops data or locks out users — both are production incidents.',
    sliders: { cost: 40, complexity: 60, novelty: 35, risk: 85, reward: 80, legalComp: 30, politics: 50, constraints: 45, principles: 40, skills: 30, doability: 35 },
    strategy:
      'Week 1 — for each integration use-case, define whether an outage should queue, skip, warn, or block. Week 2 — design circuit-breaker thresholds and dead-letter handling. Lock failure contract in ADR before Sprint 2.',
    ideas: 'Circuit breaker with dead-letter queue (preferred); graceful skip with UI warning banner; synchronous block with user-facing retry prompt',
    stakeholders: 'Product Owner, Operations Lead, QA Lead',
  },
  {
    id: 'ASR-04',
    title: 'PII & Sensitive-Data Boundary',
    domain: 'Compliance',
    criticality: 'Critical',
    status: 'TBC',
    requirement:
      'All PII and governance-classified sensitive data must be identified, minimised, and anonymised or encrypted before transmission to or storage by the external system. The legal basis for the transfer must be documented.',
    significance:
      'Transmitting unmasked PII without a valid legal basis is a GDPR/HIPAA violation. Field classification cannot be determined without access to your internal data catalogue — any assumption made during development risks regulatory exposure and cannot be undone after data has left the perimeter.',
    sliders: { cost: 45, complexity: 55, novelty: 40, risk: 90, reward: 65, legalComp: 90, politics: 60, constraints: 75, principles: 80, skills: 45, doability: 40 },
    strategy:
      'Week 1 — data-governance team provides field-level classification inventory. Week 2 — agree masking strategy and legal transfer basis. ADR becomes the audit artefact for the transfer — required evidence if the integration is ever challenged.',
    ideas: 'Tokenisation of PII fields before dispatch (preferred); server-side anonymisation proxy; field-level encryption with isolated key management',
    stakeholders: 'Data Governance Officer, Legal / DPO, Security Architect, Compliance Officer',
  },
  {
    id: 'ASR-05',
    title: 'Data Residency & Sovereignty',
    domain: 'Compliance',
    criticality: 'High',
    status: 'TBC',
    requirement:
      'All data in transit and at rest must remain within your approved geographic jurisdictions. If the external system routes traffic or stores data outside permitted regions, a compliant routing or proxy strategy must be adopted before go-live.',
    significance:
      'Regional API endpoint availability varies by vendor tier and subscription plan. A routing decision made without confirming this can violate data-sovereignty law — penalties are regulatory, not just technical, and cannot be retroactively remedied by a hotfix.',
    sliders: { cost: 40, complexity: 50, novelty: 35, risk: 85, reward: 55, legalComp: 95, politics: 55, constraints: 80, principles: 85, skills: 50, doability: 40 },
    strategy:
      'Week 1 — confirm approved jurisdiction list and the vendor\'s regional endpoint catalogue. If a gap exists, design egress proxy or regional deployment in Week 2. ADR documents approved regions and verification steps — required evidence for compliance audits.',
    ideas: 'Vendor-native regional endpoint (preferred if available); egress proxy pinned to compliant region; separate regional Blueprint deployment co-located with data',
    stakeholders: 'Legal / DPO, Cloud Infra Lead, Vendor Account Manager',
  },
  {
    id: 'ASR-06',
    title: 'Schema Versioning & Backward Compatibility',
    domain: 'Maintainability',
    criticality: 'Medium',
    status: 'TBC',
    requirement:
      'The integration must tolerate breaking changes to the external API schema without requiring a coordinated same-day deployment of Blueprint. A versioning and migration strategy must be established and tested before go-live.',
    significance:
      'External APIs change continuously: fields are deprecated, auth flows retired, new required fields added with no warning. Without a migration contract, a vendor-side change can silently break production overnight — and the root cause is the absent design decision, not a new bug.',
    sliders: { cost: 35, complexity: 55, novelty: 25, risk: 60, reward: 70, legalComp: 20, politics: 30, constraints: 40, principles: 35, skills: 35, doability: 25 },
    strategy:
      'Week 1 — confirm vendor API versioning policy and deprecation notice period. Week 2 — design consumer-driven contract tests and rollback procedure. ADR specifies version-pinning strategy and migration triggers.',
    ideas: 'Consumer-driven contract tests via Pact (preferred); version-pinned client with deprecation alert pipeline; API gateway with version shim layer',
    stakeholders: 'Platform Architect, DevOps Lead, Vendor Integration Contact',
  },
  {
    id: 'ASR-07',
    title: 'Network Topology & Access Control',
    domain: 'Security',
    criticality: 'High',
    status: 'TBC',
    requirement:
      'All outbound connections must traverse only approved network paths. Required IP allowlisting, VPN tunnels, or private link configurations must be provisioned before integration testing begins — not after.',
    significance:
      'Network provisioning has a multi-week lead time and requires explicit security sign-off. Starting development without a confirmed egress path means the integration cannot be tested in a representative environment, and security gaps surface too late to fix without delaying the phase.',
    sliders: { cost: 30, complexity: 60, novelty: 30, risk: 75, reward: 60, legalComp: 50, politics: 45, constraints: 70, principles: 55, skills: 40, doability: 35 },
    strategy:
      'Week 1 — map required egress paths and confirm security team\'s allowlisting and provisioning process. Raise the provisioning request immediately — lead time is the critical path. ADR triggers this work in parallel with development so it is not a blocker at Sprint 1.',
    ideas: 'NAT gateway with static egress IP (preferred); AWS PrivateLink / VPC peering; egress proxy with allowlisted upstream',
    stakeholders: 'Security Architect, Network / Infra Lead, External System Admin',
  },
]

type SliderCol = { label: string; left: string; right: string; value: number | null }

function AsrCardView({ card }: { card: AsrCardData }) {
  const critClass =
    card.criticality === 'Critical' ? 'asr-card-crit--critical'
    : card.criticality === 'High' ? 'asr-card-crit--high'
    : card.criticality === 'Medium' ? 'asr-card-crit--medium'
    : 'asr-card-crit--low'

  const rows: SliderCol[][] = [
    [
      { label: 'COST', left: 'no impact', right: 'significant impact', value: card.sliders.cost },
      { label: 'REWARD', left: 'no return', right: 'high returns', value: card.sliders.reward },
      { label: 'PRINCIPLES', left: 'compliant', right: 'major non-compliance', value: card.sliders.principles },
    ],
    [
      { label: 'COMPLEXITY', left: 'simple', right: 'complex', value: card.sliders.complexity },
      { label: 'LEGAL & COMP', left: 'no impact', right: 'significant impact', value: card.sliders.legalComp },
      { label: 'SKILLS', left: 'available', right: 'unavailable', value: card.sliders.skills },
    ],
    [
      { label: 'NOVELTY', left: 'not new', right: 'bleeding edge', value: card.sliders.novelty },
      { label: 'POLITICS', left: 'low visibility', right: 'high visibility', value: card.sliders.politics },
      { label: 'DOABILITY', left: 'doable', right: 'impossible', value: card.sliders.doability },
    ],
    [
      { label: 'RISK', left: 'low', right: 'high', value: card.sliders.risk },
      { label: 'CONSTRAINTS', left: 'no constraints', right: 'constraints', value: card.sliders.constraints },
      { label: 'other:', left: '', right: '', value: null },
    ],
  ]

  return (
    <div className="asr-card">
      <div className="asr-card-header-row">
        <div className="asr-card-heading-cell">
          <span className="asr-card-heading-label">ASR CARD</span>
          <span className="asr-card-heading-id">{card.id} — {card.title}</span>
        </div>
        <div className="asr-card-meta-fields">
          <div className="asr-card-meta-field">
            <span className="asr-card-meta-key">DOMAIN:</span>
            <span className="asr-card-meta-val">{card.domain}</span>
          </div>
          <div className="asr-card-meta-field">
            <span className="asr-card-meta-key">CRITICALITY:</span>
            <span className={`asr-card-meta-val asr-card-crit ${critClass}`}>{card.criticality}</span>
          </div>
          <div className="asr-card-meta-field">
            <span className="asr-card-meta-key">DATE:</span>
            <span className="asr-card-meta-val">Discovery</span>
          </div>
          <div className="asr-card-meta-field">
            <span className="asr-card-meta-key">STATUS:</span>
            <span className="asr-card-meta-val">{card.status}</span>
          </div>
        </div>
      </div>

      <div className="asr-card-section">
        <div className="asr-card-section-lbl">ARCHITECTURALLY SIGNIFICANT REQUIREMENT &amp; ARCHITECTURE CONTEXT:</div>
        <div className="asr-card-section-txt">{card.requirement}</div>
      </div>

      <div className="asr-card-section">
        <div className="asr-card-section-lbl">SIGNIFICANCE &amp; IMPACT:</div>
        <div className="asr-card-section-txt">{card.significance}</div>
      </div>

      <div className="asr-card-section">
        <div className="asr-card-section-lbl">CHARACTERISTICS:</div>
        <div className="asr-card-chars-grid">
          {rows.map((row, ri) => (
            <div key={ri} className="asr-card-chars-row">
              {row.map((col) => (
                <div key={col.label} className="asr-card-char-cell">
                  <span className="asr-card-char-lbl">{col.label}</span>
                  <div className="asr-card-slider-wrap">
                    <span className="asr-card-slider-edge">{col.left}</span>
                    <div className="asr-card-slider-track">
                      {col.value !== null && (
                        <div className="asr-card-slider-dot" style={{ left: `${col.value}%`, background: `hsl(${240 + (col.value ?? 0) * 1.2}, 90%, 50%)` }} />
                      )}
                    </div>
                    <span className="asr-card-slider-edge">{col.right}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="asr-card-section">
        <div className="asr-card-section-lbl">STRATEGY &amp; PLAN:</div>
        <div className="asr-card-section-txt">{card.strategy}</div>
      </div>

      <div className="asr-card-footer-row">
        <div className="asr-card-footer-cell">
          <div className="asr-card-section-lbl">IDEAS:</div>
          <div className="asr-card-section-txt">{card.ideas}</div>
        </div>
        <div className="asr-card-footer-cell">
          <div className="asr-card-section-lbl">STAKEHOLDERS:</div>
          <div className="asr-card-section-txt">{card.stakeholders}</div>
        </div>
      </div>
    </div>
  )
}

interface QattCardData {
  id: string
  title: string
  domain: string
  ownedBy: string
  qualityAttribute: string
  qualityAttributeRequirement: string
  characteristic: string
  subcharacteristic: string
  sourceOfStimulus: string
  environment: string
  stimulus: string
  artifacts: string
  response: string
  responseMeasure: string
  measure: string
  unit: string
  tradeoffsPlus: string[]
  tradeoffsMinus: string[]
  tactics: string[]
}

const QATT_CARDS: QattCardData[] = [
  {
    id: 'QATT-01',
    title: 'LLM Response Latency',
    domain: 'Performance',
    ownedBy: 'Solution Architect',
    qualityAttribute: 'Performance Efficiency',
    qualityAttributeRequirement:
      'Under normal load, the system must return a complete LLM-generated response to the end user within 5 seconds of request submission, measured at the API gateway, for 95% of requests.',
    characteristic: 'Time Behaviour',
    subcharacteristic: 'Response Time',
    sourceOfStimulus: 'End user submitting an RFP analysis request via the Blueprint UI',
    environment: 'Normal Operation — up to 50 concurrent users. Seasonal Peak — RFP deadline periods with up to 200 concurrent users.',
    stimulus: 'User triggers an LLM completion request (e.g. generate executive summary, score requirements coverage)',
    artifacts: 'LLM abstraction layer; Blueprint API; OpenAI / Anthropic / Azure OpenAI endpoint',
    response: 'API gateway receives the full streamed response from the LLM provider and delivers it to the client within the SLA threshold',
    responseMeasure: 'End-to-end response time from API gateway request receipt to last token delivered to the client, sampled at P95 across a 5-minute window',
    measure: 'P95 latency',
    unit: 'seconds (≤ 5 s)',
    tradeoffsPlus: [
      'Streaming responses reduce perceived latency significantly',
      'Model tier selection (e.g. GPT-4o-mini vs GPT-4o) allows cost-latency balancing',
      'Caching identical prompts eliminates repeat LLM round-trips',
    ],
    tradeoffsMinus: [
      'Streaming requires stateful connections — harder to load-balance',
      'Cheaper / faster models may reduce output quality',
      'Prompt caching adds cache-invalidation complexity',
    ],
    tactics: [
      'Implement server-sent events (SSE) streaming from API to browser',
      'Route to GPT-4o-mini for draft generation; GPT-4o for final scoring passes',
      'Semantic prompt cache with 1-hour TTL keyed on normalised prompt hash',
      'Circuit breaker with 3 s timeout; fall back to queued async delivery with email notification',
      'OpenTelemetry span per LLM call — alert on P95 > 4 s',
    ],
  },
  {
    id: 'QATT-02',
    title: 'SSO Token Validation Availability',
    domain: 'Reliability',
    ownedBy: 'Security Architect',
    qualityAttribute: 'Reliability',
    qualityAttributeRequirement:
      'The authentication flow must succeed within 2 seconds for 99.5% of login attempts during normal operation, with graceful degradation (informative error, no data exposure) in the remaining 0.5%.',
    characteristic: 'Availability',
    subcharacteristic: 'Fault Tolerance',
    sourceOfStimulus: 'External identity provider (Google Workspace / Azure AD / Okta) returning a delayed or malformed token response',
    environment: 'Normal Operation. Financial Close — elevated login volume as procurement teams access RFP responses simultaneously.',
    stimulus: 'SSO provider returns an error, timeout, or malformed SAML assertion during token validation',
    artifacts: 'Auth middleware; SSO provider (Google WS / Azure AD / Okta); Blueprint API session handler',
    response: 'System returns a clear, non-technical error message to the user; logs the failure with correlation ID; does not expose partial session state or internal stack traces',
    responseMeasure: 'Percentage of login attempts completing within 2 s (target ≥ 99.5%); zero partial-session data leaks on failure path',
    measure: 'Login success rate',
    unit: '% within 2 s (≥ 99.5%)',
    tradeoffsPlus: [
      'Multi-provider fallback (e.g. Azure AD → Okta) improves resilience',
      'Session token caching reduces SSO round-trips on subsequent requests',
    ],
    tradeoffsMinus: [
      'Multi-provider fallback increases credential-management surface',
      'Session caching risks stale revocation — must respect token expiry policy',
    ],
    tactics: [
      'Retry with exponential back-off (max 2 retries within 1.8 s budget)',
      'Structured error response — map provider error codes to user-friendly messages',
      'Centralised audit log entry on every auth failure (correlation ID, provider, timestamp)',
      'Health-check endpoint for each configured SSO provider — alert on > 1% error rate',
    ],
  },
]

function QattCardView({ card }: { card: QattCardData }) {
  return (
    <div className="qatt-card">
      {/* Header */}
      <div className="qatt-card-header-row">
        <div className="qatt-card-title-cell">
          <span className="qatt-card-title-label">QATT CARD</span>
          <span className="qatt-card-title-id">{card.id} — {card.title}</span>
        </div>
        <div className="qatt-card-meta-fields">
          <div className="qatt-card-meta-field">
            <span className="qatt-card-meta-key">DOMAIN:</span>
            <span className="qatt-card-meta-val">{card.domain}</span>
          </div>
          <div className="qatt-card-meta-field">
            <span className="qatt-card-meta-key">OWNED BY:</span>
            <span className="qatt-card-meta-val">{card.ownedBy}</span>
          </div>
          <div className="qatt-card-meta-field">
            <span className="qatt-card-meta-key">DATE:</span>
            <span className="qatt-card-meta-val">Discovery</span>
          </div>
          <div className="qatt-card-meta-field">
            <span className="qatt-card-meta-key">VERSION:</span>
            <span className="qatt-card-meta-val">Draft</span>
          </div>
        </div>
      </div>

      {/* Quality Attribute + QAR + Characteristic */}
      <div className="qatt-card-top-row">
        <div className="qatt-card-qa-cell">
          <div className="qatt-card-section-lbl">QUALITY ATTRIBUTE:</div>
          <div className={`qatt-card-section-txt qatt-card-qa-name asr-mini-qa--${card.qualityAttribute.toLowerCase().replace(/\s+/g, '-')}`}>{card.qualityAttribute}</div>
          <div className="qatt-card-section-hint">Which quality attribute(s) will be impacted</div>
        </div>
        <div className="qatt-card-qar-cell">
          <div className="qatt-card-section-lbl">QUALITY ATTRIBUTE REQUIREMENT:</div>
          <div className="qatt-card-section-txt">{card.qualityAttributeRequirement}</div>
          <div className="qatt-card-section-hint">scenario, allows an architect to make quantifiable arguments about a system</div>
        </div>
        <div className="qatt-card-char-col">
          <div className="qatt-card-char-block">
            <div className="qatt-card-section-lbl">CHARACTERISTIC:</div>
            <div className="qatt-card-section-txt">{card.characteristic}</div>
          </div>
          <div className="qatt-card-char-block">
            <div className="qatt-card-section-lbl">SUBCHARACTERISTIC:</div>
            <div className="qatt-card-section-txt">{card.subcharacteristic}</div>
          </div>
        </div>
      </div>

      {/* Source of Stimulus + Environment */}
      <div className="qatt-card-mid-row">
        <div className="qatt-card-mid-cell">
          <div className="qatt-card-section-lbl">SOURCE OF STIMULUS:</div>
          <div className="qatt-card-section-hint">An entity capable of creating stimulus (internal or external people, a computer system, etc)</div>
          <div className="qatt-card-section-txt qatt-card-section-txt--mt">{card.sourceOfStimulus}</div>
        </div>
        <div className="qatt-card-mid-cell">
          <div className="qatt-card-section-lbl">ENVIRONMENT:</div>
          <div className="qatt-card-section-hint">The environment where the stimulus occurs</div>
          <div className="qatt-card-section-txt qatt-card-section-txt--mt">{card.environment}</div>
        </div>
      </div>

      {/* Stimulus + Artifact + Response + Response Measure */}
      <div className="qatt-card-lower-row">
        <div className="qatt-card-stimulus-cell">
          <div className="qatt-card-section-lbl">STIMULUS:</div>
          <div className="qatt-card-section-hint">A condition that requires a response when it arrives at a system</div>
          <div className="qatt-card-section-txt qatt-card-section-txt--mt">{card.stimulus}</div>
        </div>
        <div className="qatt-card-artifact-cell">
          <div className="qatt-card-section-lbl">ARTIFACT(s):</div>
          <div className="qatt-card-section-hint">The artifact that receives the stimulus</div>
          <div className="qatt-card-section-txt qatt-card-section-txt--mt">{card.artifacts}</div>
        </div>
        <div className="qatt-card-response-cell">
          <div className="qatt-card-section-lbl">RESPONSE:</div>
          <div className="qatt-card-section-hint">The action of the artifact according to the received stimulus</div>
          <div className="qatt-card-section-txt qatt-card-section-txt--mt">{card.response}</div>
        </div>
        <div className="qatt-card-measure-cell">
          <div className="qatt-card-section-lbl">RESPONSE MEASURE:</div>
          <div className="qatt-card-section-hint">The measure that should be tested for the response</div>
          <div className="qatt-card-section-txt qatt-card-section-txt--mt">{card.responseMeasure}</div>
          <div className="qatt-card-measure-row">
            <div className="qatt-card-measure-sub">
              <span className="qatt-card-meta-key">MEASURE:</span>
              <span className="qatt-card-measure-val">{card.measure}</span>
            </div>
            <div className="qatt-card-measure-sub">
              <span className="qatt-card-meta-key">UNIT:</span>
              <span className="qatt-card-measure-val">{card.unit}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trade-offs + Tactics */}
      <div className="qatt-card-footer-row">
        <div className="qatt-card-tradeoffs-cell">
          <div className="qatt-card-section-lbl">TRADE-OFFs:</div>
          <div className="qatt-card-tradeoffs-grid">
            <div className="qatt-card-tradeoffs-col">
              <span className="qatt-card-tradeoffs-sign qatt-card-tradeoffs-sign--plus">+</span>
              <ul className="qatt-card-tradeoffs-list">
                {card.tradeoffsPlus.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
            <div className="qatt-card-tradeoffs-col">
              <span className="qatt-card-tradeoffs-sign qatt-card-tradeoffs-sign--minus">−</span>
              <ul className="qatt-card-tradeoffs-list">
                {card.tradeoffsMinus.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
        <div className="qatt-card-tactics-cell">
          <div className="qatt-card-section-lbl">TACTICs:</div>
          <ul className="qatt-card-tactics-list">
            {card.tactics.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

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

function CardStack<T extends { id: string }>({
  cards,
  icon,
  title,
  badge,
  stamp,
  renderCard,
  renderMiniCard,
}: {
  cards: T[]
  icon: string
  title: string
  badge: string
  stamp?: string
  renderCard: (card: T) => React.ReactNode
  renderMiniCard: (card: T, active: boolean) => React.ReactNode
}) {
  const [expanded, setExpanded] = useState<string | null>(cards[0]?.id ?? null)
  const [offset, setOffset] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)
  const wrapRef = React.useRef<HTMLDivElement>(null)

  const CARD_W = 190
  const GAP = 10

  React.useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width - 64 // subtract two 32px scroll buttons
      setVisibleCount(Math.max(1, Math.floor((w + GAP) / (CARD_W + GAP))))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const maxOffset = Math.max(0, cards.length - visibleCount)
  const scroll = (dir: -1 | 1) => setOffset(o => Math.max(0, Math.min(maxOffset, o + dir)))
  const fitsAll = cards.length <= visibleCount
  const rowWidth = fitsAll
    ? cards.length * CARD_W + (cards.length - 1) * GAP
    : visibleCount * CARD_W + (visibleCount - 1) * GAP

  const expandedCard = cards.find(c => c.id === expanded)

  return (
    <div className="overview-card integration-detail-card--wide">
      <div className="overview-card-header">
        <span className="overview-card-icon">{icon}</span>
        {title}
        <span className="integration-detail-example-badge">{badge}</span>
      </div>
      <div className="asr-mini-row-wrap" ref={wrapRef}>
        {stamp && <div className="example-stamp example-stamp--row">{stamp}</div>}
        {!fitsAll && <button className="asr-mini-scroll-btn" onClick={() => scroll(-1)} aria-label="Scroll left" disabled={offset === 0}>←</button>}
        <div className="asr-mini-row" style={{ width: rowWidth }}>
          <div className="asr-mini-row-inner" style={{ transform: `translateX(calc(-${offset} * (${CARD_W}px + ${GAP}px)))` }}>
            {cards.map(card => (
              <button
                key={card.id}
                className={`asr-mini-card${expanded === card.id ? ' asr-mini-card--active' : ''}`}
                onClick={() => setExpanded(expanded === card.id ? null : card.id)}
              >
                {renderMiniCard(card, expanded === card.id)}
              </button>
            ))}
          </div>
        </div>
        {!fitsAll && <button className="asr-mini-scroll-btn" onClick={() => scroll(1)} aria-label="Scroll right" disabled={offset >= maxOffset}>→</button>}
      </div>
      {expandedCard && (
        <div className="asr-cards-list asr-cards-list--stamped">
          {renderCard(expandedCard)}
        </div>
      )}
    </div>
  )
}

const asrCritClass = (c: AsrCardData['criticality']) =>
  c === 'Critical' ? 'asr-card-crit--critical'
  : c === 'High' ? 'asr-card-crit--high'
  : c === 'Medium' ? 'asr-card-crit--medium'
  : 'asr-card-crit--low'

function AsrCardStack() {
  return (
    <CardStack
      cards={ASR_CARDS}
      icon="🏛️"
      title="Architecturally Significant Requirements (ASRs)"
      badge="Each ASR below will produce an ADR during Discovery"
      stamp="EXAMPLE"
      renderCard={card => <AsrCardView card={card} />}
      renderMiniCard={card => <>
        <span className="asr-mini-id">{card.id}</span>
        <span className="asr-mini-title">{card.title}</span>
        <span className={`asr-mini-crit asr-card-crit ${asrCritClass(card.criticality)}`}>{card.criticality}</span>
        <span className="asr-mini-domain">{card.domain}</span>
      </>}
    />
  )
}

function QattCardStack() {
  return (
    <CardStack
      cards={QATT_CARDS}
      icon="🎯"
      title="Quality Attribute Tradeoff (QATT) Cards"
      badge="Each QATT below will be validated against testable acceptance criteria at Discovery"
      stamp="EXAMPLE"
      renderCard={card => <QattCardView card={card} />}
      renderMiniCard={card => <>
        <span className="asr-mini-id">{card.id}</span>
        <span className="asr-mini-title">{card.title}</span>
        <span className={`asr-mini-crit asr-mini-qa--${card.qualityAttribute.toLowerCase().replace(/\s+/g, '-')}`}>{card.qualityAttribute}</span>
        <span className="asr-mini-domain">{card.domain}</span>
      </>}
    />
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
          <span className="rfp-section-heading">🔗 {integration.system} Integration</span>
        </div>
        <button className="integration-detail-back-btn" onClick={() => navigate('/solution-architecture/integration-data')}>
          ← Back to Integration Map
        </button>
      </div>

      <div className="integration-detail-discovery-notice">
        <span className="integration-detail-notice-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="8"/>
            <line x1="12" y1="12" x2="12" y2="16"/>
          </svg>
        </span>
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
                <td className="overview-table-label">Direction</td>
                <td>{integration.direction}</td>
              </tr>
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
              <tr>
                <td className="overview-table-label"></td>
                <td><span className="integration-detail-tbc"></span></td>
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

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">💰</span>
            Cost of Ownership
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Subscription plan required</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Cost per API call</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Token / unit pricing</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Included call quota (monthly)</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Overage / burst charges</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Estimated monthly volume</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Projected monthly cost</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🔧</span>
            Implementation Details
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Delivery phase</td>
                <td>
                  <span className={`overview-badge ${integration.phaseClass}`}>{integration.phase}</span>
                </td>
              </tr>
              <tr>
                <td className="overview-table-label">Integration method</td>
                <td>{integration.method}</td>
              </tr>
              <tr>
                <td className="overview-table-label">Key libraries / SDKs</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Infrastructure components</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Config / secrets management</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Test approach</td>
                <td><span className="integration-detail-tbc">TBC at Discovery</span></td>
              </tr>
              <tr>
                <td className="overview-table-label"></td>
                <td><span className="integration-detail-tbc"></span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example-stamp-wrap">
          <div className="example-stamp">EXAMPLE</div>
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
        </div>

        <div className="integration-detail-full-row">
          <AsrCardStack />
        </div>

        <div className="integration-detail-full-row">
          <QattCardStack />
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
