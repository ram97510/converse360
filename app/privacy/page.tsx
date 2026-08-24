import type { Metadata } from 'next';

import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Privacy Policy — Converse360',
  description: 'How Converse360 collects, uses and protects your data.',
};

export default function PrivacyPage() {
  return (
    <PageShell scope="legal">
      <AnnouncementBar />
      <Header />
      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(40px,6vw,72px) clamp(20px,4vw,32px)" }}>

        <div style={{ marginBottom: "32px" }}>
          <h1>Privacy Policy</h1>
          <p style={{ fontSize: "14.5px", color: "#6B726E", fontWeight: "500" }}>
            {' '}Effective 9 August 2026 · Last updated 9 August 2026{' '}
          </p>
        </div>

        <p style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--color-text)" }}>
          {' '}This policy explains what personal data Converse360 handles, why, who it is shared with, how long it is kept,
          and how to have it deleted. It covers our website, our web application, and every channel the product connects
          to — WhatsApp, Instagram, Facebook Pages and Meta Ads.{' '}
        </p>

        <div className="legal-card">
          <p><strong>Who we are.</strong></p>
          <p style={{ marginTop: "6px" }}>
            {' '}Converse360 is operated by <strong>Conceps Media Works</strong>, at No. 38/4, Hindustan College Road, Near
            Nava India, Sowripalayam, Coimbatore, Tamil Nadu – 641028, India. In this policy "we", "us" and
            "Converse360" mean that business. You can reach us about anything in this policy at <a href="mailto:support@converse360.in">support@converse360.in</a>.{' '}
          </p>
        </div>

        {/* TABLE OF CONTENTS */}
        <nav className="toc-box" aria-label="Contents">
          <strong style={{ fontFamily: "var(--font-heading)", fontSize: "17px", color: "var(--color-text)" }}>Table of Contents</strong>
          <ol>
            <li><a href="#roles">1. Two different roles we play</a></li>
            <li><a href="#what">2. What we collect</a></li>
            <li><a href="#meta">3. Data from Meta platforms</a></li>
            <li><a href="#why">4. Why we use it</a></li>
            <li><a href="#ai">5. AI features</a></li>
            <li><a href="#google">6. Google services integration</a></li>
            <li><a href="#share">7. Who we share it with</a></li>
            <li><a href="#send-meta">8. What we send to Meta</a></li>
            <li><a href="#retention">9. How long we keep it</a></li>
            <li><a href="#delete">10. Deleting your data</a></li>
            <li><a href="#security">11. How we protect it</a></li>
            <li><a href="#rights">12. Your rights</a></li>
            <li><a href="#transfers">13. International transfers</a></li>
            <li><a href="#children">14. Children</a></li>
            <li><a href="#changes">15. Changes to this policy</a></li>
            <li><a href="#contact">16. Contact and complaints</a></li>
          </ol>
        </nav>

        {/* SECTIONS */}
        <section id="roles">
          <h2>1. Two different roles we play</h2>
          <p>This distinction matters, because it determines who you should contact about a given piece of data.</p>
          <ul>
            <li><strong>For our own customers — we are the controller.</strong> When a business signs up for
              Converse360, we decide how their account, billing and usage data is handled. This policy governs that data
              directly.</li>
            <li><strong>For our customers' customers — we are a processor.</strong> When a business connects their
              WhatsApp or Instagram account, the messages and contact records that flow through Converse360 belong to{' '}
              <em>that business</em>. They decide what to collect and why; we only store and process it on their
              instructions. If you messaged a business on WhatsApp and want your data removed, <strong>contact that
                business first</strong> — they control it. We will help them action it, and we will act on a direct
              request too (see <a href="#delete">§10</a>).{' '}
            </li>
          </ul>
        </section>

        <section id="what">
          <h2>2. What we collect</h2>

          <h3>From the business that signs up</h3>
          <div className="legal-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Data">Account identity</td>
                  <td data-label="Detail">Name, email address, and a password (hashed — we never see it) or a Google sign-in. Handled by our
                    authentication provider, Supabase.</td>
                </tr>
                <tr>
                  <td data-label="Data">Workspace</td>
                  <td data-label="Detail">Workspace name, your role, teammates you invite, and the qualification answers given during
                    onboarding.</td>
                </tr>
                <tr>
                  <td data-label="Data">Billing</td>
                  <td data-label="Detail">Plan, subscription status and renewal dates. <strong>Card details never reach our servers</strong>
                    {' '}— they go directly to Stripe or Razorpay.</td>
                </tr>
                <tr>
                  <td data-label="Data">Technical</td>
                  <td data-label="Detail">IP address, browser and device information, and product usage events, used for security and to
                    keep the service working.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>From the business's own customers, on the business's behalf</h3>
          <div className="legal-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Data">Contact records</td>
                  <td data-label="Detail">Phone number, name, Instagram username and Instagram-scoped ID, email if provided, plus any tags,
                    notes and custom fields the business adds.</td>
                </tr>
                <tr>
                  <td data-label="Data">Message content</td>
                  <td data-label="Detail">The full text of WhatsApp and Instagram messages sent and received, in both directions, including
                    reactions, edits and deletions.</td>
                </tr>
                <tr>
                  <td data-label="Data">Media</td>
                  <td data-label="Detail">Images, audio, video and documents exchanged in conversations. Instagram media is <strong>copied
                      to our storage at the moment it arrives</strong>, because Instagram's own links expire.</td>
                </tr>
                <tr>
                  <td data-label="Data">Conversation metadata</td>
                  <td data-label="Detail">Timestamps, delivery and read status, which channel a conversation arrived on, and which ad or
                    link referred it.</td>
                </tr>
                <tr>
                  <td data-label="Data">Commerce and pipeline</td>
                  <td data-label="Detail">Orders, products, deals and pipeline stages the business records against a contact.</td>
                </tr>
                <tr>
                  <td data-label="Data">Lead form submissions</td>
                  <td data-label="Detail">Whatever fields a business's Facebook or Instagram lead form collects, pulled in as contacts.</td>
                </tr>
                <tr>
                  <td data-label="Data">Website widget</td>
                  <td data-label="Detail">Conversations started from the chat widget on a business's own site.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="meta">
          <h2>3. Data from Meta platforms</h2>
          <p>Because Meta requires apps to be specific about this, here is exactly what we take from each Meta surface
            and why.</p>

          <div className="legal-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Surface</th>
                  <th>What we access</th>
                  <th>Why</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Surface">WhatsApp Business Platform</td>
                  <td data-label="What we access">WhatsApp Business Account and phone number IDs; inbound and outbound message content and media;
                    delivery and read receipts; message templates and their approval status; messaging tier and quality
                    rating.</td>
                  <td data-label="Why">To run a shared team inbox, send and receive messages, and show the business the state of their
                    own account.</td>
                </tr>
                <tr>
                  <td data-label="Surface">Instagram</td>
                  <td data-label="What we access">The professional account's ID, username and profile picture; direct message content and media;
                    message reactions, read receipts and story-reply context; comments on the business's own posts.</td>
                  <td data-label="Why">To bring Instagram DMs into the same inbox as WhatsApp and let the business moderate and reply to
                    comments.</td>
                </tr>
                <tr>
                  <td data-label="Surface">Facebook Pages / Lead Ads</td>
                  <td data-label="What we access">The list of Pages the user administers, Page name and picture, and lead form submissions.</td>
                  <td data-label="Why">So the business can choose which Page to sync, and so new leads become CRM contacts automatically.{' '}
                  </td>
                </tr>
                <tr>
                  <td data-label="Surface">Meta Ads (Marketing API)</td>
                  <td data-label="What we access">Business portfolios, ad accounts, campaigns, ad sets, ads and creatives; daily aggregate
                    performance figures such as spend, clicks and impressions.</td>
                  <td data-label="Why">To let the business create and manage ads from our dashboard, and to report what those ads cost
                    and produced alongside the deals they generated.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="legal-card">
            <p><strong>Access tokens.</strong> Connecting any of these stores an access token so we can act on the
              business's behalf. Every token is encrypted with AES-256-GCM before it is written to the database, is
              never returned to any browser, and is <strong>deleted the moment the business disconnects the
                channel</strong> or removes our app from their Meta settings.</p>
          </div>
        </section>

        <section id="why">
          <h2>4. Why we use it</h2>
          <ul>
            <li><strong>To provide the service</strong> — deliver messages, run the inbox, execute the automations and
              flows a business has built, sync ad performance. This is the performance of our contract with the
              business.</li>
            <li><strong>To keep it secure</strong> — detect abuse, verify webhook signatures, rate-limit, and
              investigate incidents. This is our legitimate interest in a safe service.</li>
            <li><strong>To bill</strong> — process subscriptions and comply with tax and accounting law.</li>
            <li><strong>To support</strong> — answer questions, which sometimes means an authorised engineer looking at
              a specific record with the business's knowledge.</li>
          </ul>

          <div className="legal-card">
            <p><strong>What we never do:</strong> we do not sell personal data, we do not share it with advertisers or
              data brokers, we do not use message content for our own marketing, and we do not use it to build profiles
              of the people a business talks to.</p>
          </div>
        </section>

        <section id="ai">
          <h2>5. AI features</h2>
          <p>Converse360 includes an optional AI assistant. A business chooses which of two ways it runs on, and the
            choice decides where conversation content goes.</p>

          <div className="legal-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Mode</th>
                  <th>Whose key</th>
                  <th>What that means for your data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Mode"><strong>Built-in AI</strong><br />(the default)</td>
                  <td data-label="Whose key">Ours — a Converse360 account with <strong>Google Gemini</strong></td>
                  <td data-label="What that means for your data">When the assistant is used, the conversation content it needs is sent to Google under <em>our</em>
                    {' '}agreement with Google, and the usage is metered against the workspace's credit balance. We use paid
                    API tiers, whose terms prohibit the provider from using the content to train or improve its models.{' '}
                  </td>
                </tr>
                <tr>
                  <td data-label="Mode"><strong>Your own key</strong></td>
                  <td data-label="Whose key">Yours — OpenAI, Anthropic or Google</td>
                  <td data-label="What that means for your data">The business supplies its own API key, which we store encrypted, and content goes <em>directly to
                      that provider under the business's own agreement with them</em> — never through an account of
                    ours, and nothing is metered.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p><strong>The assistant only runs when it is switched on.</strong> A workspace that never enables it sends no
            conversation content to any AI provider in either mode. A workspace that does enable it should assume that
            the messages the assistant reads in order to answer are sent to the provider for that mode.</p>

          <p>Businesses may also upload documents (PDF, Word, plain text) or point us at a public web page to build the
            assistant's knowledge base. That content is stored in the workspace, converted into search embeddings, and
            used only to answer that workspace's own conversations.</p>

          <div className="legal-card">
            <p><strong>We do not train AI models on your data.</strong> We do not use WhatsApp Business data, Instagram
              data, message content, contact records or anything derived from them to train, fine-tune or develop any
              machine-learning model — including in aggregated or anonymised form. This is both our policy and a
              requirement of Meta's WhatsApp Business Solution Terms.</p>
          </div>
        </section>

        <section id="google">
          <h2>6. Google services integration</h2>
          <p>Converse360 allows businesses to optionally connect their Google account to access specific Google
            services. These integrations are entirely opt-in: no Google data is accessed unless a business explicitly
            authorises the connection from within the Converse360 settings.</p>

          <div className="legal-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Google service</th>
                  <th>Data accessed</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Google service"><strong>Gmail</strong></td>
                  <td data-label="Data accessed"><code>gmail.send</code> — send an email as the connected account. <strong>Converse360 cannot read,
                      search, label or delete mail</strong>, and does not request any scope that would allow it. Your
                    mailbox is never downloaded or stored.</td>
                  <td data-label="Purpose">To send follow-ups, confirmations and reminders from the business's own address as part of a
                    workflow the business built.</td>
                </tr>
                <tr>
                  <td data-label="Google service"><strong>Google Calendar</strong></td>
                  <td data-label="Data accessed"><code>calendar.events</code>, <code>calendar.freebusy</code> — create, update, delete and search
                    calendar events, and read free/busy times.</td>
                  <td data-label="Purpose">To book appointments with customers from a conversation and to check whether a slot is free before
                    offering it.</td>
                </tr>
                <tr>
                  <td data-label="Google service"><strong>Google Sheets</strong></td>
                  <td data-label="Data accessed"><code>spreadsheets</code> — append, find and update rows in a spreadsheet the business supplies
                    the link to, and create a new spreadsheet on request. <strong>Converse360 does not request Drive
                      access and cannot list or browse your files.</strong></td>
                  <td data-label="Purpose">To log leads, orders and conversation outcomes for reporting, and to look up a row to enrich a
                    contact record.</td>
                </tr>
                <tr>
                  <td data-label="Google service"><strong>Google Meet</strong></td>
                  <td data-label="Data accessed"><code>meetings.space.created</code> — create a new meeting space. This scope grants access only to
                    meetings Converse360 itself creates; existing meetings, recordings and transcripts are not
                    accessible.</td>
                  <td data-label="Purpose">To generate a meeting link to share with a customer in a conversation.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>These four are the only Google scopes Converse360 requests. All of them are classified by Google as{' '}
            <em>sensitive</em>; Converse360 deliberately does not request any <em>restricted</em> scope, including Gmail
            read access and any Google Drive scope.{' '}
          </p>

          <div className="legal-card">
            <p><strong>How we use Google data.</strong> Data obtained through Google APIs is used only to provide the
              specific feature you have enabled. It is not used for advertising, not shared with any third party for
              their own purposes, and not used to train or improve any AI model. We do not combine Google user data with
              data obtained from other sources for profiling purposes.</p>
          </div>

          <div className="legal-card">
            <p><strong>Revoking access.</strong> You can disconnect a Google integration at any time from the
              Converse360 Settings page. Doing so immediately revokes our access token and stops any further access to
              your Google data. You can also revoke access directly from your <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener">Google Account
                permissions page</a>.</p>
          </div>

          <p>Converse360's use of Google APIs complies with the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener">Google API Services User Data Policy</a>, including the Limited Use requirements.</p>
        </section>

        <section id="share">
          <h2>7. Who we share it with</h2>
          <p>We use a small number of service providers. Each processes data only to deliver its part of the service.{' '}
          </p>

          <div className="legal-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>What it handles</th>
                  <th>Where</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Provider">Meta Platforms</td>
                  <td data-label="What it handles">WhatsApp, Instagram, Facebook and Ads message and campaign delivery</td>
                  <td data-label="Where">Global</td>
                </tr>
                <tr>
                  <td data-label="Provider">Supabase</td>
                  <td data-label="What it handles">Database, authentication and file storage</td>
                  <td data-label="Where">Seoul, South Korea (AWS <code>ap-northeast-2</code>)</td>
                </tr>
                <tr>
                  <td data-label="Provider">Stripe / Razorpay</td>
                  <td data-label="What it handles">Subscription payments and card processing</td>
                  <td data-label="Where">Global / India</td>
                </tr>
                <tr>
                  <td data-label="Provider">Google (Gemini)</td>
                  <td data-label="What it handles">AI replies in <strong>built-in AI</strong> mode, on our key, under our contract with Google</td>
                  <td data-label="Where">Global</td>
                </tr>
                <tr>
                  <td data-label="Provider">OpenAI, Anthropic or Google</td>
                  <td data-label="What it handles">AI replies — <strong>only</strong> if the business has added its own key, and under that
                    business's own contract with the provider</td>
                  <td data-label="Where">Global</td>
                </tr>
                <tr>
                  <td data-label="Provider">Hostinger</td>
                  <td data-label="What it handles">Application servers and queues</td>
                  <td data-label="Where">Mumbai, India</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>We also disclose data where the law requires it — a valid court order or a binding request from a competent
            authority — and to a successor entity in a merger or acquisition, in which case this policy travels with the
            data.</p>
        </section>

        <section id="send-meta">
          <h2>8. What we send to Meta</h2>
          <p>Mostly nothing beyond the messages a business chooses to send. There is one exception worth stating
            plainly:</p>

          <div className="legal-card">
            <p><strong>Custom audiences.</strong> If a business builds an advertising audience from its CRM contacts,
              the customer identifiers in that audience — phone numbers, and email addresses if used — are{' '}
              <strong>hashed with SHA-256 on our servers before they are transmitted</strong>. Meta never receives them
              in plain text. The audience is flagged to Meta as the advertiser's own contacts, collected with consent.
              This only happens when a business deliberately creates an audience; it is never automatic.{' '}
            </p>
          </div>

          <p>Aggregate advertising performance data we read back from Meta — spend, clicks, impressions per campaign per
            day — contains no personal data.</p>
        </section>

        <section id="retention">
          <h2>9. How long we keep it</h2>
          <div className="legal-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Retention</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Data">Messages, contacts and conversation history</td>
                  <td data-label="Retention">For as long as the workspace is active, then <strong>90 days after the subscription ends</strong>,
                    after which it is permanently deleted.</td>
                </tr>
                <tr>
                  <td data-label="Data">Access tokens for Meta channels</td>
                  <td data-label="Retention">Deleted immediately on disconnection, deauthorisation, or account closure.</td>
                </tr>
                <tr>
                  <td data-label="Data">Account and workspace records</td>
                  <td data-label="Retention">90 days after closure.</td>
                </tr>
                <tr>
                  <td data-label="Data">Billing and tax records</td>
                  <td data-label="Retention">Kept for as long as Indian tax and company law requires — <strong>up to 8 years</strong> from the
                    end of the relevant financial year — even after the account closes.</td>
                </tr>
                <tr>
                  <td data-label="Data">Advertising records (which campaigns ran, what they spent)</td>
                  <td data-label="Retention">Retained as the business's own financial history. These contain no personal data.</td>
                </tr>
                <tr>
                  <td data-label="Data">Security and audit logs</td>
                  <td data-label="Retention">90 days, unless a longer period is needed to investigate a specific incident.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>A business can delete individual contacts, conversations or messages from inside the product at any time,
            without waiting for any of the above.</p>
        </section>

        <section id="delete">
          <h2>10. Deleting your data</h2>

          <h3>If you are a Converse360 customer</h3>
          <p>Disconnect a channel from Settings to remove its tokens immediately. To delete the whole workspace, email{' '}
            <a href="mailto:support@converse360.in">support@converse360.in</a> from the address on the account. We
            action verified requests within <strong>30 days</strong>.{' '}
          </p>

          <h3>If you messaged a business that uses Converse360</h3>
          <p>That business controls your data. Contact them first. If you cannot reach them, or they do not respond,
            write to us at <a href="mailto:support@converse360.in">support@converse360.in</a> with enough detail to
            identify the records — the business's name and the phone number or Instagram handle you used — and we will
            locate and delete them.</p>

          <h3>If you removed our app from your Meta or Instagram settings</h3>
          <p>Meta notifies us automatically, and we delete the stored connection and its access tokens without you
            needing to do anything else. Meta will show you a confirmation code and a link to a status page confirming
            this.</p>
        </section>

        <section id="security">
          <h2>11. How we protect it</h2>
          <ul>
            <li>All traffic is encrypted in transit over HTTPS.</li>
            <li>Every third-party access token, API key and webhook secret is encrypted at rest with{' '}
              <strong>AES-256-GCM</strong>. Tokens are never sent to a browser.{' '}
            </li>
            <li>Every database query is scoped to a single workspace, enforced both by row-level security policies and
              by explicit checks in application code. One business cannot read another's data.</li>
            <li>Inbound webhooks are rejected unless their HMAC signature verifies against the raw request body, so a
              forged message cannot enter the system.</li>
            <li>Requests to URLs supplied by users — page crawling, custom API actions — are filtered to block access to
              internal network addresses.</li>
            <li>Access to production data by our staff is limited to what support requires and is logged.</li>
          </ul>
          <p>No system is perfectly secure. If a breach affects your personal data we will notify you and the relevant
            regulator within the timeframes the law sets.</p>
        </section>

        <section id="rights">
          <h2>12. Your rights</h2>
          <p>Depending on where you live, you can ask us to:</p>
          <ul>
            <li>tell you what personal data we hold about you, and give you a copy;</li>
            <li>correct anything inaccurate;</li>
            <li>delete it;</li>
            <li>restrict or object to how we use it;</li>
            <li>port it to another service in a machine-readable format;</li>
            <li>withdraw consent, where we relied on consent.</li>
          </ul>
          <p>Email <a href="mailto:support@converse360.in">support@converse360.in</a>. We respond within 30 days and do
            not charge for reasonable requests. We may need to verify your identity first — the alternative is a
            deletion endpoint anyone can point at anyone.</p>
          <p style={{ fontSize: "14px", color: "#6B726E" }}>If we act as a processor rather than a controller for the data in
            question (see <a href="#roles">§1</a>), we will forward your request to the business that controls it and
            support them in answering it.</p>
        </section>

        <section id="transfers">
          <h2>13. International transfers</h2>
          <p>We are based in India, but our providers operate globally, so your data is processed outside India.
            Specifically:</p>
          <ul>
            <li>our <strong>application servers and queues</strong> are in <strong>Mumbai, India</strong>;</li>
            <li>our <strong>database and uploaded files</strong> are in <strong>Seoul, South Korea</strong>, on
              Supabase's AWS <code>ap-northeast-2</code> region — this includes contacts, messages and media;</li>
            <li><strong>Meta, Stripe, Google and any AI provider</strong> operate globally and may process data in the
              United States, the European Union and elsewhere.</li>
          </ul>
          <p>Where data leaves a jurisdiction that restricts transfers, we rely on the transfer terms in each provider's
            data processing agreement — Standard Contractual Clauses or the provider's equivalent mechanism — and we
            require protection equivalent to this policy from every provider we use.</p>
        </section>

        <section id="children">
          <h2>14. Children</h2>
          <p>Converse360 is a business tool and is not directed at children. We do not knowingly collect personal data
            from anyone under <strong>18</strong>, the age at which India's Digital Personal Data Protection Act 2023
            stops treating a person as a child. If you believe a child's data has reached us, tell us and we will delete
            it.</p>
        </section>

        <section id="changes">
          <h2>15. Changes to this policy</h2>
          <p>We update this page when the product changes. Material changes are announced in the app and by email to
            workspace owners at least <strong>30 days</strong> before they take effect. The "last updated" date at the
            top always reflects the current version.</p>
        </section>

        <section id="contact">
          <h2>16. Contact and complaints</h2>
          <p>
            <strong>Conceps Media Works</strong><br />
            <strong>Privacy enquiries and data requests:</strong> <a href="mailto:support@converse360.in">support@converse360.in</a><br />
            <strong>Postal address:</strong> No. 38/4, Hindustan College Road, Near Nava India, Sowripalayam,
            Coimbatore, Tamil Nadu – 641028, India<br />
            <strong>Grievance Officer (India, DPDP Act 2023):</strong> The Grievance Officer, Conceps Media Works, at
            the address above or <a href="mailto:support@converse360.in">support@converse360.in</a>
          </p>
          <p style={{ marginTop: "16px" }}>If you are unhappy with our response you can complain to your local data
            protection authority — in India, the Data Protection Board; in the EU or UK, your national supervisory
            authority.</p>
        </section>

      </main>
      <Footer />
    </PageShell>
  );
}
