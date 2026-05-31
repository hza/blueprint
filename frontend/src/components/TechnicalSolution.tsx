export function TechnicalSolution() {
  return (
    <div className="rfp-health">
      {/* Architecture Banner */}
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">Technical Solution</div>
            <div className="overview-banner-client">Architecture coverage: 91% — 3 open technical gaps requiring owner assignment</div>
          </div>
          <span className="health-badge health-badge--ok overview-banner-status">SOLUTION READY</span>
        </div>
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Solution Score</span>
            <span className="overview-stat-value overview-stat-score--ok">78 / 100</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Stack</span>
            <span className="overview-stat-value">Cloud-native · Microservices · API-first</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Deployment</span>
            <span className="overview-stat-value">Kubernetes on AWS</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Region</span>
            <span className="overview-stat-value">us-east-1</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Open Gaps</span>
            <span className="overview-stat-value health-val--warn">3</span>
          </div>
        </div>
      </div>

      <div className="health-grid">
        {/* Proposed Architecture */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">⬡</span>
            Proposed Architecture
            <span className="health-badge health-badge--ok">Approved</span>
          </div>
          <table className="health-table">
            <tbody>
              <tr>
                <td className="health-table-label">Architecture Style</td>
                <td className="health-table-value health-val--strong">Microservices + Event-driven</td>
              </tr>
              <tr>
                <td className="health-table-label">Frontend</td>
                <td className="health-table-value">React 18 · TypeScript · Vite</td>
              </tr>
              <tr>
                <td className="health-table-label">Backend API</td>
                <td className="health-table-value">Python FastAPI · REST + GraphQL gateway</td>
              </tr>
              <tr>
                <td className="health-table-label">Data Layer</td>
                <td className="health-table-value">PostgreSQL 16 · Redis 7 · S3-compatible object store</td>
              </tr>
              <tr>
                <td className="health-table-label">Messaging</td>
                <td className="health-table-value">Apache Kafka · Schema Registry</td>
              </tr>
              <tr>
                <td className="health-table-label">Orchestration</td>
                <td className="health-table-value">Kubernetes 1.30 · Helm · ArgoCD</td>
              </tr>
              <tr>
                <td className="health-table-label">Observability</td>
                <td className="health-table-value">OpenTelemetry · Prometheus · Grafana · Loki</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* RFP Requirement Coverage */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">✓</span>
            RFP Technical Requirement Coverage
            <span className="health-badge health-badge--warn">3 Gaps</span>
          </div>
          <ul className="health-checklist">
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <span>High Availability — Active-active deployment across 2 AZs. RTO &lt; 15 min, RPO &lt; 1 min.</span>
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <span>Scalability — Horizontal auto-scaling via KEDA. Load tested to 10 000 concurrent users.</span>
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <span>Data encryption — AES-256 at rest, TLS 1.3 in transit. Key management via AWS KMS.</span>
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <span>Audit logging — Immutable audit trail per Section 5.2. Retained 7 years on WORM storage.</span>
            </li>
            <li className="health-check health-check--fail">
              <span className="health-check-icon" />
              <span>SSO / SAML 2.0 integration — <strong>NOT addressed</strong>. Section 6.4 mandates IdP federation with client AD.</span>
            </li>
            <li className="health-check health-check--fail">
              <span className="health-check-icon" />
              <span>Offline / disconnected mode — <strong>NOT scoped</strong>. Section 8.1 requires field ops with intermittent connectivity.</span>
            </li>
            <li className="health-check health-check--warn">
              <span className="health-check-icon" />
              <span>Legacy API adapter — Partial. SOAP-to-REST bridge designed but not load-tested against legacy endpoints.</span>
            </li>
          </ul>
        </div>

        {/* Security & Compliance */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">🔒</span>
            Security &amp; Compliance Posture
            <span className="health-badge health-badge--warn">Review Required</span>
          </div>
          <ul className="health-risk-list">
            <li className="health-risk health-risk--high">
              <span className="health-risk-level">GAP</span>
              <div>
                <strong>ISO 27001 certification not yet held</strong> — RFP Section 4.3 is mandatory. Expedited audit path estimated at 90 days; submission is before that window closes.
              </div>
            </li>
            <li className="health-risk health-risk--med">
              <span className="health-risk-level">RISK</span>
              <div>
                <strong>Third-party dependency audit incomplete</strong> — 12 open-source libraries flagged by Snyk with medium CVEs. Must be resolved before pen-test sign-off.
              </div>
            </li>
            <li className="health-risk health-risk--med">
              <span className="health-risk-level">RISK</span>
              <div>
                <strong>Pen-test scoped but not scheduled</strong> — Client requires OWASP Top 10 report with submission. Engage testing vendor this week.
              </div>
            </li>
            <li className="health-risk health-risk--low">
              <span className="health-risk-level">NOTE</span>
              <div>
                GDPR data residency controls implemented. Data processing agreement template ready for client legal review.
              </div>
            </li>
          </ul>
        </div>

        {/* Delivery Plan */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">⏱</span>
            Delivery Plan
          </div>
          <ul className="health-timeline">
            <li className="health-tl-item health-tl--done">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Month 1–2</span>
                <span className="health-tl-event">Discovery &amp; environment setup — requirements validation, cloud provisioning, CI/CD pipeline</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--done">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Month 3–5</span>
                <span className="health-tl-event">Core platform build — auth, data model, API layer, base UI</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Month 6–8</span>
                <span className="health-tl-event">Integration sprint — legacy adapters, SSO, third-party connectors, UAT environment</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Month 9</span>
                <span className="health-tl-event">Performance &amp; security testing — load tests, pen-test, remediation</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Month 10</span>
                <span className="health-tl-event">Pilot rollout — 50-user group, feedback loop, go/no-go review</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Month 11–12</span>
                <span className="health-tl-event">Full production cutover — phased migration, hypercare support, knowledge transfer</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Team */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">👤</span>
            Proposed Delivery Team
          </div>
          <table className="health-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Name / Status</th>
                <th>FTE</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="health-table-label">Solution Architect</td>
                <td>A. Reyes</td>
                <td>0.5</td>
                <td className="health-val--ok">Confirmed</td>
              </tr>
              <tr>
                <td className="health-table-label">Tech Lead / Backend</td>
                <td>M. Patel</td>
                <td>1.0</td>
                <td className="health-val--ok">Confirmed</td>
              </tr>
              <tr>
                <td className="health-table-label">Frontend Lead</td>
                <td>TBD</td>
                <td>1.0</td>
                <td className="health-val--warn">Recruitment in progress</td>
              </tr>
              <tr>
                <td className="health-table-label">DevOps / Platform</td>
                <td>L. Chen</td>
                <td>0.5</td>
                <td className="health-val--ok">Confirmed</td>
              </tr>
              <tr>
                <td className="health-table-label">QA Lead</td>
                <td>S. Nguyen</td>
                <td>0.5</td>
                <td className="health-val--ok">Confirmed</td>
              </tr>
              <tr>
                <td className="health-table-label">Project Manager</td>
                <td>K. Obi</td>
                <td>0.5</td>
                <td className="health-val--ok">Confirmed</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Open Technical Actions */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">→</span>
            Open Technical Actions
            <span className="health-badge health-badge--danger">3 Blocking</span>
          </div>
          <ul className="health-actions">
            <li className="health-action health-action--urgent">
              <span className="health-action-tag">BLOCKING</span>
              <div>
                <strong>Design SSO / SAML 2.0 integration</strong> — Assign M. Patel. Prototype required before proposal submission to prove feasibility against client AD schema.
              </div>
            </li>
            <li className="health-action health-action--urgent">
              <span className="health-action-tag">BLOCKING</span>
              <div>
                <strong>Scope offline mode</strong> — Define sync strategy (CRDTs vs. last-write-wins) and storage budget for field devices. Required for Section 8.1 compliance narrative.
              </div>
            </li>
            <li className="health-action health-action--urgent">
              <span className="health-action-tag">BLOCKING</span>
              <div>
                <strong>Schedule penetration test</strong> — Vendor must be engaged this week to hit report deadline. Use pre-approved vendor list from InfoSec.
              </div>
            </li>
            <li className="health-action health-action--high">
              <span className="health-action-tag">HIGH</span>
              <div>
                <strong>Resolve 12 open CVEs</strong> — Run <code>snyk fix</code> for auto-patchable issues. Manually review remaining 4. Sign-off needed from InfoSec before pen-test.
              </div>
            </li>
            <li className="health-action health-action--high">
              <span className="health-action-tag">HIGH</span>
              <div>
                <strong>Complete legacy SOAP adapter load test</strong> — Target: 500 req/s sustained. Current tests only cover 50 req/s. Schedule test with infrastructure team.
              </div>
            </li>
            <li className="health-action health-action--med">
              <span className="health-action-tag">MED</span>
              <div>
                Hire Frontend Lead — without confirmation, resource plan in proposal is non-credible. Escalate to HR today.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
