"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/product-catalog";
import { PRODUCT_WA_MESSAGES, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/shared/WhatsAppButton";

export interface ProductCardProps {
  product: Product;
  category: ProductCategory;
}

export function ProductCard({ product, category }: ProductCardProps) {
  const mailto = buildMailto(category.emailRecipient, product.title);
  const waMessage = PRODUCT_WA_MESSAGES.product(product.title);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition hover:-translate-y-1 hover:border-indigo/30 hover:shadow-elev">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-indigo/5">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo backdrop-blur">
          {product.termLabel}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-extrabold leading-tight text-ink">
          {product.title}
        </h3>
        <p
          className="mt-2 text-sm leading-relaxed text-muted-ink"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />

        {product.highlights && product.highlights.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {product.highlights.map((h) => (
              <li
                key={h}
                className="rounded-full bg-indigo/5 px-2.5 py-1 text-[11px] font-semibold text-indigo"
                dangerouslySetInnerHTML={{ __html: h }}
              />
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-col sm:flex-row gap-2 w-full">
          <a
            href={mailto}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo px-3 py-3 text-xs sm:text-sm font-semibold text-white transition active:brightness-95 touch-manipulation"
            style={{ WebkitUserSelect: "none", WebkitTouchCallout: "none" } as React.CSSProperties}
          >
            <Mail className="size-4" />
            Email
          </a>
          <a
            href={whatsappUrl(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[color:var(--color-whatsapp)] px-3 py-3 text-xs sm:text-sm font-semibold text-white transition active:brightness-90 touch-manipulation"
            style={{ WebkitUserSelect: "none", WebkitTouchCallout: "none" } as React.CSSProperties}
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

function buildMailto(recipient: string, productTitle: string): string {
  const subject = encodeURIComponent(`Enquiry — ${productTitle}`);
  const body = encodeURIComponent(
    `Hello ABZ Capital,\n\nI'd like more information about ${productTitle}.\n\nName:\nPhone:\nNotes:\n\nThank you.`
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

export default ProductCard;
