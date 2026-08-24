import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import ContactBody from '@/components/contact/ContactBody';

export const metadata: Metadata = {
  title: 'Contact — Converse360',
  description: 'Tell us what you want to automate. Book a demo or ask for a custom quote.',
};

export default function ContactPage() {
  return (
    <PageShell scope="standard">
      <AnnouncementBar />
      <Header />
      <ContactBody />
      <Footer />
    </PageShell>
  );
}
