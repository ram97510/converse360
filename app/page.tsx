import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import StatAnimator from '@/components/StatAnimator';
import RevealAnimator from '@/components/RevealAnimator';
import LandingBody from '@/components/landing/LandingBody';

export default function HomePage() {
  return (
    <PageShell scope="landing">
      <StatAnimator />
      <RevealAnimator />
      <AnnouncementBar />
      <Header />
      <LandingBody />
      <Footer id="about" />
    </PageShell>
  );
}
