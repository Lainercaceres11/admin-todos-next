import { ProductCard } from "@/products/components/ProductCard";
import { products } from "@/products/data/product";

export default function ProductPage() {
  return (
    <div className="grid grid-col-1 sm:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
