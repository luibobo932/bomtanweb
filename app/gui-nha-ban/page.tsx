import { OwnerLeadForm } from "@/components/owner-lead-form";
import { SiteShell } from "@/components/site-shell";

export default function OwnerLeadPage() {
  return (
    <SiteShell>
      <section className="container-shell pt-12">
        <OwnerLeadForm />
      </section>
    </SiteShell>
  );
}
