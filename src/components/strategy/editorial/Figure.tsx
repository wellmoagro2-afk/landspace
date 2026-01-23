import Image from "next/image";

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className="my-8">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-slate-400 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
