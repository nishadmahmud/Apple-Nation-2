import Image from "next/image";
import Link from "next/link";
import {
  MdPhoneIphone,
  MdWatch,
  MdHeadphones,
  MdTabletMac,
  MdBatteryChargingFull,
  MdCable,
  MdDevicesOther,
  MdEdit,
  MdInventory2,
  MdAir,
  MdSpeaker,
  MdMemory,
} from "react-icons/md";

const EARBUDS_ICON_URL = "https://img.icons8.com/?size=100&id=QgfIzhEng4of&format=png&color=4682b4";

const iconMap = {
  "official-phone": MdPhoneIphone,
  "unofficial-phone": MdPhoneIphone,
  "smart-watches": MdWatch,
  earbuds: "custom",
  headphones: MdHeadphones,
  "cover-glass": MdInventory2,
  gadgets: MdDevicesOther,
  neckband: MdHeadphones,
  fan: MdAir,
  powerbank: MdBatteryChargingFull,
  "charger-cable": MdCable,
  "ipad-tablet": MdTabletMac,
  speakers: MdSpeaker,
  stylus: MdEdit,
  default: MdMemory,
};

const getCategoryIcon = (slug) => {
  const key = slug?.toLowerCase();
  return iconMap[key] || iconMap.default;
};

export default function CategoryShowcase({ categories = [] }) {
  if (!categories.length) {
    return null;
  }

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-4 text-center lg:text-left">
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-sky-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-sky-600 dark:bg-sky-400/10 dark:text-sky-300 lg:self-start">
          Shop by Category
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-100">
            Explore Essentials Tailored for Your Apple Ecosystem
          </h2>
          <p className="mx-auto max-w-3xl text-base text-slate-600 dark:text-zinc-400 lg:mx-0">
            Browse curated collections featuring the most-loved Apple Nation BD categories. Each section is optimized for quick discovery and deeper exploration.
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category) => {
          const iconValue = getCategoryIcon(category.slug ?? category.name);
          const isCustomIcon = iconValue === "custom";
          const Icon = isCustomIcon ? null : iconValue;
          const isEarbuds = (category.slug ?? category.name)?.toLowerCase() === "earbuds";

          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug ?? category.id}`}
              className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-lg shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:border-sky-500 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-sky-500/60"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 transition-transform duration-300 group-hover:scale-110 dark:bg-sky-400/10 dark:text-sky-200">
                {isEarbuds ? (
                  <Image
                    src={EARBUDS_ICON_URL}
                    alt="Earbuds"
                    width={28}
                    height={28}
                    className="object-contain"
                    unoptimized
                  />
                ) : (
                  Icon && <Icon className="h-7 w-7" aria-hidden />
                )}
              </span>
              <h3 className="text-center text-sm font-semibold text-slate-900 dark:text-zinc-100">
                {category.name}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

