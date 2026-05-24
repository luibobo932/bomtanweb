import { BuyerLeadForm } from "@/components/buyer-lead-form";
import { SiteShell } from "@/components/site-shell";

export default function BuyerLeadPage() {
  return (
    <SiteShell>
      <section className="container-shell pt-12">
        <BuyerLeadForm />
      </section>
    </SiteShell>
  );
}
