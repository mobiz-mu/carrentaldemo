export default function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        className={`mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <div className={`rule-gold mt-4 ${center ? "mx-auto" : ""}`} />
      {intro && (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-white/70" : "text-ink/65"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
