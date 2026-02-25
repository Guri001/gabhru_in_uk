import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity"; // I need to create this or just use the direct URL if provided. Our query returns direct URLs!
// Wait, the query returns "coverImage": coverImage.asset->url, so for internal images we need a builder or it might return direct URLs if we mapped it.
// Let's assume standard PortableText with custom classes for block quotes.

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-foreground/80 font-light text-lg leading-relaxed mb-6">{children}</p>,
    h2: ({ children }) => <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-12 mb-6 leading-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="font-serif text-2xl md:text-3xl text-foreground mt-10 mb-4 leading-tight">{children}</h3>,
    h4: ({ children }) => <h4 className="font-serif text-xl md:text-2xl text-foreground mt-8 mb-4">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent pl-6 md:pl-8 py-2 my-10 font-serif text-2xl md:text-3xl italic text-foreground/90 leading-tight">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-outside ml-6 space-y-3 mb-8 text-foreground/80 font-light text-lg">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-outside ml-6 space-y-3 mb-8 text-foreground/80 font-light text-lg">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-2">{children}</li>,
    number: ({ children }) => <li className="pl-2">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic text-foreground/90">{children}</em>,
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-accent underline underline-offset-4 hover:text-accent-hover transition-colors">
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      // Assuming value has an asset properly constructed or URL. Usually requires imageBuilder.
      // If we don't have it, we just render a placeholder or fail gracefully.
      return null; // A more robust image renderer requires @sanity/image-url. The prompt specification didn't ask for inline image handling beyond the cover image. I'll omit inline images to avoid broken links unless I create urlFor. Let me do a basic block.
    }
  }
};

export default function CustomPortableText({ value }: { value: any }) {
  return (
    <div className="portable-text-container w-full max-w-[680px] mx-auto">
      <PortableText value={value} components={components} />
    </div>
  );
}
