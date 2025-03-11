"use client";
import ProductGrid from "@/components/product-grid";
import React from "react";
import { products, categories } from "@/lib/mock-data";
import useSWR from "swr";
import { fetcher } from "@/lib/fechData";

const ProductsPage = () => {
  const { data, error, isLoading } = useSWR(`/api/products`, fetcher);

  console.log("🚀 ~ ProductsPage ~ isLoading:", isLoading);
  console.log("🚀 ~ ProductsPage ~ data:", data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-64">ขวา</div>
        <div className="flex-1">
          <ProductGrid products={data.products} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
