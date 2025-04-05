import { useSearchParams } from "react-router";
import demoImage from "../assets/images/product_placeholder.webp";
import { useEffect, useState } from "react";

import rowIcon from "../assets/images/icons/rows.svg";
// import col1Icon from "../assets/images/icons/1col.svg";
import col2Icon from "../assets/images/icons/2col.svg";
import col3Icon from "../assets/images/icons/3col.svg";
import col4Icon from "../assets/images/icons/4col.svg";
import col5Icon from "../assets/images/icons/5col.svg";
import useScreenWidth from "../hooks/useScreenWidth";
import { SlidersHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoryProducts } from "../api/products";
import { ProductTypes } from "../types";

export default function Category() {
  const [gridView, setGridView] = useState("");
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";

  const screenWidth = useScreenWidth();
  const handleGridView = (view: string) => {
    setGridView(view);
    console.log(gridView);
  };
  useEffect(() => {
    setGridView("");
  }, [screenWidth]);

  const { data: categoryProducts, isLoading } = useQuery({
    queryKey: ["category", category],
    queryFn: fetchCategoryProducts,
  });

  return (
    <div>
      <div className="pb-50">
        <div className="flex flex-col items-center py-10">
          <h1 className="font-semibold text-4xl uppercase">{category}</h1>
        </div>
        <hr />
        <div className="flex flex-col gap-3 px-5 md:px-25 xl:px-50">
          {/* Body HEADER */}
          <div className="py-3 flex flex-row justify-between border-b">
            <div className="flex">
              <button className="flex items-center gap-1 text-lg font-semibold">
                {" "}
                <SlidersHorizontal size={20} /> Filter{" "}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`h-6 w-6 flex items-center justify-center hover:shadow-md border-2 p-0.5 ${
                  gridView === "view-rows"
                    ? "border-teal-500 shadow-lg shadow-teal-300/50"
                    : "border-gray-500 hover:border-teal-500"
                }`}
                onClick={() => handleGridView("view-rows")}
              >
                <img src={rowIcon} alt="gridViewIcon" className="h-full" />
              </button>

              <button
                className={`h-6 w-6 flex lg:hidden items-center justify-center hover:shadow-md border-2 p-0.5 ${
                  gridView === "view-two-col"
                    ? "border-teal-500 shadow-lg shadow-teal-300/50"
                    : "border-gray-500 hover:border-teal-500"
                }`}
                onClick={() => handleGridView("view-two-col")}
              >
                <img src={col2Icon} alt="gridViewIcon" className="h-full" />
              </button>

              <button
                className={`h-6 w-8 hidden md:flex items-center justify-center hover:shadow-md border-2 p-0.5 ${
                  gridView === "view-three-col"
                    ? "border-teal-500 shadow-lg shadow-teal-300/50"
                    : "border-gray-500 hover:border-teal-500"
                }`}
                onClick={() => handleGridView("view-three-col")}
              >
                <img src={col3Icon} alt="gridViewIcon" className="h-full" />
              </button>

              <button
                className={`h-6 w-10 hidden md:flex items-center justify-center hover:shadow-md border-2 p-0.5 ${
                  gridView === "view-four-col"
                    ? "border-teal-500 shadow-lg shadow-teal-300/50"
                    : "border-gray-500 hover:border-teal-500"
                }`}
                onClick={() => handleGridView("view-four-col")}
              >
                <img src={col4Icon} alt="gridViewIcon" className="h-full" />
              </button>

              <button
                className={`h-6 w-10 hidden lg:flex items-center justify-center hover:shadow-md border-2 p-0.5 ${
                  gridView === "view-five-col"
                    ? "border-teal-500 shadow-lg shadow-teal-300/50"
                    : "border-gray-500 hover:border-teal-500"
                }`}
                onClick={() => handleGridView("view-five-col")}
              >
                <img src={col5Icon} alt="gridViewIcon" className="h-full" />
              </button>
            </div>
          </div>
          {/* MAIN Body */}
          <div
            className={`grid w-full gap-5 mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ${gridView}`}
          >
            {isLoading && (
              <div className="flex justify-center items-center h-60">
                Loading...
              </div>
            )}
            {categoryProducts?.map((product: ProductTypes) => {
              return (
                <div
                  className={`category-product-card hover:shadow duration-300 rounded-lg overflow-hidden flex gap-3  w-full ${
                    gridView == "view-rows" ? "flex-row h-30" : "flex-col"
                  }`}
                  key={product.id}
                >
                  <div
                    className={`category-product-image-box flex justify-center items-center  ${
                      gridView == "view-rows"
                        ? "h-30 aspect-square object-cover"
                        : " h-40 sm:h-30 p-3 py-5"
                    } relative overflow-hidden`}
                  >
                    <img
                      src={product.images?.[0] || demoImage}
                      alt=""
                      className="h-20"
                    />
                    <div className="category-product-image-box-overlay absolute bg-gray-500/30 text-white text-xs px-2 py-1 w-full h-full top-0  "></div>
                  </div>
                  <div
                    className={`flex flex-col w-full pb-3 text-xs  ${
                      gridView == "view-rows" ? "py-3" : "px-3 text-center "
                    }`}
                  >
                    <h2 className="font-semibold">{product.title}</h2>
                    <p className="">{product.price} EGP</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
