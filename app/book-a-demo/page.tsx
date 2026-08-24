import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import DemoBody from '@/components/demo/DemoBody';

export const metadata: Metadata = {
  title: 'Book a Free Demo — Converse360',
  description:
    'A free 20-minute walkthrough on your own enquiries. We build the reply flow live, show the handover to your team, and give you the numbers.',
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
