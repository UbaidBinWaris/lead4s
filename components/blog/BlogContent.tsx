import ReactMarkdown from "react-markdown";
import Image from "next/image";

export type BlogContentProps = {
  readonly markdown: string;
};

export function BlogContent({ markdown }: BlogContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-white mt-6 mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-base text-slate-300 leading-relaxed mb-4">{children}</p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 underline transition-colors hover:text-brand-300"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-slate-300 space-y-2 mb-4">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-brand-600 pl-4 italic text-slate-400 my-4">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) =>
            className ? (
              <pre className="bg-surface-900/60 rounded-lg p-4 overflow-x-auto mb-4">
                <code className={`text-sm text-slate-200 font-mono ${className}`}>{children}</code>
              </pre>
            ) : (
              <code className="bg-surface-900/60 rounded px-2 py-1 text-sm text-slate-200 font-mono">
                {children}
              </code>
            ),
          img: ({ src, alt }) =>
            typeof src === "string" ? (
              <figure className="my-6">
                <div className="relative h-96 w-full overflow-hidden rounded-lg">
                  <Image
                    src={src}
                    alt={alt || "Blog image"}
                    fill
                    className="object-cover"
                  />
                </div>
              </figure>
            ) : null,
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
