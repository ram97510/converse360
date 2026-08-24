import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import BlogBody from '@/components/blog/BlogBody';

export const metadata: Metadata = {
  title: 'Blog — Converse360',
  description:
    'Practical insights on WhatsApp, AI agents, conversational sales, and smarter ways to turn everyday customer conversations into real business results.',
};

export default function BlogPage() {
  return (
    <PageShell scope="blog">
      <AnnouncementBar />
      <Header />
      <BlogBody />
      <Footer id="about" />
    </PageShell>
  );
}
