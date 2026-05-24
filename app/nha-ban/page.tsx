import { ListingCard } from "@/components/listing-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { getPublicListings } from "@/lib/listing-repository";

const listingFilters = [
  "Quan 1",
  "Quan 3",
  "Quan 5",
  "Quan 10",
  "Duoi 15 ty",
  "15-30 ty",
  "Hem xe hoi",
  "Mat tien",
  "Con ban",
];

export default async function ListingsPage() {
  const listings = await getPublicListings();

  return (
    <SiteShell>
      <section className="container-shell pt-10 md:pt-14">
        <div className="editorial-panel p-6 md:p-8">
          <SectionHeading
            kicker="Kho nha dang ban"
            title="Du lieu can nha phai ro de moi gioi dan nhanh va khach ra quyet dinh de hon"
            description="Trang listing khong chi de xem dep. No phai cho khach scan gia, vi tri, loai hem, phap ly va nguoi phu trach trong vai giay."
          />

          <div className="mt-8 grid gap-4 xl:grid-cols-[0.84fr_1.16fr]">
            <div className="rounded-[28px] border border-zinc-800 bg-zinc-950 p-5">
              <div className="section-kicker">Bo loc nhanh</div>
              <div className="chip-row mt-4">
                {listingFilters.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-zinc-800 bg-zinc-950 p-5">
              <div className="section-kicker">Tinh nang phase sau</div>
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                Khi noi database that, bo loc nay se di kem search bar, sort, bottom-sheet
                mobile, saved properties va tracking source lead tu tung listing card.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </section>
    </SiteShell>
  );
}
