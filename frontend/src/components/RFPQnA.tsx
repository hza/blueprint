import { useState } from 'react'
import './RFPQnA.css'

interface QAItem {
  id: number
  question: string
  section: string
  askedBy: string
  askedDate: string
  status: 'answered' | 'pending' | 'overdue'
  answer?: string
  answeredDate?: string
  answeredBy?: string
  critical: boolean
}

const QA_DATA: QAItem[] = [
  {
    id: 1,
    question: 'Section 4.3 requires ISO 27001 certification. We currently hold SOC 2 Type II and are in the process of obtaining ISO 27001. Will SOC 2 Type II be accepted as an equivalent, or is there a waiver process?',
    section: '4.3 — Security Certifications',
    askedBy: 'Buyer Team',
    askedDate: 'Mar 5, 2025',
    status: 'overdue',
    critical: true,
  },
  {
    id: 2,
    question: 'Can references from subsidiaries of the same parent company count as separate client references under Section 6.2, or must all three references be from independent organizations?',
    section: '6.2 — Client References',
    askedBy: 'Buyer Team',
    askedDate: 'Mar 5, 2025',
    status: 'overdue',
    critical: true,
  },
  {
    id: 3,
    question: 'Section 9.4 references "TechCore v4 framework" as a deployment requirement. Please clarify whether this is a mandatory platform constraint or a preferred architecture. Our solution uses a functionally equivalent proprietary framework.',
    section: '9.4 — Technical Architecture',
    askedBy: 'Buyer Team',
    askedDate: 'Mar 6, 2025',
    status: 'answered',
    answer: 'TechCore v4 is listed as a preferred, not mandatory, framework. Equivalent architectures will be evaluated on functional merit. Vendors must provide a detailed mapping of their platform capabilities to the TechCore v4 feature set in Section 9 of the technical proposal.',
    answeredDate: 'Mar 10, 2025',
    answeredBy: 'J. Matthews (Procurement)',
    critical: false,
  },
  {
    id: 4,
    question: 'Schedule B pricing template uses fixed annual licensing tiers. Our pricing model is consumption-based. Are we permitted to submit an alternative pricing structure with a cost equivalence analysis, or must we strictly adhere to Schedule B format?',
    section: 'Schedule B — Pricing',
    askedBy: 'Buyer Team',
    askedDate: 'Mar 7, 2025',
    status: 'answered',
    answer: 'All submissions must use Schedule B. Vendors may attach a supplemental pricing sheet to explain alternative models, but the Schedule B totals will be used for comparative evaluation purposes. Failure to complete Schedule B will result in disqualification.',
    answeredDate: 'Mar 9, 2025',
    answeredBy: 'J. Matthews (Procurement)',
    critical: true,
  },
  {
    id: 5,
    question: 'Section 11.2 imposes a 2% per week delay penalty with no cap. Is there a maximum liability ceiling, and can this be negotiated during contract execution or must the proposal acknowledge acceptance of the uncapped penalty?',
    section: '11.2 — Penalty Clauses',
    askedBy: 'Buyer Team',
    askedDate: 'Mar 7, 2025',
    status: 'pending',
    critical: true,
  },
  {
    id: 6,
    question: 'For Section 5.1 technical presentation, does the 20-minute time limit include Q&A, or is Q&A additional?',
    section: '5.1 — Oral Presentation',
    askedBy: 'Buyer Team',
    askedDate: 'Mar 8, 2025',
    status: 'answered',
    answer: 'The 20-minute slot is for the presentation only. Q&A will follow and is allocated a separate 10-minute block.',
    answeredDate: 'Mar 11, 2025',
    answeredBy: 'J. Matthews (Procurement)',
    critical: false,
  },
  {
    id: 7,
    question: 'Has the deadline for submissions been extended following the delayed release of the Q&A responses? Several questions were answered after the original Q&A deadline.',
    section: 'General — Timeline',
    askedBy: 'Buyer Team',
    askedDate: 'Mar 11, 2025',
    status: 'pending',
    critical: true,
  },
]

const STATUS_LABEL: Record<QAItem['status'], string> = {
  answered: 'Answered',
  pending: 'Awaiting Answer',
  overdue: 'No Response',
}

export function RFPQnA() {
  const [filter, setFilter] = useState<'all' | 'unanswered' | 'critical'>('all')

  const visible = QA_DATA.filter((q) => {
    if (filter === 'unanswered') return q.status !== 'answered'
    if (filter === 'critical') return q.critical
    return true
  })

  const counts = {
    answered: QA_DATA.filter((q) => q.status === 'answered').length,
    pending: QA_DATA.filter((q) => q.status === 'pending').length,
    overdue: QA_DATA.filter((q) => q.status === 'overdue').length,
    critical: QA_DATA.filter((q) => q.critical).length,
  }

  return (
    <div className="rfp-qa">
      <div className="qa-summary-bar">
        <div className="qa-stat">
          <span className="qa-stat-num">{QA_DATA.length}</span>
          <span className="qa-stat-label">Total Questions</span>
        </div>
        <div className="qa-stat qa-stat--ok">
          <span className="qa-stat-num">{counts.answered}</span>
          <span className="qa-stat-label">Answered</span>
        </div>
        <div className="qa-stat qa-stat--warn">
          <span className="qa-stat-num">{counts.pending}</span>
          <span className="qa-stat-label">Pending</span>
        </div>
        <div className="qa-stat qa-stat--danger">
          <span className="qa-stat-num">{counts.overdue}</span>
          <span className="qa-stat-label">No Response</span>
        </div>
        <div className="qa-stat qa-stat--critical">
          <span className="qa-stat-num">{counts.critical}</span>
          <span className="qa-stat-label">Critical</span>
        </div>
        <div className="qa-filter-group">
          <button className={`qa-filter${filter === 'all' ? ' active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`qa-filter${filter === 'unanswered' ? ' active' : ''}`} onClick={() => setFilter('unanswered')}>Unanswered</button>
          <button className={`qa-filter${filter === 'critical' ? ' active' : ''}`} onClick={() => setFilter('critical')}>Critical</button>
        </div>
      </div>

      <div className="qa-list">
        {visible.map((q) => (
          <div key={q.id} className={`qa-item${q.critical ? ' qa-item--critical' : ''}`}>
            <div className="qa-item-header">
              <span className="qa-section">{q.section}</span>
              <div className="qa-item-meta">
                {q.critical && <span className="qa-badge qa-badge--critical">Critical</span>}
                <span className={`qa-badge qa-badge--${q.status}`}>{STATUS_LABEL[q.status]}</span>
              </div>
            </div>

            <div className="qa-question">
              <span className="qa-q-label">Q</span>
              <p>{q.question}</p>
            </div>
            <div className="qa-question-meta">
              Asked by {q.askedBy} · {q.askedDate}
            </div>

            {q.answer ? (
              <div className="qa-answer">
                <span className="qa-a-label">A</span>
                <div>
                  <p>{q.answer}</p>
                  <div className="qa-answer-meta">
                    {q.answeredBy} · {q.answeredDate}
                  </div>
                </div>
              </div>
            ) : (
              <div className="qa-no-answer">
                {q.status === 'overdue'
                  ? 'No response received. Escalate to J. Matthews immediately — this is a disqualifying gap.'
                  : 'Response pending. Follow up if not received 48 hours before submission.'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
