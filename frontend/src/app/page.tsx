import Link from "next/link";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Container } from "@/components/Container/Container";
import { Logo } from "@/components/Logo/Logo";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import styles from "./page.module.css";

const features = [
  {
    title: "Crie convites",
    description:
      "Monte convites digitais bonitos para qualquer evento — casamentos, aniversários, eventos corporativos e muito mais.",
  },
  {
    title: "Blocos personalizáveis",
    description:
      "Monte seu convite usando blocos de conteúdo: texto, imagens e botões, organizados exatamente como você quiser.",
  },
  {
    title: "Gerenciamento de convidados",
    description:
      "Adicione convidados por nome e e-mail. Apenas pessoas da sua lista podem acessar o convite.",
  },
  {
    title: "Acesso por e-mail",
    description:
      "Os convidados informam o e-mail para acessar o convite. Eles não precisam criar conta.",
  },
  {
    title: "Acompanhamento de RSVP",
    description:
      "Os convidados confirmam ou recusam presença direto na página do convite.",
  },
  {
    title: "Painel em tempo real",
    description:
      "Monitore as respostas em tempo real — veja quem confirmou, recusou ou ainda não respondeu.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Container className={styles.headerInner}>
          <Logo />
          <nav className={styles.nav}>
            <Link href="#features" className={styles.navLink}>Recursos</Link>
            <Link href="#how-it-works" className={styles.navLink}>Como funciona</Link>
          </nav>
          <div className={styles.headerActions}>
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/register">Começar</Link>
            </Button>
          </div>
        </Container>
      </header>

      <main>
        <section className={styles.hero}>
          <Container className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Convites digitais,
              <br />
              do jeito certo
            </h1>
            <p className={styles.heroSubtitle}>
              Crie páginas de convite personalizadas para seus eventos. Controle
              quem visualiza, acompanhe os RSVPs e compartilhe com um único
              link — sem precisar enviar e-mails.
            </p>
            <div className={styles.heroCta}>
              <Button size="lg" asChild>
                <Link href="/auth/register">Começar</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href="/auth/login">Entrar</Link>
              </Button>
            </div>
          </Container>
        </section>

        <section id="features" className={styles.features}>
          <Container>
            <h2 className={styles.sectionTitle}>Tudo o que você precisa</h2>
            <p className={styles.sectionSubtitle}>
              Da criação à confirmação de presença, gerencie todo o fluxo de
              convites do seu evento em um só lugar.
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
            <h2 className={styles.sectionTitle}>Como funciona</h2>
            <ol className={styles.steps}>
              <li className={styles.step}>
                <span className={styles.stepNumber}>1</span>
                <div>
                  <h3 className={styles.stepTitle}>Crie seu convite</h3>
                  <p className={styles.stepDescription}>
                    Preencha os detalhes do evento e desenhe a página usando
                    blocos de conteúdo.
                  </p>
                </div>
              </li>
              <li className={styles.step}>
                <span className={styles.stepNumber}>2</span>
                <div>
                  <h3 className={styles.stepTitle}>Adicione seus convidados</h3>
                  <p className={styles.stepDescription}>
                    Informe o nome e o e-mail de cada convidado que você quer
                    convidar.
                  </p>
                </div>
              </li>
              <li className={styles.step}>
                <span className={styles.stepNumber}>3</span>
                <div>
                  <h3 className={styles.stepTitle}>Compartilhe o link</h3>
                  <p className={styles.stepDescription}>
                    Copie o link único do seu convite e envie como preferir —
                    WhatsApp, e-mail ou de qualquer outra forma.
                  </p>
                </div>
              </li>
              <li className={styles.step}>
                <span className={styles.stepNumber}>4</span>
                <div>
                  <h3 className={styles.stepTitle}>Acompanhe as respostas</h3>
                  <p className={styles.stepDescription}>
                    Veja os RSVPs chegando no seu painel e descubra quem vai
                    comparecer.
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
            WellCard &mdash; Crie e gerencie convites digitais
          </p>
        </Container>
      </footer>
    </div>
  );
}
