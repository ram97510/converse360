import type { Metadata } from 'next';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Terms of Service — Converse360',
  description: 'The terms that govern your use of Converse360.',
};

export default function TermsPage() {
  return (
    <PageShell scope="legal">
      <AnnouncementBar />
      <Header />
      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(40px,6vw,72px) clamp(20px,4vw,32px)" }}>

        <div style={{ marginBottom: "32px" }}>
          <h1>Terms of Service</h1>
          <p style={{ fontSize: "14.5px", color: "#6B726E", fontWeight: "500" }}>
            {' '}Effective 9 August 2026 · Last updated 9 August 2026{' '}
          </p>
        </div>

        <p style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--color-text)" }}>
          {' '}These terms are the agreement between <strong>Conceps Media Works</strong>, Coimbatore, Tamil Nadu, India
          ("Converse360", "we", "us") and the business that opens an account ("you"). By creating an account or using
          the service you accept them. If you are accepting on behalf of a company, you confirm you are authorised to
          bind it.{' '}
        </p>

        {/* TABLE OF CONTENTS */}
        <nav className="toc-box" aria-label="Contents">
          <strong style={{ fontFamily: "var(--font-heading)", fontSize: "17px", color: "var(--color-text)" }}>Table of Contents</strong>
          <ol>
            <li><a href="#service">1. What Converse360 is</a></li>
            <li><a href="#accounts">2. Your account</a></li>
            <li><a href="#meta">3. Your Meta accounts — and who pays Meta</a></li>
            <li><a href="#acceptable">4. Acceptable use</a></li>
            <li><a href="#ai">5. AI features</a></li>
            <li><a href="#data">6. Your data</a></li>
            <li><a href="#fees">7. Plans, trials and payment</a></li>
            <li><a href="#ip">8. Intellectual property</a></li>
            <li><a href="#availability">9. Availability and support</a></li>
            <li><a href="#suspension">10. Suspension and termination</a></li>
            <li><a href="#warranty">11. Disclaimers</a></li>
            <li><a href="#liability">12. Limitation of liability</a></li>
            <li><a href="#indemnity">13. Indemnity</a></li>
            <li><a href="#changes">14. Changes to these terms</a></li>
            <li><a href="#law">15. Governing law</a></li>
            <li><a href="#contact">16. Contact</a></li>
          </ol>
        </nav>

        {/* SECTIONS */}
        <section id="service">
          <h2>1. What Converse360 is</h2>
          <p>Converse360 is a customer relationship platform that connects to your existing WhatsApp Business,
            Instagram, Facebook and Meta Ads accounts and adds a shared inbox, contact management, broadcasts, deal
            pipelines, automations, flows, an optional AI assistant, and an API.</p>
          <p>We are a <strong>Meta Tech Provider</strong>. We are not Meta, we do not resell Meta's services, and Meta
            is not a party to this agreement.</p>
        </section>

        <section id="accounts">
          <h2>2. Your account</h2>
          <ul>
            <li>You must be a business or acting for one, and old enough to enter a contract where you live.</li>
            <li>You are responsible for everything done under your account, including by teammates you invite and by API
              keys you issue. Keep credentials secret and tell us promptly if one leaks.</li>
            <li>Give us accurate information and keep it current.</li>
            <li>The workspace owner controls billing and can remove any member.</li>
          </ul>
        </section>

        <section id="meta">
          <h2>3. Your Meta accounts — and who pays Meta</h2>
          <p>You connect your <em>own</em> WhatsApp Business Account, Instagram professional account, Facebook Page and
            Meta ad account. They remain yours. We act on them only with the permissions you grant, and you can revoke
            that access at any time from your Meta settings or from inside Converse360.</p>

          <div className="legal-card">
            <p><strong>Meta bills you directly. We never take a share and never hold your money.</strong></p>
            <p style={{ marginTop: "8px" }}>WhatsApp conversation charges are billed by Meta to the payment method on your
              own WhatsApp Business Account. Advertising spend is billed by Meta to your own ad account's funding
              source. We hold no wallet, no credit line and no ad credit for Meta's charges, and we do not extend credit
              to you or invoice you for what Meta bills. Your Converse360 subscription — and any AI credits you choose
              to buy from us (<a href="#ai">§5</a>) — are separate fees payable to us, and neither one pays for anything
              Meta charges.</p>
            <p style={{ marginTop: "8px" }}><strong>Until you add a payment method to your WhatsApp Business Account, you
                will not be able to start conversations with customers.</strong> That is Meta's requirement, not ours.{' '}
            </p>
          </div>

          <p>You are responsible for:</p>
          <ul>
            <li>complying with Meta's own terms — the WhatsApp Business Messaging Policy, the WhatsApp Business Solution
              Terms, Meta's Advertising Standards and Platform Terms;</li>
            <li>obtaining valid opt-in before messaging anyone on WhatsApp, and keeping proof of it;</li>
            <li>the content of your messages, message templates, ad creative and lead forms;</li>
            <li>your ad spend and targeting choices, including compliance with special ad category rules;</li>
            <li>keeping your phone number, business verification and account standing in good order with Meta.</li>
          </ul>
          <p>If Meta restricts, suspends or bans your account, your number, or a template, we cannot overturn it, and
            features that depend on it will stop working through no fault of ours.</p>
        </section>

        <section id="acceptable">
          <h2>4. Acceptable use</h2>
          <p>You may not use Converse360 to:</p>
          <ul>
            <li>send unsolicited bulk messages, or message anyone who has not opted in or who has opted out;</li>
            <li>send unlawful, deceptive, harassing, hateful or infringing content;</li>
            <li>impersonate another person or business;</li>
            <li>upload contact lists you do not have the right to use;</li>
            <li>circumvent rate limits, messaging windows, template approval, or any Meta policy control;</li>
            <li>reverse engineer, resell or white-label the service without our written agreement;</li>
            <li>probe, scan or attack our infrastructure, or attempt to reach another customer's data;</li>
            <li>build a competing product from your access to ours.</li>
          </ul>
          <p>We may remove content and suspend access where we reasonably believe this section has been breached.</p>
        </section>

        <section id="ai">
          <h2>5. AI features</h2>
          <p>The AI assistant is optional, and runs one of two ways — you choose which in your workspace settings.</p>
          <ul>
            <li><strong>Built-in AI (the default).</strong> It runs on our provider account, and each use spends{' '}
              <strong>AI credits</strong> from your workspace balance. New workspaces get a starting allowance of free
              credits; after that you can buy more. Credits are sold by us, are consumed as you use the assistant, and
              are <strong>non-refundable and non-transferable</strong>; unused credits do not expire while your
              workspace is active and are forfeited when it closes. We may change credit pricing prospectively on
              notice, and metering is measured by the tokens a request actually consumes.{' '}
            </li>
            <li><strong>Your own key.</strong> You supply your own OpenAI, Anthropic or Google API key, and your
              conversations are sent to that provider under <em>your</em> agreement with them. You are responsible for
              that agreement and for the provider's charges. Nothing is metered by us in this mode.</li>
          </ul>
          <p>In either mode you are responsible for the content the assistant produces on your behalf.</p>
          <p>AI output can be wrong. You are responsible for reviewing it and for any commitment it makes to your
            customers. We recommend keeping the assistant scoped with ground rules and testing it against your own
            numbers before going live.</p>

          <div className="legal-card">
            <p><strong>Meta's AI restrictions apply to you too.</strong> Meta's WhatsApp Business Solution Terms
              prohibit using WhatsApp to distribute general-purpose AI assistants, and prohibit using WhatsApp Business
              data to train or develop AI models. You must not configure the assistant as an open-ended, general-purpose
              chatbot, and you must not use data from the platform to train models. We do not train on your data either.
              Breach of this can result in Meta restricting your account and in us suspending the feature.</p>
          </div>
        </section>

        <section id="data">
          <h2>6. Your data</h2>
          <p>Your contacts, conversations, messages and CRM records are <strong>yours</strong>. We claim no ownership.
            We process them to run the service, on your instructions, as described in our <Link href="/privacy">Privacy
              Policy</Link>. Where the law treats you as the controller of your customers'
            personal data, you are, and we are your processor.</p>
          <p>You warrant that you have the lawful basis and consent needed to collect and process the personal data you
            put into Converse360, and to send the messages you send.</p>
          <p>You can export your data at any time through the product or the API. After your subscription ends we keep
            your data for <strong>90 days</strong> so you can return or export, then delete it permanently. You may ask
            us to delete it sooner.</p>
          <p>We may use aggregated, de-identified statistics about how the product is used to improve it. This never
            includes message content, contact records, or anything that identifies you or your customers.</p>
        </section>

        <section id="fees">
          <h2>7. Plans, trials and payment</h2>
          <div className="legal-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Terms</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Item">Plans</td>
                  <td data-label="Terms">Starter, Growth and Enterprise. Current prices are on our pricing page and in the app.</td>
                </tr>
                <tr>
                  <td data-label="Item">Trial</td>
                  <td data-label="Terms">Selecting a plan during onboarding starts a free trial of the length shown for that plan. No
                    payment is taken at that point. <strong>One trial per workspace</strong> — switching plans during a
                    trial carries the same clock forward and does not start a new one.</td>
                </tr>
                <tr>
                  <td data-label="Item">AI credits</td>
                  <td data-label="Terms">Sold separately from your subscription and consumed as you use the built-in assistant. Priced per
                    pack at checkout. <strong>Non-refundable and non-transferable</strong> once purchased — see <a href="#ai">§5</a>.</td>
                </tr>
                <tr>
                  <td data-label="Item">Billing</td>
                  <td data-label="Terms">Subscriptions are charged in advance for the period you choose, and renew automatically until
                    cancelled.</td>
                </tr>
                <tr>
                  <td data-label="Item">Payment</td>
                  <td data-label="Terms">Processed by Stripe or Razorpay. We do not store card details.</td>
                </tr>
                <tr>
                  <td data-label="Item">Taxes</td>
                  <td data-label="Terms">Prices exclude taxes unless stated. You are responsible for any applicable tax, including GST.{' '}
                  </td>
                </tr>
                <tr>
                  <td data-label="Item">Enterprise</td>
                  <td data-label="Terms">Priced by quotation under a separate order form, which prevails over these terms where they
                    conflict.</td>
                </tr>
                <tr>
                  <td data-label="Item">Price changes</td>
                  <td data-label="Terms">We will give at least <strong>30 days'</strong> notice before a change affects your renewal.</td>
                </tr>
                <tr>
                  <td data-label="Item">Cancellation</td>
                  <td data-label="Terms">Cancel any time from Settings. Access continues to the end of the paid period.</td>
                </tr>
                <tr>
                  <td data-label="Item">Refunds</td>
                  <td data-label="Terms"><strong>Subscription fees are non-refundable.</strong> Every plan begins with a free trial so you
                    can evaluate Converse360 before paying. You may cancel at any time and keep access until the end of
                    the period you have already paid for; we do not refund unused time in a current period, and we do
                    not refund AI credits.</td>
                </tr>
                <tr>
                  <td data-label="Item">Non-payment</td>
                  <td data-label="Terms">If a payment fails we may suspend the workspace after notice, and terminate if it stays unpaid for{' '}
                    <strong>14 days</strong>.{' '}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: "14.5px", color: "#6B726E" }}>Again: none of the above covers Meta's charges for conversations or
            ad spend. Those are billed to you by Meta separately — see <a href="#meta">§3</a>.</p>
        </section>

        <section id="ip">
          <h2>8. Intellectual property</h2>
          <p>We own Converse360 — the software, design, documentation and brand. These terms grant you a non-exclusive,
            non-transferable right to use it during your subscription, and nothing more. You own your data and your
            content. If you send us feedback we may use it freely and without obligation.</p>
        </section>

        <section id="availability">
          <h2>9. Availability and support</h2>
          <p>We aim to keep the service available and to give reasonable support on business days. We may take it down
            for maintenance, with notice where we can give it.</p>
          <p>Parts of Converse360 depend on Meta, on payment providers, and on AI providers you choose. When one of them
            is degraded or changes its API, the dependent feature may be affected. We will work around it where we can,
            but their behaviour is outside our control. Unless you have a separate written service level agreement, no
            uptime guarantee applies.</p>
        </section>

        <section id="suspension">
          <h2>10. Suspension and termination</h2>
          <p>We may suspend or terminate your access if:</p>
          <ul>
            <li>you breach these terms, particularly <a href="#acceptable">§4</a>;</li>
            <li>your use puts our platform, our other customers, or our standing with Meta at risk;</li>
            <li>payment is overdue after notice;</li>
            <li>we are required to by law or by Meta.</li>
          </ul>
          <p>Where circumstances allow, we will warn you first and give you a chance to fix it. You may terminate at any
            time by cancelling. On termination your licence ends, and the retention and deletion terms in <a href="#data">§6</a> apply.</p>
        </section>

        <section id="warranty">
          <h2>11. Disclaimers</h2>
          <p>Except as expressly stated, the service is provided <strong>"as is"</strong>. To the extent the law allows,
            we disclaim all implied warranties, including merchantability, fitness for a particular purpose and
            non-infringement. We do not warrant that the service will be uninterrupted or error-free, that every message
            will be delivered (delivery is Meta's and the carrier's), or that AI output will be accurate.</p>
        </section>

        <section id="liability">
          <h2>12. Limitation of liability</h2>
          <p>To the extent the law allows, neither party is liable for indirect, incidental, special or consequential
            loss, or for lost profits, revenue, goodwill or data, however caused.</p>
          <p>Our total aggregate liability arising out of or relating to this agreement is capped at <strong>the fees
              you paid us in the twelve months before the event giving rise to the claim</strong>. For clarity, that cap
            does not include, and we are not liable for, amounts Meta or an AI provider bills you directly.</p>
          <p>Nothing here excludes liability that cannot lawfully be excluded — including for fraud, or death or
            personal injury caused by negligence.</p>
        </section>

        <section id="indemnity">
          <h2>13. Indemnity</h2>
          <p>You will defend and indemnify us against third-party claims arising from your content, your messages, your
            ads, your use of the service in breach of these terms or of Meta's policies, or your failure to obtain the
            consents you warranted you had.</p>
        </section>

        <section id="changes">
          <h2>14. Changes to these terms</h2>
          <p>We may update these terms. Material changes are notified in the app and by email to workspace owners at
            least <strong>30 days</strong> before they take effect. Continuing to use the service after that means you
            accept them; if you do not, cancel before the effective date.</p>
        </section>

        <section id="law">
          <h2>15. Governing law</h2>
          <p>These terms are governed by the laws of <strong>India</strong>, and the courts of <strong>Coimbatore, Tamil
              Nadu</strong> have exclusive jurisdiction, without regard to conflict-of-law rules.</p>
          <p>If any provision is unenforceable, the rest stands. Our failure to enforce a provision is not a waiver of
            it. You may not assign this agreement without our consent; we may assign it to a successor in a merger or
            acquisition.</p>
        </section>

        <section id="contact">
          <h2>16. Contact</h2>
          <p>
            <strong>Conceps Media Works</strong><br />
            {' '}No. 38/4, Hindustan College Road, Near Nava India, Sowripalayam,<br />
            {' '}Coimbatore, Tamil Nadu – 641028, India<br />
            <a href="mailto:support@converse360.in">support@converse360.in</a>
          </p>
        </section>

      </main>
      <Footer />
    </PageShell>
  );
}
