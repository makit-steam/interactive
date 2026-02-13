import Button from "./Button";

export default function HeroSection({ title, subtitle, ctaText, ctaTo, ctaVariant = "secondary" }) {
  return (
    <section className="bg-primary text-white py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">{subtitle}</p>
        {ctaText && ctaTo && (
          <Button variant={ctaVariant} to={ctaTo}>{ctaText}</Button>
        )}
      </div>
    </section>
  );
}
