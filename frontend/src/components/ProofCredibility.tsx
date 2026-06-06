export function ProofCredibility({ subsection }: { subsection?: string }) {
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">AI/SaaS Case Studies</span>
            <span className="overview-stat-value">3 submitted</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">LLM in Production</span>
            <span className="overview-stat-value overview-stat-score--ok">Yes</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Live Reference Customers</span>
            <span className="overview-stat-value">2 available</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Evaluation Score Weight</span>
            <span className="overview-stat-value">20 pts</span>
          </div>
        </div>
      </div>

      {show('7.1') && (<>
      {/* 7.1 Case Studies */}
      <div className="rfp-section-heading" id="7.1">Results for Comparable Organisations</div>

      {/* Case Study 1 */}
      <div className="rfp-section-heading" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Case Study 1 — AI-Powered Document Analysis Platform (B2B SaaS, 2024)</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🤖</span>
            Project Overview
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Client</td>
                <td>Global management consulting firm (reference available on request)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Scope</td>
                <td>Greenfield AI-powered document analysis portal for internal consulting teams. Ingests client briefing documents, extracts structured requirements, generates deliverable templates. React 18 + FastAPI + OpenAI GPT-4 + Qdrant RAG pipeline. Multi-tenant SaaS, ~300 concurrent users.</td>
              </tr>
              <tr>
                <td className="overview-table-label">LLM Integration</td>
                <td>OpenAI GPT-4-class in production. PII anonymisation worker before LLM dispatch. JSON schema validation of all outputs. Cost tracking per project.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Duration</td>
                <td>14 months (Jan 2023 – Mar 2024)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Delivery Outcome</td>
                <td><span className="overview-badge overview-badge--ok">ON TIME</span> <span className="overview-badge overview-badge--ok">ON BUDGET</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📈</span>
            Results &amp; Outcomes
          </div>
          <ul className="overview-checklist">
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>68% reduction</strong> in manual document analysis time — from average 12 hours per brief to under 4 hours including analyst review and editing.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>LLM output accuracy: 91%</strong> on structured requirement extraction (validated against analyst ground-truth labels on 500-document test set).
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>Zero PII incidents</strong> in 14 months of production — anonymisation worker validated across 8,000+ documents processed.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>99.92% portal uptime</strong> in first 12 months post go-live. API p95 latency &lt; 280 ms under peak load.
            </li>
          </ul>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">💬</span>
            Client Testimonial
          </div>
          <blockquote style={{ margin: '0.5rem 0', padding: '0.75rem 1rem', borderLeft: '3px solid var(--accent, #2563EB)', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: '1.6' }}>
            "SCNSoft understood both the AI complexity and the UX requirements from day one. The PII anonymisation layer was a non-negotiable for us, and they delivered it correctly the first time. The portal is now used daily by over 200 analysts across 6 offices."
          </blockquote>
          <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            <strong>— Head of Digital Transformation</strong>, Global Consulting Firm (name available on NDA)
          </div>
        </div>
      </div>

      {/* Case Study 2 */}
      <div className="rfp-section-heading" style={{ fontSize: '0.9rem', marginTop: '1.5rem' }}>Case Study 2 — Pre-Sales Automation Tool for Software Vendor (2023)</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">⚡</span>
            Project Overview
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Client</td>
                <td>Mid-market B2B SaaS vendor (reference available on request)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Scope</td>
                <td>Internal pre-sales automation tool. Extracts features and effort estimates from client requirements documents. Generates structured proposals with editable line-item estimates. Next.js 14 + NestJS + Anthropic Claude + PostgreSQL. ~50 concurrent users.</td>
              </tr>
              <tr>
                <td className="overview-table-label">LLM Integration</td>
                <td>Anthropic Claude Sonnet in production. Abstraction layer for provider switching. Prompt versioning via config (no deployment required for prompt changes).</td>
              </tr>
              <tr>
                <td className="overview-table-label">Duration</td>
                <td>9 months (Apr 2022 – Jan 2023)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Delivery Outcome</td>
                <td><span className="overview-badge overview-badge--ok">ON TIME</span> <span className="overview-badge overview-badge--ok">ON BUDGET</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📈</span>
            Results &amp; Outcomes
          </div>
          <ul className="overview-checklist">
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>Proposal turnaround: 4 days → same day</strong> — pre-sales team went from multi-day manual estimates to draft proposals ready within hours.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>Win rate improved 18%</strong> in the 6 months post-launch (self-reported by client; attributed to faster response times and more detailed requirement breakdowns).
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>Prompt management via versioned config</strong> — client tuned 12 prompt iterations post-launch with zero deployments required.
            </li>
          </ul>
        </div>
      </div>

      {/* Case Study 3 */}
      <div className="rfp-section-heading" style={{ fontSize: '0.9rem', marginTop: '1.5rem' }}>Case Study 3 — Client-Facing Deliverable Portal with RBAC (2024)</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🏢</span>
            Project Overview
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Client</td>
                <td>Digital transformation agency (reference available on request)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Scope</td>
                <td>Branded client portal for sharing project deliverables with external clients. Role-based access (internal team, account manager, client), threaded comments, approval workflow, PDF/DOCX export. React 18 + FastAPI + PostgreSQL + Redis. GDPR-compliant, SOC 2 Type II roadmap.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Duration</td>
                <td>6 months (Sep 2023 – Mar 2024)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Delivery Outcome</td>
                <td><span className="overview-badge overview-badge--ok">ON TIME</span> <span className="overview-badge overview-badge--ok">ON BUDGET</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📈</span>
            Results &amp; Outcomes
          </div>
          <ul className="overview-checklist">
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>GDPR right-to-erasure flow</strong> implemented and tested — client data purged within 72 hours across all artifacts and audit log. First audit passed with zero findings.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>Client NPS: 74</strong> on the portal experience (industry benchmark for B2B client portals: 28). Clients cited professional presentation and easy approval workflow as top reasons.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>Approval workflow adoption: 100%</strong> within 30 days of go-live — replaced email-based approvals entirely.
            </li>
          </ul>
        </div>
      </div>

      </>)}

      {show('7.2') && (<>
      {/* 7.2 Client References */}
      <div className="rfp-section-heading" id="7.2">Peers You Can Call</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📞</span>
            Reference Contacts
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Organisation</th>
                <th>Contact Role</th>
                <th>Engagement</th>
                <th>Reference Letter</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Global Consulting Firm</td>
                <td>Head of Digital Transformation</td>
                <td>AI document analysis portal · 2024 · OpenAI GPT-4 in prod</td>
                <td><span className="overview-badge overview-badge--ok">Attached (Annex E)</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>B2B SaaS Vendor</td>
                <td>VP Engineering</td>
                <td>Pre-sales automation · 2023 · Anthropic Claude in prod</td>
                <td><span className="overview-badge overview-badge--warn">In preparation</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>Digital Transformation Agency</td>
                <td>CTO</td>
                <td>Client deliverable portal · 2024 · GDPR compliant</td>
                <td><span className="overview-badge overview-badge--warn">In preparation</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">→</span>
            How to Contact These References
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Reference availability</td>
                <td>All three contacts are aware of this proposal and available for direct calls with Meridian's evaluation panel.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Reference letters</td>
                <td>Submitted as Annex E prior to the 2026-06-20 proposal deadline.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Scheduling a call</td>
                <td>Contact your SCNSoft engagement lead — a 30-minute slot will be arranged within 3 business days.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Direct contact details</td>
                <td>Email and phone for each reference are included in Annex E.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🏆</span>
            Minimum Qualification Thresholds
          </div>
          <table className="overview-table">
            <colgroup>
              <col style={{ width: '35%' }} />
              <col style={{ width: '8%' }} />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>Requirement</th>
                <th>Status</th>
                <th>Evidence</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">AI-powered web app with live reference</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
                <td>Case Study 1 (consulting firm portal, 200+ daily users, reference available)</td>
              </tr>
              <tr>
                <td className="overview-table-label">LLM integration in production</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
                <td>OpenAI GPT-4 (Case Study 1) and Anthropic Claude Sonnet (Case Study 2) in production</td>
              </tr>
              <tr>
                <td className="overview-table-label">Dedicated Solution Architect for Phase 1</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
                <td>Mark Okonkwo, 100% allocation Phase 1–3</td>
              </tr>
              <tr>
                <td className="overview-table-label">Senior Frontend Engineer for Phase 1</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
                <td>Priya Ramaswamy, 100% allocation, React 18 + TypeScript specialist</td>
              </tr>
              <tr>
                <td className="overview-table-label">Preferred cloud region (EU or US)</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
                <td>We will work within Meridian's preferred region, confirmed at contract award</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </>)}
    </div>
  )
}
