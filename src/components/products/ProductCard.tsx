"use client";

import Image from "next/image";
import { Calculator, Mail } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/product-catalog";
import { PRODUCT_WA_MESSAGES, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/shared/WhatsAppButton";
import { LoanSimulatorDialog } from "@/components/simulator/LoanSimulatorDialog";

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

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {product.hasSimulator && (
            <LoanSimulatorDialog
              trigger={
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-peach bg-peach px-3 py-2 text-xs font-semibold text-indigo transition hover:brightness-105"
                >
                  <Calculator className="size-3.5" />
                  Simulate
                </button>
              }
            />
          )}
          <a
            href={mailto}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo px-3 py-2 text-xs font-semibold text-white transition hover:brightness-110"
          >
            <Mail className="size-3.5" />
            Email
          </a>
          <a
            href={whatsappUrl(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[color:var(--color-whatsapp)] px-3 py-2 text-xs font-semibold text-white transition hover:brightness-95"
          >
            <WhatsAppIcon className="size-3.5" />
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
