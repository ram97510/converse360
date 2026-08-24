/**
 * Industries — the six verticals behind the header's "Industries" mega menu
 * and the `/industries/[slug]` pages.
 *
 * All page copy lives here: hero, metric strip, the problem / capability /
 * workflow sections with their own per-industry headings, the FAQ and the
 * closing CTA. The only thing still read from `landing-data.ts` is the sample
 * WhatsApp thread, which the landing page's industry picker plays for the same
 * vertical — so a thread edit lands on both surfaces at once.
 */

import { DATA, type Message } from './landing-data';

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
  /** Must match a `name` in landing-data's DATA — that record carries the thread. */
  name: string;
  /** Short label used in the mega menu. */
  menuLabel: string;
  icon: IndustryIconKey;
  /** Accent tint for the icon tile and page washes — a soft, on-brand hue. */
  tint: string;
  tintSoft: string;
  heroEyebrow: string;
  /** Rendered as: {heroTitle} <em>{heroTitleAccent}</em>{heroTitleTail} */
  heroTitle: string;
  heroTitleAccent: string;
  heroTitleTail: string;
  heroBody: string;
  /** Reassurance line under the hero buttons. Retail & D2C ships without one. */
  heroNote?: string;
  /** The three-up strip under the hero: [value, label]. */
  metrics: [string, string][];
  /** What goes wrong today. */
  problemsTitle: string;
  problemsIntro: string;
  problems: IndustryStep[];
  /** What Converse360 does about it. */
  capabilitiesTitle: string;
  capabilitiesIntro: string;
  capabilities: string[];
  /** The chat-to-outcome path, four steps. */
  workflowTitle: string;
  workflow: IndustryStep[];
  faqTitle: string;
  faqs: IndustryQA[];
  ctaTitle: string;
  ctaBody: string;
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
    heroTitle: 'Keep the conversation going until the customer is',
    heroTitleAccent: 'ready to buy',
    heroTitleTail: '.',
    heroBody:
      'A product gets attention on Instagram. A question comes through WhatsApp. Someone checks your website and leaves without asking anything. Converse360 brings those interactions together, helps AI handle the routine questions, and gives your team the context to take the conversation further.',
    metrics: [
      ['3 sec', 'Average first reply'],
      ['24/7', 'Customer assistance'],
      ['1 place', 'Every customer conversation'],
    ],
    problemsTitle: 'Where retail conversations lose momentum',
    problemsIntro:
      "Interest can disappear quickly. The problem is rarely getting a message. It's what happens after it arrives.",
    problems: [
      {
        title: 'A customer wants an answer now',
        body: "They ask about a product, price, size, colour or availability outside your team's working hours. Waiting until tomorrow can mean losing the conversation today.",
      },
      {
        title: 'Interested customers get left behind',
        body: 'Not every enquiry turns into a purchase immediately. Without organised follow-ups, customers who showed genuine interest can easily disappear from your radar.',
      },
      {
        title: "Marketing and sales don't see the same picture",
        body: "Your campaign generates a message. Your team handles the enquiry. The sale happens later. When these activities sit separately, it's difficult to understand what actually worked.",
      },
    ],
    capabilitiesTitle: 'Give your retail team the full picture.',
    capabilitiesIntro:
      'Converse360 connects the conversations happening around your brand with the information your team needs to act on them.',
    capabilities: [
      'Bring WhatsApp, Instagram and website enquiries into one workspace',
      'Let AI handle repetitive product and customer questions',
      'Keep customer details, conversations and lead activity together',
      'Connect Meta campaigns with the conversations and leads they generate',
    ],
    workflowTitle: 'One customer. One connected conversation.',
    workflow: [
      {
        title: 'They discover something they like',
        body: 'A customer comes from an Instagram post, Meta campaign, your website or directly through WhatsApp. Wherever they start, the conversation has a place to go.',
      },
      {
        title: 'They get the information they need',
        body: 'AI can handle the questions that normally slow your team down — product details, pricing, availability, delivery information and other configured queries.',
      },
      {
        title: 'Your team sees the opportunity',
        body: 'Instead of searching through different platforms, your team can see the conversation and customer information together, making it easier to understand the enquiry.',
      },
      {
        title: 'The relationship continues',
        body: "Some customers need a quick answer. Others need recommendations, follow-ups or a human conversation. Your team can step in when it's time to move things forward.",
      },
    ],
    faqTitle: 'Questions retail & D2C teams ask',
    faqs: [
      {
        q: 'Can Converse360 handle enquiries from Instagram and WhatsApp together?',
        a: 'Yes. Supported conversations can be brought into one inbox, giving your team a single place to manage customer interactions instead of switching between platforms.',
      },
      {
        q: 'Can we control what the AI knows about our products?',
        a: 'Yes. You can provide the information, keywords and instructions the AI should use when responding to your customers.',
      },
      {
        q: 'Can we see which campaigns are bringing enquiries?',
        a: 'Yes. Meta campaign activity can be connected with the conversations and leads generated from those campaigns, giving your team more visibility into campaign performance.',
      },
    ],
    ctaTitle: "See Converse360 through your customers' eyes.",
    ctaBody:
      "Bring us the kind of enquiry your team handles every day. We'll show you how it can move from a simple product question to a conversation your team can actually act on.",
  },
  {
    slug: 'education',
    name: 'Education',
    menuLabel: 'Education',
    icon: 'education',
    tint: '#2C7BE5',
    tintSoft: '#E8F1FD',
    heroEyebrow: 'Education',
    heroTitle: 'From the first enquiry to enrolment, keep every',
    heroTitleAccent: 'conversation moving',
    heroTitleTail: '.',
    heroBody:
      'A parent wants to know about fees. A student asks about a course. Someone wants to check eligibility or the next admission date. These conversations can happen on WhatsApp, Instagram, your website or email. Converse360 brings them together, helps AI handle routine questions, and gives your admissions team a clear view of every enquiry.',
    heroNote: 'No setup fee · Live in days, not months',
    metrics: [
      ['3 sec', 'Average first reply'],
      ['24/7', 'Admission assistance'],
      ['1 place', 'Every student enquiry'],
    ],
    problemsTitle: 'Where admission enquiries get lost',
    problemsIntro:
      "Education enquiries don't always arrive when your counsellors are available. What happens between the question and the follow-up can make all the difference.",
    problems: [
      {
        title: 'Questions keep coming after office hours',
        body: "Course fees, eligibility, batch timings, documents and admission dates don't follow a timetable. When answers have to wait for the admissions team, students and parents may simply move on.",
      },
      {
        title: 'Counsellors spend time on basic questions',
        body: "Your team shouldn't have to repeat the same information throughout the day. The more time spent answering routine queries, the less time there is for serious applicants who need personal guidance.",
      },
      {
        title: "Enquiries don't always get the follow-up they need",
        body: 'A student may enquire today and take a few days to decide. Without a clear way to track the conversation and follow up, promising enquiries can quietly disappear.',
      },
    ],
    capabilitiesTitle: 'Give your admissions team more time for the conversations that matter.',
    capabilitiesIntro:
      'Converse360 helps education businesses manage enquiries, automate routine interactions and keep prospective students connected throughout the admission process.',
    capabilities: [
      'Bring WhatsApp, Instagram, website and other supported conversations into one workspace',
      'Let AI answer common questions about courses, fees, eligibility and admission details',
      'Keep student enquiries and conversation history organised for your team',
      'Follow up with prospective students instead of letting enquiries go cold',
    ],
    workflowTitle: 'From curiosity to classroom.',
    workflow: [
      {
        title: 'A student starts asking questions',
        body: 'They discover your institution, course or programme through an ad, social media, your website or a direct message and want to know more.',
      },
      {
        title: 'Answers are available straight away',
        body: "AI can respond to the questions you've configured — course information, eligibility, fees, documents, timings and other frequently requested details.",
      },
      {
        title: 'The enquiry becomes easier to manage',
        body: 'The conversation and student details remain together, giving counsellors the context they need before they step into the conversation.',
      },
      {
        title: 'Counsellors focus on serious prospects',
        body: 'When someone needs guidance, clarification or a personal conversation, your admissions team can take over and continue from where AI stopped.',
      },
    ],
    faqTitle: 'Questions education teams ask',
    faqs: [
      {
        q: 'Can the AI answer course and admission questions?',
        a: 'Yes. You can provide the information and instructions the AI should use, allowing it to handle common questions around courses, fees, eligibility, documents, timings and other configured topics.',
      },
      {
        q: 'Can enquiries from different channels come to one place?',
        a: 'Yes. Supported conversations from channels such as WhatsApp, Instagram and your website can be managed through one unified inbox.',
      },
      {
        q: 'Can our counsellors take over a conversation?',
        a: 'Yes. When an enquiry needs personal guidance, your team can step in and continue the conversation with the existing context available.',
      },
      {
        q: "Can we follow up with students who haven't enrolled yet?",
        a: 'Yes. Keeping enquiries and conversation history organised makes it easier for your team to identify prospective students and continue the conversation at the right time.',
      },
    ],
    ctaTitle: 'See how Converse360 can work for your admissions team.',
    ctaBody:
      "Bring us a real student or parent enquiry. We'll show you how Converse360 can handle the routine questions, keep the conversation organised and help your team focus on the people ready to take the next step.",
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    menuLabel: 'Real Estate',
    icon: 'realestate',
    tint: '#7C5CE0',
    tintSoft: '#EFEBFC',
    heroEyebrow: 'Real Estate',
    heroTitle: "Don't let a property enquiry disappear between the first call and the",
    heroTitleAccent: 'site visit',
    heroTitleTail: '.',
    heroBody:
      'A buyer asks about a 2BHK on WhatsApp. Another wants the price of a plot through Instagram. Someone fills out your website form and waits for a callback. Converse360 brings these conversations together, helps AI handle the initial questions, and gives your sales team the information they need to move serious prospects forward.',
    heroNote: 'No setup fee · Live in days, not months',
    metrics: [
      ['3 sec', 'Average first reply'],
      ['24/7', 'Property assistance'],
      ['1 place', 'Every property enquiry'],
    ],
    problemsTitle: 'Where property enquiries lose momentum',
    problemsIntro: "Real estate decisions take time. But the first response often can't wait.",
    problems: [
      {
        title: 'Buyers want answers before they book a visit',
        body: 'Price, location, configuration, possession, amenities and availability are usually the first things a buyer asks. If those answers take too long, the enquiry can lose momentum.',
      },
      {
        title: 'Sales teams chase too many cold enquiries',
        body: 'Not every person who asks about a property is ready for a site visit. Without the right information upfront, sales teams spend valuable time trying to qualify enquiries manually.',
      },
      {
        title: 'Valuable leads get buried in different channels',
        body: "A Meta lead, WhatsApp conversation, website enquiry and Instagram message can all belong to the same sales pipeline. When they're handled separately, keeping track becomes difficult.",
      },
    ],
    capabilitiesTitle: 'Give your property team a clearer way to sell.',
    capabilitiesIntro:
      'Converse360 helps real estate businesses handle enquiries, qualify prospects and keep every conversation connected from the first interaction.',
    capabilities: [
      'Bring property enquiries from supported channels into one workspace',
      'Let AI handle common questions about pricing, configurations, locations and project details',
      'Capture important buyer information such as budget, preferred location and requirements',
      "Keep follow-ups and sales opportunities organised so promising enquiries don't get overlooked",
    ],
    workflowTitle: 'From property search to site visit.',
    workflow: [
      {
        title: 'A buyer shows interest',
        body: 'They discover your property through a Meta campaign, social media, your website or WhatsApp and start asking about a project.',
      },
      {
        title: 'AI starts the conversation',
        body: "Instead of making the buyer wait, AI can provide the information you've configured around the project — pricing, configurations, amenities, location and other common questions.",
      },
      {
        title: 'The enquiry gets qualified',
        body: 'The conversation can help identify what the buyer is actually looking for, including budget, preferred area, property type and buying timeline.',
      },
      {
        title: 'Your sales team takes it forward',
        body: 'Once the buyer is ready for a detailed discussion or site visit, your team can step in with the conversation history and enquiry details already available.',
      },
    ],
    faqTitle: 'Questions real estate teams ask',
    faqs: [
      {
        q: 'Can the AI answer questions about our properties?',
        a: 'Yes. You can provide project information and instructions for the AI to use when answering common questions around configurations, pricing, amenities, location and other details.',
      },
      {
        q: 'Can we qualify buyers before our sales team speaks to them?',
        a: 'Yes. You can configure the conversation to collect relevant information such as budget, preferred location, property type and other requirements.',
      },
      {
        q: 'Can our team manage enquiries from different channels together?',
        a: 'Yes. Supported conversations from channels such as WhatsApp, Instagram and your website can be brought into one unified inbox.',
      },
      {
        q: 'Can we track where our property enquiries came from?',
        a: 'Yes. Campaign-originated conversations can be connected with their source, helping your team understand which campaigns are generating enquiries.',
      },
    ],
    ctaTitle: 'See how Converse360 can fit into your property sales process.',
    ctaBody:
      "Bring us a real property enquiry. We'll show you how Converse360 can handle the first questions, qualify the prospect and give your sales team a better starting point for the conversation.",
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    menuLabel: 'Healthcare',
    icon: 'healthcare',
    tint: '#E1306C',
    tintSoft: '#FCEAF1',
    heroEyebrow: 'Healthcare',
    heroTitle: 'Make it easier for patients to reach the',
    heroTitleAccent: 'right care',
    heroTitleTail: '.',
    heroBody:
      "A patient wants to book an appointment. Someone needs to know the doctor's availability. Another person is checking how to reach the clinic or asking about a service. These conversations can come through WhatsApp, Instagram, your website or other channels. Converse360 brings them together so your team can respond, organise enquiries and spend more time on patients who need personal assistance.",
    heroNote: 'No setup fee · Live in days, not months',
    metrics: [
      ['3 sec', 'Average first reply'],
      ['24/7', 'Patient assistance'],
      ['1 place', 'Every patient conversation'],
    ],
    problemsTitle: 'Where patient communication gets difficult',
    problemsIntro:
      'Healthcare conversations need clarity and timely responses. But managing every enquiry manually can put pressure on your front desk.',
    problems: [
      {
        title: "The phone isn't the only place patients ask",
        body: 'Patients reach out through WhatsApp, social media and your website for appointments, availability and general information. Keeping up across every channel can quickly become difficult.',
      },
      {
        title: 'Your front desk keeps answering the same things',
        body: 'Doctor availability, appointment timings, clinic information and other routine questions take up valuable staff time throughout the day.',
      },
      {
        title: 'Missed follow-ups create unnecessary gaps',
        body: 'A patient may enquire about an appointment and not confirm immediately. Without organised conversations and follow-ups, it becomes harder for your team to know who still needs attention.',
      },
    ],
    capabilitiesTitle: 'Give your healthcare team a simpler way to communicate.',
    capabilitiesIntro:
      'Converse360 helps healthcare businesses bring patient conversations together and automate the routine interactions that keep the front desk busy.',
    capabilities: [
      'Manage conversations from supported channels through one unified inbox',
      'Let AI handle configured questions around appointments, timings, services and general information',
      'Keep patient enquiries and conversation history organised for your team',
      'Route conversations to your staff when personal assistance is required',
    ],
    workflowTitle: 'From enquiry to appointment.',
    workflow: [
      {
        title: 'A patient reaches out',
        body: 'They find your clinic, hospital or healthcare service through social media, your website, WhatsApp or another supported channel and start a conversation.',
      },
      {
        title: 'AI handles the basics',
        body: 'The AI agent can respond to configured questions around services, appointment information, timings, doctor availability and other general enquiries.',
      },
      {
        title: 'The conversation stays organised',
        body: 'Instead of searching through different platforms, your team can see the conversation and relevant enquiry details together.',
      },
      {
        title: "Your team steps in when it's personal",
        body: 'When a patient needs assistance that requires your staff, the conversation can be handed over so the right person can take it forward.',
      },
    ],
    faqTitle: 'Questions healthcare teams ask',
    faqs: [
      {
        q: 'Can the AI handle appointment-related questions?',
        a: 'Yes. You can configure the AI with the information and instructions it needs to respond to common appointment-related enquiries, such as timings, availability and booking information.',
      },
      {
        q: 'Can patients reach us through WhatsApp and our website?',
        a: 'Yes. Supported conversations from channels such as WhatsApp, Instagram and your website can be brought into one unified inbox.',
      },
      {
        q: 'Can our staff take over when a patient needs personal assistance?',
        a: 'Yes. Your team can step into a conversation whenever human support is required, with the existing conversation context available.',
      },
      {
        q: 'Can we automate routine patient communication?',
        a: 'Yes. You can configure AI responses and conversation flows for recurring enquiries, helping your team reduce repetitive manual responses.',
      },
    ],
    ctaTitle: 'See how Converse360 can work for your healthcare team.',
    ctaBody:
      "Bring us a real patient enquiry. We'll show you how Converse360 can handle the routine questions, keep conversations organised and help your team respond when personal attention is needed.",
  },
  {
    slug: 'finance',
    name: 'Finance',
    menuLabel: 'Finance',
    icon: 'finance',
    tint: '#00828A',
    tintSoft: '#E6F8F9',
    heroEyebrow: 'Finance',
    heroTitle: 'Make financial conversations easier to manage from the',
    heroTitleAccent: 'first enquiry',
    heroTitleTail: '.',
    heroBody:
      "A customer wants to know if they're eligible for a loan. Someone asks about interest rates. Another person needs help understanding the documents required. These conversations can start through WhatsApp, a website, social media or another channel. Converse360 brings them together and helps your team respond with speed, consistency and the right context.",
    heroNote: 'No setup fee · Live in days, not months',
    metrics: [
      ['3 sec', 'Average first reply'],
      ['24/7', 'Financial assistance'],
      ['1 place', 'Every customer enquiry'],
    ],
    problemsTitle: 'Where financial enquiries slow down',
    problemsIntro:
      "People looking for financial services usually have questions before they're ready to submit an application. Those first conversations need to be handled well.",
    problems: [
      {
        title: 'Customers want clarity before they commit',
        body: 'Eligibility, loan amounts, interest rates, documents and process details can create a long list of questions. Delayed answers can make the decision harder.',
      },
      {
        title: 'Teams spend too much time on repetitive enquiries',
        body: 'The same questions come in every day. When staff have to answer each one manually, valuable time goes into information that could be handled automatically.',
      },
      {
        title: 'Good prospects need more than one interaction',
        body: "A customer may enquire today, compare options and return later. Without an organised conversation history and follow-up process, it's easy to lose track of where they are.",
      },
    ],
    capabilitiesTitle: 'Give your finance team a better way to handle enquiries.',
    capabilitiesIntro:
      'Converse360 helps financial businesses automate the first layer of communication while keeping more complex conversations with the right people.',
    capabilities: [
      'Bring customer conversations from supported channels into one workspace',
      'Let AI handle configured questions around products, eligibility and processes',
      'Collect relevant enquiry details before handing conversations to your team',
      "Keep conversations organised so follow-ups don't depend on scattered notes",
    ],
    workflowTitle: 'From enquiry to application.',
    workflow: [
      {
        title: 'A customer wants to know more',
        body: 'They discover a financial product through an advertisement, social media, your website or a direct message and begin asking questions.',
      },
      {
        title: 'AI provides the first answers',
        body: "The AI agent can respond using the information you've configured around eligibility, products, documentation, processes and other general enquiries.",
      },
      {
        title: 'The enquiry becomes clearer',
        body: 'As the conversation develops, relevant customer information can be captured so your team has a better understanding of what the person is looking for.',
      },
      {
        title: 'The right person takes over',
        body: 'When the conversation requires financial guidance, verification or human assistance, your team can step in with the context already available.',
      },
    ],
    faqTitle: 'Questions finance teams ask',
    faqs: [
      {
        q: 'Can the AI answer questions about our financial products?',
        a: 'Yes. You can provide the information and instructions the AI should use for configured enquiries around products, eligibility, documents and processes.',
      },
      {
        q: 'Can we collect information before our team takes over?',
        a: 'Yes. You can design conversation flows to gather relevant details before routing the enquiry to your team.',
      },
      {
        q: 'Can customers reach us through WhatsApp and our website?',
        a: 'Yes. Supported conversations from channels such as WhatsApp, Instagram and your website can be managed through one unified inbox.',
      },
      {
        q: 'Can our team take over an AI conversation?',
        a: 'Yes. Your team can step in whenever an enquiry requires personal assistance, with the existing conversation available for context.',
      },
    ],
    ctaTitle: 'See how Converse360 can work for your finance business.',
    ctaBody:
      "Bring us a real customer enquiry. We'll show you how Converse360 can handle the initial questions, organise the conversation and help your team focus on enquiries that need their attention.",
  },
  {
    slug: 'logistics',
    name: 'Logistics',
    menuLabel: 'Logistics',
    icon: 'logistics',
    tint: '#B26A00',
    tintSoft: '#FBF0DF',
    heroEyebrow: 'Logistics',
    heroTitle: 'Keep customers informed',
    heroTitleAccent: 'from pickup to delivery',
    heroTitleTail: '.',
    heroBody:
      'A customer wants to know where their shipment is. Another needs to reschedule a delivery. Someone wants to raise a pickup request or check when their package will arrive. These conversations can come through WhatsApp, your website, social media or other channels. Converse360 brings them together so customers get faster answers and your team has fewer repetitive queries to handle.',
    heroNote: 'No setup fee · Live in days, not months',
    metrics: [
      ['3 sec', 'Average first reply'],
      ['24/7', 'Shipment assistance'],
      ['1 place', 'Every customer conversation'],
    ],
    problemsTitle: 'Where logistics communication breaks down',
    problemsIntro:
      "When a shipment is moving, customers want visibility. Your team shouldn't have to answer every update manually.",
    problems: [
      {
        title: '“Where is my shipment?”',
        body: 'Tracking questions can make up a large part of daily customer communication. When every customer needs a separate response, your support team gets stuck repeating the same update.',
      },
      {
        title: 'Delivery issues need quick attention',
        body: 'A missed delivery, address change or rescheduling request needs to reach the right person quickly. Delays in communication can create another round of calls and messages.',
      },
      {
        title: 'Important conversations get scattered',
        body: 'Customers may contact different branches or teams through different channels. Without one place to see the conversation, keeping track of the issue becomes harder.',
      },
    ],
    capabilitiesTitle: 'Give your logistics team fewer repetitive conversations.',
    capabilitiesIntro:
      'Converse360 helps logistics businesses automate routine communication while keeping exceptions and important requests with the right team.',
    capabilities: [
      'Bring customer conversations from supported channels into one workspace',
      'Let AI handle configured questions around shipment status, delivery and pickup',
      'Keep requests and conversation history together for better visibility',
      'Route issues that need human attention to the right team',
    ],
    workflowTitle: 'From shipment update to resolution.',
    workflow: [
      {
        title: 'A customer needs an update',
        body: 'They want to check a shipment, ask about delivery timing, raise a pickup request or get help with an ongoing delivery.',
      },
      {
        title: 'AI responds with the information available',
        body: 'The AI agent can handle configured questions around tracking, delivery information, pickup details and other routine enquiries.',
      },
      {
        title: 'The request stays connected',
        body: 'The conversation and customer information remain together, giving your team visibility instead of forcing them to search through different channels.',
      },
      {
        title: 'Exceptions reach the right team',
        body: 'When a delivery issue, escalation or special request needs human attention, the conversation can be handed over to the appropriate person.',
      },
    ],
    faqTitle: 'Questions logistics teams ask',
    faqs: [
      {
        q: 'Can the AI answer shipment-related questions?',
        a: 'Yes. You can configure the AI with the information and instructions it needs to handle common enquiries around shipment status, delivery and pickup.',
      },
      {
        q: 'Can customers raise requests through chat?',
        a: 'Yes. You can create conversation flows for requests such as pickups, delivery-related queries and other configured requirements.',
      },
      {
        q: 'Can our team manage conversations from different channels together?',
        a: 'Yes. Supported conversations from channels such as WhatsApp, Instagram and your website can be managed through one unified inbox.',
      },
      {
        q: 'Can difficult delivery issues be handed to our team?',
        a: 'Yes. When an enquiry needs human intervention, your team can take over the conversation with the existing context available.',
      },
    ],
    ctaTitle: 'See how Converse360 can work for your logistics team.',
    ctaBody:
      "Bring us a real shipment or delivery enquiry. We'll show you how Converse360 can handle the routine questions, keep requests organised and help your team respond when something needs personal attention.",
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

/** The sample WhatsApp thread the landing page plays for the same vertical. */
export function getIndustryThread(def: IndustryDef): Message[] {
  const base = DATA.find((d) => d.name === def.name);
  if (!base) {
    // A slug can only exist here if landing-data carries the same name; this
    // guard exists so a rename fails loudly at build rather than rendering an
    // empty chat.
    throw new Error(`industries-data: "${def.name}" is missing from landing-data`);
  }
  return base.thread;
}

/** One-line summary used by the /industries index tiles and the mega menu. */
export function getIndustryBlurb(def: IndustryDef): string {
  const base = DATA.find((d) => d.name === def.name);
  if (!base) {
    throw new Error(`industries-data: "${def.name}" is missing from landing-data`);
  }
  return base.blurb;
}
