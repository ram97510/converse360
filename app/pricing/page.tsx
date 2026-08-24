import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import PricingBody from '@/components/pricing/PricingBody';

export const metadata: Metadata = {
  title: 'Pricing — Converse360',
  description: 'Simple plans for businesses that sell in conversations.',
};

export default function PricingPage() {
  return (
    <PageShell scope="standard">
      <AnnouncementBar />
      <Header />
      <PricingBody />
      <Footer id="about" />
    </PageShell>
  );
}
