/**
 * Blog index content — the POSTS / ALL constants from Blog.html's
 * `<script type="text/x-dc">` block, copied verbatim except for `url`, which is
 * the ported route rather than the source's file name.
 *
 * Only the topic filter reads this: the cards themselves are written out in the
 * markup, as they are in the source.
 */

export interface Post {
  url: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  img: string;
  alt: string;
}

export const POSTS: Post[] = [
  {
    url: '/blog/why-whatsapp-is-essential-for-business',
    tag: 'WhatsApp',
    title: 'Why WhatsApp Is Essential for Business in 2026: Benefits, Use Cases & Customer Engagement',
    excerpt: 'The rise of WhatsApp has been so quiet and understated that it has emerged as one of the most powerful business communication tools of the decade.',
    date: '22 August 2026',
    read: '5 min read',
    img: '/assets/blog-whatsapp-essential.jpg',
    alt: 'WhatsApp on mobile screen representing business conversation and customer engagement',
  },
  {
    url: '/blog/whatsapp-for-event-management',
    tag: 'Event management',
    title: 'How to Use WhatsApp for Event Management: A Complete Guide for Event Organisers',
    excerpt: 'In the organisation of any event, there are a lot of things to do, like guest list management, coordination with vendors, booking of tickets and much more in one go.',
    date: '22 August 2026',
    read: '5 min read',
    img: '/assets/blog-event-management.jpg',
    alt: 'Event details and chats handled seamlessly inside WhatsApp',
  },
  {
    url: '/blog/conversational-sales-strategy',
    tag: 'Conversational sales',
    title: 'Conversational Sales Strategy: How to Engage Customers and Increase Conversions',
    excerpt: 'The traditional sales funnel is fast becoming irrelevant compared to something much more efficient: conversation. The buyers of today do not want to go through the trouble of filling out forms and waiting for follow-ups.',
    date: '22 August 2026',
    read: '5 min read',
    img: '/assets/blog-conversational-sales.jpg',
    alt: 'Conversational sales flow on screen representing automated engagement and team conversion',
  },
];

export const ALL = 'All topics';
