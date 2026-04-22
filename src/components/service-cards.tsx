type ServiceCardItem = {
  title: string;
  description: string;
};

type ServiceCardsProps = {
  items: readonly ServiceCardItem[];
};

export function ServiceCards({ items }: ServiceCardsProps) {
  return (
    <section className="border-b border-black/10 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.title} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-black">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-black/70">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
