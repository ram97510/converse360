import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import DemoBody from '@/components/demo/DemoBody';

export const metadata: Metadata = {
  title: 'Book a Personalized Demo — Converse360',
  description:
    'Pick a date and time and see how Converse360 can transform your customer engagement — a 20-minute walkthrough with one of our product specialists.',
};

export default function BookADemoPage() {
  return (
    <PageShell scope="standard">
      <AnnouncementBar />
      <Header />
      <DemoBody />
      <Footer />
    </PageShell>
  );
}
