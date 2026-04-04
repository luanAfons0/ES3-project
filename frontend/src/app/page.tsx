import Link from "next/link";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Container } from "@/components/Container/Container";
import { Logo } from "@/components/Logo/Logo";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import styles from "./page.module.css";

const features = [
  {
    title: "Create Invitations",
    description:
      "Build beautiful digital invitations for any event — weddings, birthdays, corporate events, and more.",
  },
  {
    title: "Customizable Blocks",
    description:
      "Design your invitation using content blocks: text, images, and buttons, arranged exactly how you want.",
  },
  {
    title: "Guest Management",
    description:
      "Add guests by name and email. Only people on your list can access the invitation.",
  },
  {
    title: "Email Gate",
    description:
      "Guests enter their email to access the invitation. No account needed on their end.",
  },
  {
    title: "RSVP Tracking",
    description:
      "Guests confirm or decline attendance directly from the invitation page.",
  },
  {
    title: "Live Dashboard",
    description:
      "Monitor responses in real time — see who confirmed, declined, or hasn't replied yet.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Container className={styles.headerInner}>
          <Logo />
          <nav className={styles.nav}>
            <Link href="#features" className={styles.navLink}>Features</Link>
            <Link href="#how-it-works" className={styles.navLink}>How it works</Link>
          </nav>
          <div className={styles.headerActions}>
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </Container>
      </header>

      <main>
        <section className={styles.hero}>
          <Container className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Digital Invitations,
              <br />
              Done Right
            </h1>
            <p className={styles.heroSubtitle}>
              Create customizable invitation pages for your events. Control who
              sees them, track RSVPs, and share with a single link — no email
              sending required.
            </p>
            <div className={styles.heroCta}>
              <Button size="lg" asChild>
                <Link href="/auth/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </Container>
        </section>

        <section id="features" className={styles.features}>
          <Container>
            <h2 className={styles.sectionTitle}>Everything you need</h2>
            <p className={styles.sectionSubtitle}>
              From creation to attendance confirmation, manage your entire event
              invitation flow in one place.
            </p>
            <div className={styles.featureGrid}>
              {features.map((feature) => (
                <Card key={feature.title} className={styles.featureCard}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        <section id="how-it-works" className={styles.howItWorks}>
          <Container>
            <h2 className={styles.sectionTitle}>How it works</h2>
            <ol className={styles.steps}>
              <li className={styles.step}>
                <span className={styles.stepNumber}>1</span>
                <div>
                  <h3 className={styles.stepTitle}>Create your invitation</h3>
                  <p className={styles.stepDescription}>
                    Fill in the event details and design the page using content
                    blocks.
                  </p>
                </div>
              </li>
              <li className={styles.step}>
                <span className={styles.stepNumber}>2</span>
                <div>
                  <h3 className={styles.stepTitle}>Add your guests</h3>
                  <p className={styles.stepDescription}>
                    Enter the name and email of each guest you want to invite.
                  </p>
                </div>
              </li>
              <li className={styles.step}>
                <span className={styles.stepNumber}>3</span>
                <div>
                  <h3 className={styles.stepTitle}>Share the link</h3>
                  <p className={styles.stepDescription}>
                    Copy your unique invitation link and send it however you
                    like — WhatsApp, email, or any other way.
                  </p>
                </div>
              </li>
              <li className={styles.step}>
                <span className={styles.stepNumber}>4</span>
                <div>
                  <h3 className={styles.stepTitle}>Track responses</h3>
                  <p className={styles.stepDescription}>
                    Watch RSVPs come in from your dashboard and see who&apos;s
                    attending.
                  </p>
                </div>
              </li>
            </ol>
          </Container>
        </section>
      </main>

      <footer className={styles.footer}>
        <Container>
          <p className={styles.footerText}>
            WellCard &mdash; Create and manage digital invitations
          </p>
        </Container>
      </footer>
    </div>
  );
}
