import Link from "next/link";

const workflowSteps = [
  ["01", "Intake", "Capture the business, request, and relationship context in one record."],
  ["02", "Review", "Keep documents, tasks, underwriting notes, and decisions moving together."],
  ["03", "Fund", "Compare offers and leave every next action clear for the team."],
];

const principles = [
  ["One operating picture", "Pipeline, borrower context, documents, and activity live in the same workspace."],
  ["Designed for the handoff", "Every record makes the owner, status, and next step visible before work gets missed."],
  ["A deliberate demo", "This project uses synthetic data only. It is a product prototype, not a production finance system."],
];

export default function LandingPage() {
  return (
    <main className="landing">
      <nav className="landingNav" aria-label="Main navigation">
        <Link className="landingBrand" href="/">
          <span>H</span>
          <strong>Harbor</strong>
        </Link>
        <div className="landingNavLinks">
          <a href="#workflow">Workflow</a>
          <a href="#principles">Approach</a>
          <Link className="landingNavAction" href="/workspace">Open demo</Link>
        </div>
      </nav>

      <section className="landingHero">
        <div className="landingHeroCopy">
          <p className="landingEyebrow"><i /> Capital operations, made legible</p>
          <h1>Move each funding decision forward with context intact.</h1>
          <p className="landingLead">
            Harbor is a commercial-funding CRM concept for teams that need a calmer way to
            guide borrowers from first conversation through to a clear capital decision.
          </p>
          <div className="landingActions">
            <Link className="landingPrimary" href="/workspace">Explore the demo workspace <span>→</span></Link>
            <a className="landingSecondary" href="#workflow">See the workflow <span>↓</span></a>
          </div>
          <p className="landingDisclosure">Interactive prototype · Synthetic data only · No customer records</p>
        </div>

        <div className="landingPreview" aria-label="Harbor CRM workspace preview">
          <div className="previewGlow" />
          <div className="previewWindow">
            <div className="previewTopbar">
              <div className="previewMark"><span>H</span> Harbor</div>
              <div className="previewSearch">⌕&nbsp;&nbsp; Search businesses, owners, applications</div>
              <span className="previewPill">LIVE PIPELINE</span>
            </div>
            <div className="previewBody">
              <aside className="previewSidebar">
                <p>OPERATIONS</p>
                <b>▣ &nbsp; Dashboard</b>
                <span>◇ &nbsp; Businesses</span>
                <span>⌁ &nbsp; Applications</span>
                <p>WORK QUEUE</p>
                <span>○ &nbsp; Documents</span>
                <span>□ &nbsp; Reports</span>
              </aside>
              <div className="previewMain">
                <div className="previewHeader">
                  <div><p>CAPITAL OPERATIONS</p><h2>Today&apos;s funding desk</h2></div>
                  <button>New application</button>
                </div>
                <div className="previewMetrics">
                  <div><small>Active applications</small><strong>24</strong><span>↑ 5 this week</span></div>
                  <div><small>Docs to review</small><strong>11</strong><span>3 due today</span></div>
                  <div><small>Offers awaiting action</small><strong>06</strong><span>2 expiring soon</span></div>
                </div>
                <div className="previewPanels">
                  <section>
                    <div className="previewPanelTitle"><strong>Applications requiring action</strong><span>14 open</span></div>
                    {[
                      ["Summit Fleet Services", "Underwriting", "$500,000", "Today, 4:30 PM"],
                      ["Brightpath Medical", "Offer sent", "$275,000", "Offer expires 27 Aug"],
                      ["Apex Industrial Fabrication", "Documents", "$1,200,000", "Documents due"],
                    ].map(([name, stage, amount, next]) => <div className="previewRow" key={name}><b>{name}<small>{stage}</small></b><span>{amount}</span><em>{next}</em></div>)}
                  </section>
                  <section className="previewQueue">
                    <div className="previewPanelTitle"><strong>Your work queue</strong><span>5 tasks</span></div>
                    {[
                      "Verify borrower ID for Summit Fleet",
                      "Review bank statements for Apex",
                      "Confirm offer terms with Brightpath",
                    ].map((task) => <div className="previewTask" key={task}><i /> <span>{task}<small>Next action</small></span></div>)}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="landingSection landingWorkflow">
        <div className="landingSectionIntro">
          <p className="landingEyebrow">A practical operating rhythm</p>
          <h2>Less hunting for status. More time for the decision.</h2>
        </div>
        <div className="workflowGrid">
          {workflowSteps.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section id="principles" className="landingSection landingPrinciples">
        <div className="landingPrinciplesHeading">
          <p className="landingEyebrow">Built around the real work</p>
          <h2>A focused workspace for high-context conversations.</h2>
          <Link href="/workspace" className="landingTextLink">Open the interactive demo <span>→</span></Link>
        </div>
        <div className="principlesList">
          {principles.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </section>

      <footer className="landingFooter">
        <Link className="landingBrand" href="/"><span>H</span><strong>Harbor</strong></Link>
        <p>Commercial-funding CRM concept</p>
        <Link href="/workspace">Launch demo workspace ↗</Link>
      </footer>
    </main>
  );
}
