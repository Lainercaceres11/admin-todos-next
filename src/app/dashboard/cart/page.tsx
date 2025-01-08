import { WidgetItem } from "@/components";
import { Product, products } from "@/products/data/product";
import { ItemCard } from "@/shopping-cart/components/ItemsCard";
import { cookies } from "next/headers";

interface ProductsInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: {
  [id: string]: number;
}): ProductsInCart[] => {
  const productsIncart: ProductsInCart[] = [];
  for (const id of Object.keys(cart)) {
    const product = products.find((item) => item.id === id);
    if (product) {
      productsIncart.push({ product, quantity: cart[id] });
    }
  }

  return productsIncart;
};

export default async function CartPage() {
  const cookiesStore = await cookies();
  const cart = await JSON.parse(cookiesStore.get("cart")?.value ?? "{}");
  const products = getProductsInCart(cart);

  const totalPay = products.reduce(
    (acc, current) => current.product.price * current.quantity + acc,
    0
  );

  return (
    <div className="flex flex-col w-full sm:flex-col-2 gap-3">
      <div className="flex flex-col gap-2 w-full sm:w-8/12">
        {products.map(({ product, quantity }) => (
          <ItemCard key={product.id} product={product} quantity={quantity} />
        ))}
      </div>

      <div>
        <WidgetItem title="Total a pagar">
          <h3>${(totalPay * 1.15).toFixed(2)}</h3>
          <span>Impuestos 15% {totalPay * 0.15}</span>
        </WidgetItem>
      </div>
    </div>
  );
}
