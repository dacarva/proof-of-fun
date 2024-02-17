import Hero from "@/components/landing/Hero";
import PoweredBy from "@/components/landing/PoweredBy";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Step } from "@/types";
import Wallet from "@/components/icons/Wallet";
import Email from "@/components/icons/Email";
import Money from "@/components/icons/Money";
import Footer from "@/components/landing/Footer";

export default function Home(): JSX.Element {
  return (
    <section>
      <Hero />
      <PoweredBy />
      <HowItWorks steps={steps} />
      <Footer />
    </section>
  );
}

const steps: Step[] = [
  {
    icon: <Wallet className="size-10" />,
    title: "Connect Your Wallet",
    description:
      "Start by creating a profile. This is essential for developers or investors to participate in projects. Your profile stores your credentials and history in the platform, facilitating trust and transparency.",
  },
  {
    icon: <Email className="size-10" />,
    title: "Prove your credit score via email",
    description:
      "Create a funding pool in Bild3r. This pool will be the source of funds for development projects. Investors can contribute to this pool, and it will be used to finance approved real estate development projects.",
  },
  {
    icon: <Money className="size-10" />,
    title: "Ask for a loan",
    description:
      "Designate the recipient of the funds within Bild3r. This could be a real estate developer or a project team responsible for executing a development project. The recipient will receive funds as they meet predetermined milestones.",
  },
];
