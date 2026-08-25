/**
 * Landing page content — the DATA / EXTRA / FEATURE_TABS / DAILY_DATA /
 * CLIENTS / HERO_PHRASES constants from the source page's
 * `<script type="text/x-dc">` block, copied verbatim.
 *
 * The one edit is to `iconFile`: the source paths are page-relative
 * (`assets/icons/…`) and reach the DOM through a `{{ }}` binding, which the
 * converter's href rewriting never sees, so they are stored root-relative here.
 */

export type Direction = 'in' | 'out';

/** [direction, text] — or [direction, text, fileName, fileMeta] for an attachment */
export type Message = [Direction, string] | [Direction, string, string, string];

export interface Industry {
  name: string;
  blurb: string;
  points: string[];
  thread: Message[];
}

export interface Extra {
  metrics: [string, string][];
  note: string;
}

export interface FeatureTab {
  name: string;
  ico: string;
  iconFile: string;
  filter: string;
  /** One line telling a first-time visitor what this tab actually is. */
  blurb: string;
}

export interface DailyFeature {
  name: string;
  tagline: string;
  desc: string;
  bullets: string[];
}

export interface Client {
  name: string;
  company: string;
  initial: string;
  quote: string;
}

export const DATA: Industry[] = [
  { name: 'Retail & D2C', blurb: 'Turn every product question into an order without leaving the chat.',
    points: ['Share catalog, price and stock instantly', 'Recover abandoned carts with one broadcast', 'See which ad brought each order', 'Take payment without leaving the chat'],
    thread: [['in','Do you have this in size M?'],['out','Yes, size M is in stock — ₹1,890.'],['in','Can you deliver by Friday?'],['out','Yes. Shall I place the order?'],['in','Please do.'],['out','Order confirmed · #10428']] },
  { name: 'Education', blurb: 'Answer admission questions the moment a parent asks.',
    points: ['Course fees and dates answered instantly', 'Counsellor gets only serious enquiries', 'Follow up until the seat is confirmed', 'Share brochures and fee structures in one tap'],
    thread: [['in','Is the evening batch still open?'],['out','Yes — starts 2 September, 6 to 8 PM.'],['in','What is the fee?'],['out','₹24,000, payable in two parts. Want a call from a counsellor?'],['in','Yes, tomorrow morning.'],['out','Booked for 10 AM. Sending the details.'],['out','Fee structure and course dates are inside.','Admissions-2026.pdf','PDF · 480 KB']] },
  { name: 'Real Estate', blurb: 'Qualify site-visit enquiries while the buyer is still interested.',
    points: ['Budget, location and timeline captured in chat', 'Site visits booked automatically', 'Every enquiry becomes a tracked deal', 'Send floor plans and location pins instantly'],
    thread: [['in','Is the 2BHK in Anna Nagar available?'],['out','Yes — 1,140 sq ft, ₹78L, ready to move.'],['in','Can I see it this week?'],['out','Saturday 11 AM or Sunday 4 PM?'],['in','Saturday works.'],['out','Booked. Sharing the location and floor plan.']] },
  { name: 'Healthcare', blurb: 'Fill appointment slots without the front desk phone ringing.',
    points: ['Appointment booking and reminders', 'Reports and prescriptions sent in chat', 'Sensitive cases handed to staff instantly', 'Automatic reminders cut no-shows'],
    thread: [['in','Is Dr. Menon available tomorrow?'],['out','Yes — 11:30 AM or 5 PM.'],['in','11:30 please.'],['out','Confirmed. Consultation ₹600, please arrive 10 minutes early.'],['in','Thank you.'],['out','Sending a reminder tomorrow morning.']] },
  { name: 'Finance', blurb: 'Move enquiries to documents to disbursal, in one thread.',
    points: ['Eligibility questions answered instantly', 'Documents collected in chat', 'Handover to an advisor when needed', 'Every conversation stays on record'],
    thread: [['in','What documents for a business loan?'],['out','PAN, GST returns and six months of statements.'],['in','Can I send them here?'],['out','Yes — attach them in this chat.'],['in','Sent.','GST-Returns-2025.pdf','PDF · 1.2 MB'],['out','Received. An advisor will call you within an hour.']] },
  { name: 'Logistics', blurb: 'Stop answering "where is my order" one message at a time.',
    points: ['Live tracking replies, day and night', 'Pickup requests raised in chat', 'Escalations routed to the right branch', 'Delivery updates go out on their own'],
    thread: [['in','Where is my shipment?'],['out','Out for delivery — arriving today before 6 PM.'],['in','Can you deliver tomorrow instead?'],['out','Done, rescheduled to tomorrow 10 AM to 1 PM.'],['in','Great, thanks.'],['out','You will get a message when the driver starts.']] },
];

export const EXTRA: Record<string, Extra> = {
  'Retail & D2C': { metrics: [['3 sec','Average first reply'],['24/7','Catalog open'],['1 place','Every customer enquiry']],
    note: 'Product questions, sizes, delivery dates and payment all happen in the same chat, so a browsing customer never has to open another app to buy.' },
  'Education': { metrics: [['3 sec','Average first reply'],['24/7','Admission desk'],['1 place','Every customer enquiry']],
    note: 'Parents ask about fees, batches and documents at night and on weekends. The agent answers then, and your counsellors start the day with only the serious ones.' },
  'Real Estate': { metrics: [['3 sec','Average first reply'],['24/7','Site visit booking'],['1 place','Every customer enquiry']],
    note: 'Budget, locality and possession timeline are captured before anyone picks up the phone, so your sales team spends its day on buyers who are ready to see the property.' },
  'Healthcare': { metrics: [['3 sec','Average first reply'],['24/7','Appointment desk'],['1 place','Every customer enquiry']],
    note: 'Slots, fees and directions are answered instantly, reminders go out on their own, and anything clinical is handed straight to your staff.' },
  'Finance': { metrics: [['3 sec','Average first reply'],['24/7','Eligibility answers'],['1 place','Every customer enquiry']],
    note: 'Documents arrive in the same conversation as the enquiry, so nothing is chased over email and an advisor picks up with the full history in front of them.' },
  'Logistics': { metrics: [['3 sec','Average first reply'],['24/7','Tracking replies'],['1 place','Every customer enquiry']],
    note: 'Tracking, rescheduling and pickup requests are handled automatically, and only genuine escalations reach the branch team.' },
};

/**
 * The "Everything in one place" tab strip. `filter` is the CSS filter chain
 * that recolours the flat SVG icon to the tab's own colour when it is selected;
 * `ico` is that colour, and also tints the one-line brief under the row.
 */
export const FEATURE_TABS: FeatureTab[] = [
  { name: 'Unified Inbox', blurb: 'Bring every customer conversation together and give your team one place to act', ico: '#7C5CE0', iconFile: '/assets/icons/Unified%20box.svg', filter: 'brightness(0) saturate(100%) invert(41%) sepia(35%) saturate(2250%) hue-rotate(218deg) brightness(96%) contrast(92%)' },
  { name: 'Chatbot Builder', blurb: 'Design smarter conversations that respond, guide, qualify, and convert automatically', ico: '#D6336C', iconFile: '/assets/icons/chatbot%20builder.svg', filter: 'brightness(0) saturate(100%) invert(33%) sepia(85%) saturate(1485%) hue-rotate(314deg) brightness(91%) contrast(92%)' },
  { name: 'WhatsApp Catalog', blurb: 'Showcase your products where your customers are already talking to you', ico: '#00AB56', iconFile: '/assets/icons/Whatsapp%20catlog.svg', filter: 'brightness(0) saturate(100%) invert(53%) sepia(87%) saturate(1450%) hue-rotate(125deg) brightness(94%) contrast(101%)' },
  { name: 'WhatsApp Store', blurb: 'Let customers shop, pay, and track orders without leaving the conversation', ico: '#099250', iconFile: '/assets/icons/Whatsapp%20store.svg', filter: 'brightness(0) saturate(100%) invert(37%) sepia(87%) saturate(1281%) hue-rotate(135deg) brightness(94%) contrast(101%)' },
  { name: 'Converse360 Agent', blurb: 'Let AI handle conversations instantly while your team steps in when it matters', ico: '#2C7BE5', iconFile: '/assets/icons/Converse%20agent.svg', filter: 'brightness(0) saturate(100%) invert(41%) sepia(86%) saturate(1476%) hue-rotate(193deg) brightness(97%) contrast(92%)' },
];

/** The grey filter every unselected feature tab icon carries. */
export const FEATURE_ICON_OFF =
  'brightness(0) saturate(100%) invert(45%) sepia(8%) saturate(308%) hue-rotate(101deg) brightness(94%) contrast(89%)';

export const DAILY_DATA: DailyFeature[] = [
  {
    name: 'Broadcasts',
    tagline: 'Send one message to thousands of customers at once.',
    desc: 'Announce new arrivals, promos, or re-engage past buyers on WhatsApp. Track delivery, open rates, and replies in real time.',
    bullets: [
      'Send one message to thousands of customers at once.',
      'Announce new arrivals or offers, and see who opened it.',
    ],
  },
  {
    name: 'Contacts & Segments',
    tagline: 'Group customers by interest, and message the right ones.',
    desc: 'Automatically group contacts based on intent, purchase history, or ad source. Segments auto-update as people engage.',
    bullets: [
      'Group customers by interest, and message the right ones.',
      'Segments update themselves as people buy and reply.',
    ],
  },
  {
    name: 'Ad Attribution',
    tagline: 'See exactly which ads turned into real sales.',
    desc: 'Track every lead back to its exact Meta Ad campaign, QR code, or website link. See revenue per ad unit instantly.',
    bullets: [
      'See exactly which ads turned into real sales.',
      'Every chat from an ad carries that ad’s name with it.',
    ],
  },
  {
    name: 'Sales Pipeline',
    tagline: 'Every chat becomes a deal you can track.',
    desc: 'Visual drag-and-drop CRM stages inside your WhatsApp workflow. Move leads from new enquiry to closed deal seamlessly.',
    bullets: [
      'Every chat becomes a deal you can track.',
      'Move a deal from new to won without leaving the inbox.',
    ],
  },
  {
    name: 'Official WhatsApp Setup',
    tagline: 'Real Meta API — no shortcuts, no risk to your number.',
    desc: 'Official WhatsApp Business API integration with verified green tick, multi-agent inbox, broadcast approval, and catalog.',
    bullets: [
      'Real Meta API — no shortcuts, no risk to your number.',
      'Green tick, business profile and catalog, set up by us.',
    ],
  },
  {
    name: 'Website Widget',
    tagline: 'One snippet, and your website gets AI-powered chat.',
    desc: 'Embed a smart chat widget on your website to capture high-intent visitors and transition conversations directly to WhatsApp.',
    bullets: [
      'One snippet, and your website gets AI-powered chat.',
      'Visitors keep the conversation on WhatsApp after they leave.',
    ],
  },
];

export const CLIENTS: Client[] = [
  { name: 'Mahesh', company: 'Dffrnt', initial: 'M', quote: 'We used to lose enquiries between WhatsApp and Instagram. Now everything sits in one place.' },
  { name: 'Selva', company: 'TMR', initial: 'S', quote: 'The AI answers the routine questions all day. My team only picks up the conversations that actually need a person.' },
  { name: 'Pradeep', company: 'Conceps', initial: 'P', quote: 'For the first time we can see which ad brought which order. That alone changed how we spend.' },
];

export const HERO_PHRASES: string[] = ['More sales.', 'More revenue.', 'More Profits.'];
