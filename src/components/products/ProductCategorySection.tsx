import { Mail } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Container } from "@/components/shared/Container";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import {
  productsByCategory,
  type ProductCategory,
} from "@/lib/product-catalog";

export interface ProductCategorySectionProps {
  category: ProductCategory;
  index: number;
}

export function ProductCategorySection({ category, index }: ProductCategorySectionProps) {
  const products = productsByCategory(category.key);
  const isDark = index % 2 === 1;

  return (
    <section
      id={category.anchor}
      className={isDark ? "bg-mesh-soft" : "bg-white"}
    >
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo">
              {String.fromCharCode(65 + index)} · Category
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {category.title}
            </h2>
            <p
              className="mt-3 max-w-2xl text-base text-muted-ink"
              dangerouslySetInnerHTML={{ __html: category.blurb }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <a
              href={`mailto:${category.emailRecipient}?subject=${encodeURIComponent(
                `Enquiry — ${category.title}`
              )}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-indigo/15 bg-white px-3 py-1.5 font-semibold text-indigo hover:bg-indigo/5"
            >
              <Mail className="size-3.5" />
              {category.emailRecipient}
            </a>
            <WhatsAppButton
              message={`Hello ABZ Capital, I'm interested in ${category.title}.`}
              variant="outline"
              size="sm"
            >
              WhatsApp
            </WhatsAppButton>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProductCategorySection;
