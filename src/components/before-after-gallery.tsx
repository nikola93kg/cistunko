// src/components/before-after-gallery.tsx
import Image from "next/image";

type BeforeAfterItem = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  label: string;
};

type BeforeAfterGalleryProps = {
  items: readonly BeforeAfterItem[];
};

export function BeforeAfterGallery({ items }: BeforeAfterGalleryProps) {
  return (
    <section className="border-b border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
            Before/After proof
          </h2>
          <p className="text-base leading-7 text-black/70">
            Stvarni primeri rada pomažu da odmah vidite razliku posle dubinskog pranja.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <figure key={item.afterSrc} className="overflow-hidden rounded-3xl border border-black/10 bg-zinc-50 shadow-sm">
              <Image
                src={item.afterSrc}
                alt={item.afterAlt}
                width={1200}
                height={900}
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="px-5 py-4 text-sm font-medium text-black/70">{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
