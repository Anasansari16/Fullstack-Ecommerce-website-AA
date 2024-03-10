"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Footer from "@/components/Footer/page";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res.success) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  console.log(products);

  return (
    <main className="flex flex-col items-center justify-between p-4 lg:p-24">
  <section className="w-full">
    <div className="max-w-screen-xl mx-auto px-4 py-8 lg:gap-8 lg:py-16 lg:grid lg:grid-cols-12">
      <div className="lg:col-span-7">
        <h1 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-4xl lg:text-5xl">
          Best Street Collection
        </h1>
        <p className="max-w-2xl mb-6 text-sm font-light text-gray-500 lg:mb-8 md:text-base lg:text-lg">
          Celebrate the power of fashion strength, and style with 6NINESTREET!
        </p>
        <button
          type="button"
          onClick={() => router.push("/product/listing/all-products")}
          className="mt-1.5 inline-block bg-black px-4 py-2 text-xs font-medium uppercase tracking-wide text-white "
        >
          Explore Shop Collection
        </button>
      </div>
      <div className=" lg:block lg:col-span-5 mt-4">
        <img
          src="/h1.webp"
          alt="Explore Shop Collection"
          className="object-cover w-full h-auto"
        />
      </div>
    </div>
    <div className="max-w-screen-xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
        <div className="p-6 bg-gray-100 rounded lg:py-8">
          <div className="max-w-md mx-auto text-center lg:text-left">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              Winter Sale Collection
            </h2>
            <button
              onClick={() => router.push("/product/listing/all-products")}
              className="mt-1.5 inline-block bg-black px-4 py-2 text-xs font-medium uppercase tracking-wide text-white"
            >
              Shop ALL
            </button>
          </div>
        </div>
        <div className="lg:col-span-2">
          <ul className="grid grid-cols-2 gap-4">
            {products &&
              products
                .filter((item) => item.onSale === "yes")
                .splice(0, 2)
                .map((productItem) => (
                  <li
                    onClick={() =>
                      router.push(`/product/${productItem._id}`)
                    }
                    className="cursor-pointer"
                    key={productItem._id}
                  >
                    <div>
                      <img
                        src={productItem.imageUrl}
                        alt="Sale Product Item"
                        className="object-cover w-full h-auto rounded"
                      />
                    </div>
                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900">
                        {productItem.name}
                      </h3>
                      <p className="mt-1 text-xs text-gray-800">
                        ${productItem.price}{" "}
                        <span className="text-red-700">{`(-${productItem.priceDrop}%) Off`}</span>
                      </p>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
    <div className="max-w-screen-xl mx-auto px-4 py-8 sm:py-12 lg:px-8">
      <div className="text-center">
        <h2 className="text-lg font-bold text-gray-950 sm:text-xl">
          SHOP BY CATEGORY
        </h2>
      </div>
      <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
        <li>
          <div className="relative block group">
            <img
              src="https://images.unsplash.com/photo-1519278290-80967b99ea2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwOTg0ODA1MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
              className="object-cover w-full aspect-square"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
              <h3 className="text-xl font-medium text-white">KIDS</h3>
              <button
                onClick={() => router.push("/product/listing/kids")}
                className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
              >
                Shop Now
              </button>
            </div>
          </div>
        </li>
        <li>
          <div className="relative block group">
            <img
              src="https://images.unsplash.com/photo-1586102901518-ca0f178acb5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwOTg0ODMyMw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
              className="object-cover w-full aspect-square"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
              <h3 className="text-xl font-medium text-white">WOMEN</h3>
              <button
                onClick={() => router.push("/product/listing/women")}
                className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
              >
                Shop Now
              </button>
            </div>
          </div>
        </li>
        <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="relative block group">
            <img
              src="https://images.unsplash.com/photo-1501529301789-b48c1975542a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwOTg0ODk2NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
              className="object-cover w-full aspect-square"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
              <h3 className="text-xl font-medium text-white">MEN</h3>
              <button
                onClick={() => router.push("/product/listing/men")}
                className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
              >
                Shop Now
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</main>

  );
};
