import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_USER_NAME } from '../types'

const CURRENT_USER = DEFAULT_USER_NAME

const ICON_APPROVED = (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const ICON_REJECTED = (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const ICON_PENDING = (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const CLARIFICATIONS = [
  { ref: 'Q1', question: 'Which cloud region (EU or US) does Meridian prefer for the single data region at installation? Are there any data-residency constraints beyond the stated GDPR requirement?', notes: 'RFP Section 4.4 states "Single data region chosen at installation time." Region confirmed at award per Section 9. Pricing is region-neutral; finalised at contract.' },
  { ref: 'Q2', question: 'Which SSO provider(s) does Meridian currently use — Google Workspace, Azure AD, Okta, or SAML 2.0? Will sandbox credentials be available before Phase 1 week 4?', notes: 'All four providers are supported via OAuth 2.0. Answer determines which integration is tested first in Phase 1 vs deferred to Phase 3.' },
  { ref: 'Q3', question: 'Is there a preferred LLM provider (OpenAI, Anthropic Claude, Azure OpenAI), or should we propose based on cost/performance optimisation?', notes: 'The abstraction layer (Section 4.5) allows switching providers post-launch. Our default recommendation is Anthropic Claude Sonnet for analysis and GPT-4o for structured extraction, subject to Meridian preference.' },
  { ref: 'Q4', question: 'Does Meridian have an existing Salesforce instance with a CRM webhook target, or is the Salesforce integration a future-state requirement?', notes: 'RFP Section 4.5 specifies Salesforce REST API integration in Phase 3. Scoped as CRM webhook creating/updating projects within 60 s.' },
]

const LS_KEY = 'clarifications_answers'

const DEFAULT_ANSWERS: Record<string, string> = {
  Q4: 'Yes, maybe',
}

function loadAnswers(): Record<string, string> {
  try { return { ...DEFAULT_ANSWERS, ...JSON.parse(localStorage.getItem(LS_KEY) ?? '{}') } } catch { return { ...DEFAULT_ANSWERS } }
}

function ClarificationsTable() {
  const [openRef, setOpenRef] = useState<string | null>(null)
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [answers, setAnswers] = useState<Record<string, string>>(loadAnswers)

  const handleDiscard = (ref: string) => {
    setDrafts(d => { const next = { ...d }; delete next[ref]; return next })
    setOpenRef(null)
  }

  const handleSubmit = (ref: string) => {
    const text = (drafts[ref] ?? '').trim()
    const next = { ...answers, [ref]: text }
    setAnswers(next)
    localStorage.setItem(LS_KEY, JSON.stringify(next))
    setDrafts(d => ({ ...d, [ref]: '' }))
    setOpenRef(null)
  }

  return (
    <table className="overview-table">
      <thead>
        <tr>
          <th>Ref</th>
          <th>Question</th>
          <th>Status</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {CLARIFICATIONS.map(({ ref, question, notes }) => {
          const answered = ref in answers && !!answers[ref]
          const isOpen = openRef === ref
          return (
            <React.Fragment key={ref}>
              <tr>
                <td><strong>{ref}</strong></td>
                <td>{question}</td>
                <td>
                  {answered
                    ? <span className="overview-badge overview-badge--ok">Answered</span>
                    : <span className="overview-badge overview-badge--warn">Unanswered</span>}
                </td>
                <td>{notes}</td>
              </tr>
              {answered && !isOpen && (
                <tr key={`${ref}-recorded`}>
                  <td />
                  <td colSpan={3} className="td-answer td-answer--recorded">
                    <div className="answer-recorded">
                      <span className="answer-recorded-label"><span className="answer-recorded-avatar">HZ</span>{CURRENT_USER}:</span>
                      <span
                        className="answer-recorded-text answer-recorded-text--editable"
                        title="Click to edit"
                        onClick={() => setOpenRef(ref)}
                      >{answers[ref]}</span>
                    </div>
                  </td>
                </tr>
              )}
              {!answered && !isOpen && (
                <tr key={`${ref}-placeholder`}>
                  <td />
                  <td colSpan={3} className="td-answer td-answer--recorded">
                    <div className="answer-recorded">
                      <span
                        className="answer-recorded-text answer-recorded-text--placeholder"
                        style={{ color: 'var(--fg-muted)', fontStyle: 'italic', cursor: 'pointer', marginLeft: '8px' }}
                        onClick={() => setOpenRef(ref)}
                      >Click to add an answer…</span>
                    </div>
                  </td>
                </tr>
              )}
              {isOpen && (
                <tr key={`${ref}-edit`}>
                  <td />
                  <td colSpan={3} className="td-answer">
                    <div className="answer-panel">
                      <div className="answer-panel-header">
                        <span className="answer-panel-label">{answered ? 'Edit answer for' : 'Answer for'} {ref}</span>
                        <span className="answer-panel-hint">Your response will be recorded against this clarification</span>
                      </div>
                      <textarea
                        className="answer-textarea"
                        placeholder="Type your answer here…"
                        autoFocus
                        rows={4}
                        value={ref in drafts ? drafts[ref] : (answers[ref] ?? '')}
                        onChange={e => setDrafts(d => ({ ...d, [ref]: e.target.value }))}
                        ref={el => { if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length) } }}
                      />
                      <div className="answer-panel-actions">
                        <button className="answer-btn answer-btn--submit" onClick={() => handleSubmit(ref)}>
                          Record Answer
                        </button>
                        <button className="answer-btn answer-btn--discard" onClick={() => handleDiscard(ref)}>
                          Discard
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          )
        })}
      </tbody>
    </table>
  )
}

type AssumptionStatus = 'None' | 'Approved' | 'Pending' | 'Rejected'

const LS_ASSUMPTIONS_KEY = 'assumption_statuses'
const LS_ASSUMPTIONS_NOTES_KEY = 'assumption_notes'

function loadAssumptionStatuses(): Record<string, AssumptionStatus> {
  try { return JSON.parse(localStorage.getItem(LS_ASSUMPTIONS_KEY) ?? '{}') } catch { return {} }
}

function loadAssumptionNotes(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(LS_ASSUMPTIONS_NOTES_KEY) ?? '{}') } catch { return {} }
}

const ASSUMPTION_IDS = ['A1', 'A2', 'A3', 'A4', 'A5']

function AssumptionStatusTag({ status }: { status: AssumptionStatus }) {
  if (status === 'None') return <span className="tag-none">NONE</span>
  if (status === 'Approved') return <span className="tag-approved">APPROVED</span>
  if (status === 'Rejected') return <span className="tag-rejected">REJECTED</span>
  return <span className="tag-pending">PENDING</span>
}

export function ExecutiveOverview({ subsection }: { subsection?: string }) {
  const navigate = useNavigate()
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
  const [assumptionStatuses, setAssumptionStatuses] = useState<Record<string, AssumptionStatus>>(
    () => {
      const saved = loadAssumptionStatuses()
      const defaults: Record<string, AssumptionStatus> = {}
      ASSUMPTION_IDS.forEach(id => { defaults[id] = saved[id] ?? (id === 'A1' ? 'Pending' : id === 'A2' ? 'Rejected' : id === 'A3' ? 'Approved' : 'None') })
      return defaults
    }
  )
  const [assumptionNotes, setAssumptionNotes] = useState<Record<string, string>>(() => {
    const saved = loadAssumptionNotes()
    return { A1: 'Let me think about it...', A2: 'I have changed my mind, let\'s always use Anthropic', ...saved }
  })
  const [openNote, setOpenNote] = useState<string | null>(null)
  const [editingNote, setEditingNote] = useState<string | null>(null)
  const [noteDraft, setNoteDraft] = useState<Record<string, string>>({})
  function setAssumptionStatus(id: string, status: AssumptionStatus) {
    setAssumptionStatuses(prev => {
      const next = { ...prev, [id]: status }
      localStorage.setItem(LS_ASSUMPTIONS_KEY, JSON.stringify(next))
      window.dispatchEvent(new StorageEvent('storage', { key: LS_ASSUMPTIONS_KEY, newValue: JSON.stringify(next) }))
      return next
    })
  }

  function saveNote(id: string) {
    const text = noteDraft[id] ?? ''
    setAssumptionNotes(prev => {
      const next = { ...prev, [id]: text }
      localStorage.setItem(LS_ASSUMPTIONS_NOTES_KEY, JSON.stringify(next))
      return next
    })
    setEditingNote(null)
  }

  function discardNote(id: string) {
    setNoteDraft(d => ({ ...d, [id]: assumptionNotes[id] ?? '' }))
    setEditingNote(null)
  }

  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Delivery Partner</span>
            <span className="overview-stat-value">SCNSoft</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Phase 1 MVP</span>
            <span className="overview-stat-value overview-stat-score--warn">12 weeks</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Full Delivery</span>
            <span className="overview-stat-value">28 weeks</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Kick-off</span>
            <span className="overview-stat-value">2026-08-04</span>
          </div>
        </div>
      </div>

      {show('1.1') && (<>
      {/* 1.1 Proposal Summary */}
      <div className="rfp-section-heading" id="1.1">Proposal Summary</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">◎</span>
            Executive Statement
          </div>
          <div style={{ lineHeight: '1.7', fontSize: '14px', color: 'var(--fg)', padding: '14px' }}>
            <p style={{ marginBottom: '0.85rem' }}>
              We understand that high-quality RFP responses demand significant analytical effort — often <strong>8–40 hours per proposal</strong> — and that delivering a consistent, professional experience to every prospective client is a meaningful competitive advantage. SCNSoft proposes an <strong>AI-Powered Customer Facing Portal</strong> designed to compress proposal turnaround from 5–7 business days to under 24 hours, ensure consistent output quality regardless of team size or workload, and give every client a dedicated, access-controlled workspace to review the deliverables prepared specifically for them.
            </p>
            <p style={{ marginBottom: '0.85rem' }}>
              The portal ingests RFP documents (PDF, DOCX, MD, TXT), runs them through a multi-stage AI pipeline — OCR, semantic segmentation, PII anonymisation, LLM analysis — and produces a full suite of pre-sales artefacts: classified requirement lists, feature estimates, C4 architecture views, risk registers, a Go/No-Go recommendation, and an RFP Health Score. Clients review and approve deliverables through a branded portal with threaded comments and formal approval workflows.
            </p>
            <p style={{ marginBottom: 0 }}>
              SCNSoft has delivered AI-powered SaaS applications with LLM integration in production. Our proposed stack (React 18, FastAPI, PostgreSQL, Qdrant, Kafka, Kubernetes) maps directly to your technical requirements. We commit to the <strong>3-phase delivery schedule</strong>: Phase 1 MVP in 12 weeks, Enhanced Analytics in a further 8 weeks, and Platform &amp; Ecosystem in the final 8 weeks — 28 weeks total from kick-off on 2026-08-04.
            </p>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">✓</span>
            Proposal at a Glance
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Vendor</td>
                <td>SCNSoft Ltd. · 220 Davidson Ave, Somerset, NJ 08873, USA</td>
              </tr>
              <tr>
                <td className="overview-table-label">Solution</td>
                <td>AI-Powered Customer Facing Portal (greenfield build)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Implementation Model</td>
                <td><span style={{cursor:'pointer',textDecoration:'underline'}} onClick={() => navigate('/delivery-governance/delivery-timeline')}>Fixed-price, 3-phase delivery · 28 weeks</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Final Cost</td>
                <td><span style={{cursor:'pointer',textDecoration:'underline'}} onClick={() => navigate('/pricing-commercials')}><strong>$456,000</strong> fixed-price (all 3 phases)</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Contract Signing Target</td>
                <td>2026-07-25</td>
              </tr>
              <tr>
                <td className="overview-table-label">Kick-off / Project Start</td>
                <td>2026-08-04</td>
              </tr>
              <tr>
                <td className="overview-table-label">Phase 1 MVP Go-Live</td>
                <td>~2026-10-27 (12 weeks from kick-off)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Deployment Model</td>
                <td>Cloud-native, containerised</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🎯</span>
            Why This Proposal Delivers for You
          </div>
          <ul className="overview-risk-list">
            <li className="overview-risk">
              <span className="overview-risk-level" style={{ background: 'var(--sem-ok-bg)', color: 'var(--sem-ok-fg)' }}>1</span>
              <div>
                <strong>AI automation reduces pre-sales effort by ≥ 70%</strong> — The portal's LLM pipeline (OpenAI GPT-4-class or Anthropic Claude, swappable via abstraction layer) turns an 8–40 hour manual RFP parse into an automated analysis completing in under 2 minutes for a standard 30-page document.
              </div>
            </li>
            <li className="overview-risk">
              <span className="overview-risk-level" style={{ background: 'var(--sem-ok-bg)', color: 'var(--sem-ok-fg)' }}>2</span>
              <div>
                <strong>Proposal turnaround: 5–7 days → &lt; 24 hours</strong> — Standardised AI analysis, editable feature estimates with real-time recalculation, and a one-click export to PDF/DOCX/Confluence mean your team can respond to RFPs the same day they arrive.
              </div>
            </li>
            <li className="overview-risk">
              <span className="overview-risk-level" style={{ background: 'var(--sem-ok-bg)', color: 'var(--sem-ok-fg)' }}>3</span>
              <div>
                <strong>PII-safe LLM pipeline</strong> — A dedicated anonymisation worker replaces PII with typed placeholders before any content reaches an external LLM. The mapping is stored encrypted and never leaves your infrastructure, satisfying GDPR requirements and LLM provider data-use restrictions.
              </div>
            </li>
            <li className="overview-risk">
              <span className="overview-risk-level" style={{ background: 'var(--sem-ok-bg)', color: 'var(--sem-ok-fg)' }}>4</span>
              <div>
                <strong>Production LLM experience</strong> — SCNSoft meets both mandatory qualification thresholds: at least one delivered AI-powered web application with a live reference customer, and demonstrated LLM integration (OpenAI / Anthropic) in production.
              </div>
            </li>
          </ul>
        </div>
      </div>

      </>)}


      {show('1.3') && (<>
      {/* 1.3 Key Assumptions */}
      <div className="rfp-section-heading" id="1.3">Key Assumptions</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📋</span>
            Proposal Assumptions
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Assumption</th>
                <th>Status</th>
                <th>Impact if Wrong</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {([
                { id: 'A1', assumption: 'Cloud data region (EU or US) is confirmed at contract award. Infrastructure design and GDPR DPA drafting begin immediately after.', impact: 'Region choice affects infrastructure cost estimates by up to 15%. Pricing assumes a standard cloud region; sovereign or restricted regions may carry a surcharge.' },
                { id: 'A2', assumption: 'LLM provider (OpenAI, Anthropic, or Azure OpenAI) is agreed before Phase 1 kick-off. The abstraction layer supports swapping providers post-launch with no code changes.', impact: 'Provider-specific prompt tuning is scoped per the agreed provider. Switching providers post-launch requires a regression test cycle (estimated 1 sprint).' },
                { id: 'A3', assumption: 'Meridian nominates a Product Owner with authority to accept deliverables and raise change requests within 2 business days of submission.', impact: 'Delayed sign-offs push UAT gates and can cascade into Phase 2 and 3 start dates.' },
                { id: 'A4', assumption: 'SSO provider (Google Workspace, Azure AD, Okta, or SAML 2.0) and Salesforce sandbox credentials are available for integration testing from Phase 1 week 4.', impact: 'Integration testing deferred to Phase 3 if credentials are not available, potentially delaying CRM webhook and SSO delivery.' },
                { id: 'A5', assumption: 'All change requests will receive written approval or rejection within 5 business days of submission.', impact: 'Pending CRs not actioned within this window will be treated as approved for planning purposes, per standard contract terms.' },
              ] as const).map(({ id, assumption, impact }) => (
                <React.Fragment key={id}>
                  <tr>
                    <td><strong>{id}</strong></td>
                    <td>{assumption}</td>
                    <td>
                      <AssumptionStatusTag status={assumptionStatuses[id]} />
                      {assumptionStatuses[id] === 'Approved' && (
                        <div className="assumption-approved-by">
                          <span>✅</span>
                          <span>{CURRENT_USER}</span>
                        </div>
                      )}
                    </td>
                    <td>{impact}</td>
                    <td className="td-action">
                      <div className="assumption-status-toggle">
                        {(['Approved', 'Pending', 'Rejected'] as AssumptionStatus[]).map(s => (
                          <button
                            key={s}
                            title={s}
                            className={`assumption-toggle-btn assumption-toggle-btn--${s.toLowerCase()}${assumptionStatuses[id] === s ? ' assumption-toggle-btn--active' : ''}`}
                            onClick={() => setAssumptionStatus(id, assumptionStatuses[id] === s ? 'None' : s)}
                          >
                            {s === 'Approved' ? ICON_APPROVED : s === 'Rejected' ? ICON_REJECTED : ICON_PENDING}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                  {assumptionNotes[id] && editingNote !== id && (
                    <tr>
                      <td />
                      <td colSpan={4} className="td-answer td-answer--recorded">
                        <div className="answer-recorded">
                          <span className="answer-recorded-label"><span className="answer-recorded-avatar">HZ</span>{CURRENT_USER}:</span>
                          <span
                            className="answer-recorded-text answer-recorded-text--editable"
                            title="Click to edit"
                            onClick={() => {
                              setNoteDraft(d => ({ ...d, [id]: assumptionNotes[id] ?? '' }))
                              setEditingNote(id)
                              setOpenNote(id)
                            }}
                          >{assumptionNotes[id]}</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {!assumptionNotes[id] && editingNote !== id && (
                    <tr>
                      <td />
                      <td colSpan={4} className="td-answer td-answer--recorded">
                        <div className="answer-recorded">
                          <span
                            className="answer-recorded-text answer-recorded-text--placeholder"
                            style={{ color: 'var(--fg-muted)', fontStyle: 'italic', cursor: 'pointer', marginLeft: '8px' }}
                            onClick={() => { setNoteDraft(d => ({ ...d, [id]: '' })); setEditingNote(id); setOpenNote(id) }}
                          >Click to add a note…</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {openNote === id && editingNote === id && (
                    <tr>
                      <td />
                      <td colSpan={4} className="td-answer">
                        <div className="answer-panel">
                          <div className="answer-panel-header">
                            <span className="answer-panel-label">Note for {id}</span>
                            <span className="answer-panel-hint">Your note will be recorded against this assumption</span>
                          </div>
                          <textarea
                            className="answer-textarea"
                            placeholder="Add a note about this decision…"
                            autoFocus
                            rows={3}
                            value={noteDraft[id] ?? ''}
                            onChange={e => setNoteDraft(d => ({ ...d, [id]: e.target.value }))}
                            ref={el => { if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length) } }}
                          />
                          <div className="answer-panel-actions">
                            <button className="answer-btn answer-btn--submit" onClick={() => saveNote(id)}>Save</button>
                            <button className="answer-btn answer-btn--discard" onClick={() => discardNote(id)}>Discard</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>)}

      {show('1.4') && (<>
      {/* 1.4 Clarifications */}
      <div className="rfp-section-heading" id="1.4">Clarifications</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">❓</span>
            Clarifications Raised with Meridian
          </div>
          <ClarificationsTable />
        </div>
      </div>
      </>)}
    </div>
  )
}
