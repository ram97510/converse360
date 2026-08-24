/**
 * Industries — the six verticals behind the header's "Industries" mega menu
 * and the `/industries/[slug]` pages.
 *
 * The conversational content (blurb, capability points, sample thread, headline
 * metrics) is not restated here: it already exists in `landing-data.ts`, which
 * drives the landing page's industry picker. Both surfaces read the same
 * constants so a copy change lands in one place. What lives here is only what
 * the standalone page needs on top of that — the slug, the menu label, the
 * accent tint, the hero copy, the problem/answer pairs, the workflow and the
 * FAQ.
 */

import { DATA, EXTRA, type Industry, type Extra, type Message } from './landing-data';

export type IndustryIconKey =
  | 'retail'
  | 'education'
  | 'realestate'
  | 'healthcare'
  | 'finance'
  | 'logistics';

export interface IndustryStep {
  title: string;
  body: string;
}

export interface IndustryQA {
  q: string;
  a: string;
}

export interface IndustryDef {
  /** URL segment under /industries */
  slug: string;
  /** Must match a `name` in landing-data's DATA / EXTRA. */
  name: string;
  /** Short label used in the mega menu. */
  menuLabel: string;
  icon: IndustryIconKey;
  /** Accent tint for the icon tile and page washes — a soft, on-brand hue. */
  tint: string;
  tintSoft: string;
  heroEyebrow: string;
  /** Rendered as: {heroTitle} <em>{heroTitleAccent}</em> {heroTitleTail} */
  heroTitle: string;
  heroTitleAccent: string;
  heroTitleTail: string;
  heroBody: string;
  /** What goes wrong today, and what Converse360 does about it. */
  problems: IndustryStep[];
  /** The chat-to-outcome path, four steps. */
  workflow: IndustryStep[];
  faqs: IndustryQA[];
}

export const INDUSTRIES: IndustryDef[] = [
  {
    slug: 'retail-d2c',
    name: 'Retail & D2C',
    menuLabel: 'Retail & D2C',
    icon: 'retail',
    tint: '#00AB56',
    tintSoft: '#E7F6EE',
    heroEyebrow: 'Retail & D2C',
    heroTitle: 'Turn every product question into',
    heroTitleAccent: 'an order',
    heroTitleTail: 'before the customer leaves the chat.',
    heroBody:
      'Shoppers ask about size, price and delivery at 11 PM and buy from whoever answers first. Converse360 keeps your catalog, stock and checkout inside WhatsApp, so a browsing customer never has to open another app to place the order.',
    problems: [
      {
        title: 'Enquiries arrive after hours and go cold',
        body: 'An always-on agent answers price, size and availability the moment the message lands, then holds the conversation until the order is placed.',
      },
      {
        title: 'Carts are abandoned with no way back',
        body: 'One broadcast brings the shopper back to the same thread, with the product they left behind already in front of them.',
      },
      {
        title: 'Nobody knows which ad produced the sale',
        body: 'Click-to-WhatsApp ads carry their source into the conversation, so every order is traced to the campaign that paid for it.',
      },
    ],
    workflow: [
      { title: 'Customer taps your ad', body: 'A click-to-WhatsApp ad or your website widget opens a thread with the product already in context.' },
      { title: 'The agent answers instantly', body: 'Price, sizes, stock, delivery window and returns — pulled from your catalog, replied to in seconds.' },
      { title: 'Order is confirmed in chat', body: 'A payment link goes out in the same thread and the order is written back to your system on payment.' },
      { title: 'Delivery updates run themselves', body: 'Dispatch, tracking and delivery confirmations go out automatically, and replies come back to the same inbox.' },
    ],
    faqs: [
      { q: 'Can it show my full product catalog on WhatsApp?', a: 'Yes. Your catalog is synced to WhatsApp, so customers browse products, prices and images without leaving the conversation.' },
      { q: 'Does it take payments?', a: 'Payment links are sent inside the chat and the order is marked paid automatically once the customer completes it.' },
      { q: 'Will it work with the store platform we already use?', a: 'Orders, stock and contacts sync both ways with common commerce platforms, and anything else connects over our API.' },
    ],
  },
  {
    slug: 'education',
    name: 'Education',
    menuLabel: 'Education',
    icon: 'education',
    tint: '#2C7BE5',
    tintSoft: '#E8F1FD',
    heroEyebrow: 'Education',
    heroTitle: 'Answer admission questions',
    heroTitleAccent: 'the moment',
    heroTitleTail: 'a parent asks them.',
    heroBody:
      'Parents compare institutions at night and on weekends, and the first clear answer usually wins the seat. Converse360 handles fees, batches, eligibility and documents around the clock, and hands your counsellors only the enquiries worth a phone call.',
    problems: [
      {
        title: 'Enquiries peak when the office is closed',
        body: 'Fee structures, batch dates and eligibility are answered instantly at any hour, and the brochure goes out in the same reply.',
      },
      {
        title: 'Counsellors spend the day on cold leads',
        body: 'The agent qualifies course, budget and timeline in chat, so the team calls only parents who are ready to enrol.',
      },
      {
        title: 'Enquiries are lost between forms and phone calls',
        body: 'Every conversation becomes a tracked application with its full history, from first question to confirmed seat.',
      },
    ],
    workflow: [
      { title: 'Parent asks about a course', body: 'From an ad, your website widget or a QR code on a printed brochure.' },
      { title: 'The agent qualifies the enquiry', body: 'Course, batch, budget and start date are captured in a natural conversation.' },
      { title: 'A counsellor call is booked', body: 'The parent picks a slot in chat and the counsellor gets the full thread before dialling.' },
      { title: 'Follow-ups run until admission', body: 'Reminders for documents, deadlines and fee instalments go out on their own.' },
    ],
    faqs: [
      { q: 'Can it send brochures and fee structures?', a: 'Yes. PDFs, fee tables and prospectuses are sent inside the chat, and you can see who opened them.' },
      { q: 'Does it handle multiple courses or campuses?', a: 'Each course, batch and campus can have its own answers, counsellor routing and follow-up sequence.' },
      { q: 'What happens to enquiries the agent cannot answer?', a: 'They are handed to a counsellor in the shared inbox with the whole conversation attached.' },
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    menuLabel: 'Real Estate',
    icon: 'realestate',
    tint: '#7C5CE0',
    tintSoft: '#EFEBFC',
    heroEyebrow: 'Real Estate',
    heroTitle: 'Qualify site-visit enquiries while the buyer',
    heroTitleAccent: 'is still interested',
    heroTitleTail: '.',
    heroBody:
      'Property enquiries lose their heat within the hour. Converse360 captures budget, locality and possession timeline in chat, books the site visit, and sends the floor plan and location pin — before your sales team has picked up the phone.',
    problems: [
      {
        title: 'Portal leads go stale before anyone calls',
        body: 'The agent replies in seconds with availability, configuration and price, and keeps the buyer talking.',
      },
      {
        title: 'Sales teams chase unqualified walk-ins',
        body: 'Budget, preferred locality, loan status and timeline are captured up front, so only serious buyers reach the site.',
      },
      {
        title: 'Floor plans and directions get lost in email',
        body: 'Plans, price sheets and a location pin go out inside the same thread the buyer is already reading.',
      },
    ],
    workflow: [
      { title: 'Buyer enquires about a project', body: 'From a listing portal, an ad, or the widget on your project microsite.' },
      { title: 'The agent qualifies the buyer', body: 'Configuration, budget, locality and possession timeline, captured conversationally.' },
      { title: 'Site visit is booked', body: 'The buyer picks a slot, gets the floor plan and location pin, and receives a reminder before the visit.' },
      { title: 'The deal is tracked to close', body: 'Every enquiry sits in a pipeline stage with its full chat history for the sales manager to review.' },
    ],
    faqs: [
      { q: 'Can it handle several projects at once?', a: 'Yes. Each project has its own inventory, pricing, media and routing rules.' },
      { q: 'Does it integrate with our CRM?', a: 'Qualified enquiries are pushed into your CRM as they happen, with the conversation attached.' },
      { q: 'Can channel partners use the same system?', a: 'Partners can be given their own numbers and inbox access while reporting rolls up to you.' },
    ],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    menuLabel: 'Healthcare',
    icon: 'healthcare',
    tint: '#E1306C',
    tintSoft: '#FCEAF1',
    heroEyebrow: 'Healthcare',
    heroTitle: 'Fill appointment slots without the front desk',
    heroTitleAccent: 'phone ringing',
    heroTitleTail: '.',
    heroBody:
      'Patients ask about timings, fees and directions all day, and every call takes a receptionist away from the person standing in front of them. Converse360 books appointments, sends reminders and delivers reports in chat, and routes anything clinical straight to your staff.',
    problems: [
      {
        title: 'The front desk is buried in routine calls',
        body: 'Timings, fees, directions and doctor availability are answered automatically, day and night.',
      },
      {
        title: 'No-shows leave slots empty',
        body: 'Automatic reminders the day before and the morning of the appointment cut no-shows sharply.',
      },
      {
        title: 'Reports and prescriptions are chased over phone',
        body: 'Documents are delivered in the patient’s own thread, where they can find them again later.',
      },
    ],
    workflow: [
      { title: 'Patient messages the clinic', body: 'From your website, a Google listing, or a number printed on the prescription pad.' },
      { title: 'The agent finds a slot', body: 'Doctor, department and available times are offered, and the booking is confirmed in chat.' },
      { title: 'Reminders go out on their own', body: 'Confirmation, a reminder the day before, and preparation instructions where the visit needs them.' },
      { title: 'Follow-up stays in one thread', body: 'Reports, prescriptions and review-visit reminders continue in the same conversation.' },
    ],
    faqs: [
      { q: 'Is patient information handled securely?', a: 'Conversations run on the official WhatsApp Business API with end-to-end encryption in transit, role-based inbox access and full audit history.' },
      { q: 'Can it escalate clinical questions to staff?', a: 'Anything clinical is handed to a human immediately, with the conversation history in view.' },
      { q: 'Does it work with our appointment system?', a: 'Slots and bookings sync with common practice-management systems, or over our API.' },
    ],
  },
  {
    slug: 'finance',
    name: 'Finance',
    menuLabel: 'Finance',
    icon: 'finance',
    tint: '#00828A',
    tintSoft: '#E6F8F9',
    heroEyebrow: 'Finance',
    heroTitle: 'Move enquiries to documents to disbursal, in',
    heroTitleAccent: 'one thread',
    heroTitleTail: '.',
    heroBody:
      'Eligibility questions, document collection and advisor handover normally sprawl across calls, email and courier. Converse360 keeps all of it in a single conversation that is time-stamped, searchable and ready for audit.',
    problems: [
      {
        title: 'Applicants drop off during document collection',
        body: 'The agent lists exactly what is needed, accepts files in chat, and nudges for whatever is still missing.',
      },
      {
        title: 'Eligibility questions tie up advisors',
        body: 'Common eligibility, rate and tenure questions are answered instantly, so advisors handle only real applications.',
      },
      {
        title: 'Records are scattered across channels',
        body: 'Every message, document and handover stays on one record you can pull up months later.',
      },
    ],
    workflow: [
      { title: 'Applicant asks about a product', body: 'Loan, policy or investment enquiry from an ad, your site, or a branch QR code.' },
      { title: 'Eligibility is checked in chat', body: 'Income, tenure and documentation requirements are explained in plain language.' },
      { title: 'Documents arrive in the thread', body: 'PDFs and images are uploaded in chat and filed against the application automatically.' },
      { title: 'An advisor takes over', body: 'Handover happens with the full history, so the applicant never repeats themselves.' },
    ],
    faqs: [
      { q: 'Can customers send documents through WhatsApp?', a: 'Yes. Files are attached in the conversation and stored against that customer’s record.' },
      { q: 'Is the conversation record usable for compliance?', a: 'Every message is time-stamped and retained, and the export includes attachments and agent handovers.' },
      { q: 'Can we restrict who sees a conversation?', a: 'Inbox access is role-based, so a conversation is visible only to the team that owns it.' },
    ],
  },
  {
    slug: 'logistics',
    name: 'Logistics',
    menuLabel: 'Logistics',
    icon: 'logistics',
    tint: '#B26A00',
    tintSoft: '#FBF0DF',
    heroEyebrow: 'Logistics',
    heroTitle: 'Stop answering',
    heroTitleAccent: '"where is my order"',
    heroTitleTail: 'one message at a time.',
    heroBody:
      'Tracking questions are the single largest share of support volume, and almost none of them need a human. Converse360 answers them from your live data, raises pickup requests, reschedules deliveries, and routes only genuine escalations to the branch.',
    problems: [
      {
        title: 'Tracking questions swamp the support team',
        body: 'Live status is answered from your system in seconds, at any hour, in the customer’s own thread.',
      },
      {
        title: 'Failed deliveries repeat because nobody could reach the customer',
        body: 'The customer reschedules in chat before the driver leaves, and the route is updated.',
      },
      {
        title: 'Escalations reach the wrong branch',
        body: 'Complaints are routed by pincode, branch or shipment type, so they land with the team that can act.',
      },
    ],
    workflow: [
      { title: 'Customer asks for status', body: 'Message the number on the docket, or reply to the dispatch notification.' },
      { title: 'The agent answers from live data', body: 'Current status, expected window and driver details, pulled from your tracking system.' },
      { title: 'Changes are made in chat', body: 'Reschedule a delivery, change an address, or raise a pickup without a phone call.' },
      { title: 'Escalations reach the right desk', body: 'Anything that needs a human is routed to the owning branch with the shipment history attached.' },
    ],
    faqs: [
      { q: 'Can it read our live tracking data?', a: 'Yes. The agent calls your tracking API and replies with the current status rather than a canned message.' },
      { q: 'Can customers raise pickup requests?', a: 'Pickups, reschedules and address changes are all raised in chat and pushed into your system.' },
      { q: 'Does it send proactive updates?', a: 'Dispatch, out-for-delivery and delivered notifications go out automatically, and replies land in your inbox.' },
    ],
  },
];

/** The mega menu and the /industries index read this. */
export const INDUSTRY_LINKS = INDUSTRIES.map((i) => ({
  slug: i.slug,
  href: `/industries/${i.slug}`,
  label: i.menuLabel,
  icon: i.icon,
  tint: i.tint,
  tintSoft: i.tintSoft,
}));

export type IndustryLink = (typeof INDUSTRY_LINKS)[number];

export function getIndustry(slug: string): IndustryDef | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

/** The landing-page record for the same vertical — blurb, points and thread. */
export function getIndustryContent(def: IndustryDef): { base: Industry; extra: Extra; thread: Message[] } {
  const base = DATA.find((d) => d.name === def.name);
  const extra = EXTRA[def.name];
  if (!base || !extra) {
    // A slug can only exist here if landing-data carries the same name; this
    // guard exists so a rename fails loudly at build rather than rendering
    // an empty section.
    throw new Error(`industries-data: "${def.name}" is missing from landing-data`);
  }
  return { base, extra, thread: base.thread };
}
