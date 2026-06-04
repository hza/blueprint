import { useState } from 'react'
import type { RequirementsSummary } from '../types'

const MAX_DOMAIN_ROWS = 7

export function RequirementsCoverage({
  subsection,
  summary,
}: {
  subsection?: string
  summary?: RequirementsSummary | null
}) {
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
  const gapCount = summary?.gaps ?? 0
  const [showAllDomains, setShowAllDomains] = useState(false)

  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">2. Requirements Coverage</div>
            <div className="overview-banner-client">Meridian Software · Customer Facing Portal — RFP</div>
          </div>
          <span className={`overview-badge ${gapCount > 0 ? 'overview-badge--danger' : 'overview-badge--ok'}`}>
            {gapCount} {gapCount === 1 ? 'GAP' : 'GAPS'}
          </span>
        </div>
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Total Requirements</span>
            <span className="overview-stat-value">{summary?.total ?? '—'}</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Fully Met</span>
            <span className="overview-stat-value overview-stat-score--ok">{summary?.met ?? '—'}</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Risky</span>
            <span className="overview-stat-value overview-stat-score--warn">{summary?.risky ?? '—'}</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Not Met</span>
            <span className="overview-stat-value overview-val--danger">{summary?.gaps ?? '—'}</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Coverage</span>
            <span className="overview-stat-value overview-stat-score--ok">
              {summary != null ? `${summary.coverage_pct}%` : '—'}
            </span>
          </div>
        </div>
      </div>

      {show('2.1') && (<>
      <div className="rfp-section-heading" id="2.1">Requirements Summary</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📋</span>
            Requirements by Domain — Prioritized by coverage gaps and delivery risk
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Total</th>
                <th>Met</th>
                <th>Risky</th>
                <th>Gap</th>
              </tr>
            </thead>
            <tbody>
              {!summary ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--color-muted)' }}>Loading…</td></tr>
              ) : (() => {
                const MAX_ROWS = MAX_DOMAIN_ROWS
                const sorted = [...summary.domains].sort((a, b) =>
                  b.gap !== a.gap ? b.gap - a.gap : b.risky - a.risky
                )
                const shown = sorted.slice(0, MAX_ROWS)
                const rest = sorted.slice(MAX_ROWS)
                const other = rest.length > 0 ? rest.reduce(
                  (acc, d) => ({ domain: 'Other', total: acc.total + d.total, met: acc.met + d.met, risky: acc.risky + d.risky, gap: acc.gap + d.gap }),
                  { domain: 'Other', total: 0, met: 0, risky: 0, gap: 0 }
                ) : null
                const rows = showAllDomains ? sorted : [...shown, ...(other ? [other] : [])]
                return rows.map((d) => (
                  <tr key={d.domain}>
                    <td className="overview-table-label">{d.domain === 'Other'
                      ? <span
                          style={{ color: 'var(--color-muted)', cursor: 'pointer', textDecoration: 'underline dotted' }}
                          onClick={() => setShowAllDomains(true)}
                        >Other ({rest.length} domains) ▸</span>
                      : d.domain}</td>
                    <td>{d.total}</td>
                    <td>{d.met}</td>
                    <td>
                      {d.risky > 0
                        ? <span className="overview-badge overview-badge--warn">{d.risky}</span>
                        : 0}
                    </td>
                    <td>
                      {d.gap > 0
                        ? <span className="overview-badge overview-badge--danger">{d.gap}</span>
                        : 0}
                    </td>
                  </tr>
                ))
              })()}
              {summary && showAllDomains && summary.domains.length > MAX_DOMAIN_ROWS && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '0.25rem 0' }}>
                    <span
                      style={{ color: 'var(--color-muted)', cursor: 'pointer', textDecoration: 'underline dotted', fontSize: '0.85em' }}
                      onClick={() => setShowAllDomains(false)}
                    >▴ Show less</span>
                  </td>
                </tr>
              )}
              {summary && (
                <tr>
                  <td className="overview-table-label overview-val--strong">Total</td>
                  <td><strong>{summary.total}</strong></td>
                  <td>{summary.met}</td>
                  <td><strong>{summary.risky}</strong></td>
                  <td><span className="overview-badge overview-badge--danger">{summary.gaps}</span></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">!</span>
            Requirement Gaps &amp; Risks — Action Required
          </div>
          {!summary ? (
            <p style={{ color: 'var(--color-muted)', padding: '0.5rem 0' }}>Loading…</p>
          ) : (
            <ul className="overview-risk-list">
              {summary.gap_items.map((item) => (
                <li key={item.id} className="overview-risk overview-risk--high">
                  <span className="overview-risk-level">GAP</span>
                  <div>
                    <strong>{item.id} — {item.requirement}</strong>
                    {item.description && <> {item.description}</>}
                  </div>
                </li>
              ))}
              {summary.risky_items.map((item) => (
                <li key={item.id} className="overview-risk overview-risk--med">
                  <span className="overview-risk-level">RISKY</span>
                  <div>
                    <strong>{item.id} — {item.requirement}</strong>
                    {item.description && <> {item.description}</>}
                  </div>
                </li>
              ))}
              {summary.gap_items.length === 0 && summary.risky_items.length === 0 && (
                <li style={{ color: 'var(--color-muted)' }}>No gaps or risks identified.</li>
              )}
            </ul>
          )}
        </div>
      </div>
      </>)}

      {show('2.2') && (<>
      {/* 2.2 Coverage & Compliance Matrix */}
      <div className="rfp-section-heading" id="2.2">Coverage &amp; Compliance Matrix</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">✓</span>
            Mandatory Requirements Compliance (Selected)
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Req ID</th>
                <th>Domain</th>
                <th>Requirement (Summary)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>FR-001</td>
                <td>Functional</td>
                <td>Employees can upload client RFP documents (PDF up to 200 MB)</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
              </tr>
              <tr>
                <td>NFR-001</td>
                <td>Non-Functional</td>
                <td>Reduce proposal time from days to hours</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
              </tr>
              <tr>
                <td>BR-001</td>
                <td>Business</td>
                <td>Role-based access control enforced system-wide</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
              </tr>
              <tr>
                <td>CR-009</td>
                <td>Compliance</td>
                <td>SOC 2 Type II certification at go-live</td>
                <td><span className="overview-badge overview-badge--danger">Gap</span></td>
              </tr>
              <tr>
                <td>TC-029</td>
                <td>Technical</td>
                <td>SAML SSO integration with enterprise IdP</td>
                <td><span className="overview-badge overview-badge--danger">Gap</span></td>
              </tr>
              <tr>
                <td>NFR-002</td>
                <td>Non-Functional</td>
                <td>95% OCR accuracy on uploaded documents</td>
                <td><span className="overview-badge overview-badge--danger">Gap</span></td>
              </tr>
              <tr>
                <td>TC-009</td>
                <td>Technical</td>
                <td>CQRS + Outbox Pattern + BFF architecture</td>
                <td><span className="overview-badge overview-badge--warn">Risky</span></td>
              </tr>
              <tr>
                <td>FR-090</td>
                <td>Functional</td>
                <td>Real-time collaborative editing with conflict resolution</td>
                <td><span className="overview-badge overview-badge--warn">Risky</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>)}

      {show('2.3') && (<>
      {/* 2.3 Gaps & Questions */}
      <div className="rfp-section-heading" id="2.3">Outstanding Questions</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">❓</span>
            Outstanding Questions to Client
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Question</th>
                <th>Req</th>
                <th>Urgency</th>
                <th>Client's Answer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OQ-01</td>
                <td>Will interim security controls evidence (SOC 2 Type II + documented GDPR/PII controls) satisfy the SOC 2 Type II requirement (CR-009) at go-live, with certification to follow post-launch?</td>
                <td>CR-009</td>
                <td><span className="overview-badge overview-badge--danger">Critical</span></td>
                <td><span className="overview-badge overview-badge--warn">Pending</span></td>
              </tr>
              <tr>
                <td>OQ-02</td>
                <td>Which enterprise IdP provider is in use (Okta, Azure AD, ADFS)? Timeline for IdP configuration sign-off to unblock SAML SSO delivery.</td>
                <td>TC-029</td>
                <td><span className="overview-badge overview-badge--warn">High</span></td>
                <td><span className="overview-badge overview-badge--warn">Pending</span></td>
              </tr>
              <tr>
                <td>OQ-03</td>
                <td>What is the expected quality (DPI, scan resolution) of RFP documents uploaded? This directly determines achievable OCR accuracy against the 95% target.</td>
                <td>NFR-002</td>
                <td><span className="overview-badge overview-badge--warn">High</span></td>
                <td><span className="overview-badge overview-badge--warn">Pending</span></td>
              </tr>
              <tr>
                <td>OQ-04</td>
                <td>Is the Salesforce webhook integration (FR-133) required at go-live or can it be deferred to Phase 2? Depends on your SF edition and API access tier.</td>
                <td>FR-133</td>
                <td><span className="overview-badge">Medium</span></td>
                <td><span className="overview-badge overview-badge--warn">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">→</span>
            High-Risk Items — Resolution Plan
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Req ID</th>
                <th>Issue</th>
                <th>Resolution</th>
                <th>Target Phase</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TC-013</td>
                <td>RAG pipeline with 512-token chunking and Qdrant requires ML infrastructure setup and iterative prompt tuning</td>
                <td>Dedicated ML infrastructure sprint in Phase 1; retrieval quality benchmarked before Phase 2 feature build.</td>
                <td>Phase 1</td>
              </tr>
              <tr>
                <td>NFR-011</td>
                <td>500 ms real-time collaboration propagation under concurrent load</td>
                <td>WebSocket infrastructure with horizontal scaling; load test milestone gating Phase 2 go/no-go.</td>
                <td>Phase 2</td>
              </tr>
              <tr>
                <td>NFR-019</td>
                <td>RTO 1 hour / RPO 15 minutes requires active standby and continuous replication</td>
                <td>DR architecture scoped in Phase 1; DR test run before production launch.</td>
                <td>Phase 1 / Launch</td>
              </tr>
              <tr>
                <td>CR-015</td>
                <td>PII anonymisation before LLM dispatch — entity detection accuracy affects downstream output quality</td>
                <td>NLP-based PII detection with reversible mapping; accuracy threshold validated on representative dataset before go-live.</td>
                <td>Phase 1</td>
              </tr>
              <tr>
                <td>FR-016</td>
                <td>Audio/video calling requires third-party SDK (Twilio/Daily.co); not in base scope</td>
                <td>Scoped and priced separately. Can be added to Phase 3 if confirmed. No impact on core portal delivery.</td>
                <td>Phase 3 (optional)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>)}
    </div>
  )
}
