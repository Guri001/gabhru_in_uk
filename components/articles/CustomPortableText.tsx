import { PortableText, PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-foreground/80 font-sans text-lg md:text-xl leading-[1.8] mb-8 font-light">{children}</p>,
    h2: ({ children }) => <h2 className="font-serif text-3xl md:text-5xl text-foreground mt-16 mb-8 leading-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="font-serif text-2xl md:text-3xl text-foreground mt-12 mb-6 leading-tight">{children}</h3>,
    h4: ({ children }) => <h4 className="font-serif text-xl md:text-2xl text-foreground mt-8 mb-6">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-[3px] border-accent pl-6 md:pl-10 py-2 my-12 font-serif text-3xl md:text-4xl italic text-foreground/90 leading-tight">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-outside ml-6 space-y-4 mb-10 text-foreground/80 font-sans font-light text-lg leading-[1.8]">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-outside ml-6 space-y-4 mb-10 text-foreground/80 font-sans font-light text-lg leading-[1.8]">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-4">{children}</li>,
    number: ({ children }) => <li className="pl-4">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic text-foreground/90">{children}</em>,
    link: ({ children, value }) => {
      const rel = !value?.href?.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value?.href} rel={rel} className="text-accent underline underline-offset-4 hover:text-accent-hover transition-colors">
          {children}
        </a>
      );
    },
  },
};

export default function CustomPortableText({ value }: { value: any }) {
  return (
    <div className="portable-text-container w-full max-w-[680px] mx-auto">
      <PortableText value={value} components={components} />
    </div>
  );
}
