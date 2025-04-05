import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import productDemo from "../../assets/images/product_placeholder.webp";
import { Command, Eye, Heart, ShoppingCart } from "lucide-react";
import { ProductTypes } from "../../types";
import ProductCardSkeleton from "../ui/ProductCardSkeleton";
import { fetchTopProducts } from "../../api/products";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { openProductModel } from "@/app/features/slices/productModelSlice";
import { addToCartAsync } from "@/app/features/slices/cartSlice";
import { Link } from "react-router-dom";

export default function TopProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const [viewedProducts, setViewedProducts] = useState<string>("featured");
  const [end, setEnd] = useState<number>(6);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", viewedProducts],
    queryFn: () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(fetchTopProducts(end)), 1000)
      ),
  });
  const previewProduct = (id: string) => {
    dispatch(openProductModel(id));
  };

  const handleAddProduct = (id: string) => {
    dispatch(addToCartAsync(id));
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  useEffect(() => {
    const clonedSlides = document.querySelectorAll(".slick-slide");
    clonedSlides.forEach((slide) => {
      slide.setAttribute("aria-hidden", "true");
      slide
        .querySelectorAll("a, button, input, select, textarea")
        .forEach((el) => {
          el.setAttribute("tabindex", "-1");
        });
    });
  }, []);

  if (isError) return <p>Error: Somothig Went Wrong</p>;

  return (
    <div className="py-10">
      <h2 className="text-center mb-2 text-2xl font-semibold lg:text-4xl">
        Top Products
      </h2>
      <ul className="flex justify-center items-center gap-5">
        <li>
          <button
            onClick={() => {
              setViewedProducts("featured");
              setEnd(5);
            }}
            className={`${viewedProducts === "featured" && "font-bold "}`}
          >
            Featured
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setViewedProducts("sale");
              setEnd(11);
            }}
            className={`${viewedProducts === "sale" && "font-bold "}`}
          >
            Sale
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setViewedProducts("rate");
              setEnd(17);
            }}
            className={`${viewedProducts === "rate" && "font-bold "}`}
          >
            Top Rate
          </button>
        </li>
      </ul>
      <div className="flex flex-wrap justify-center gap-4 max-w-[100%] overflow-hidden">
        <div className="daily-deals rounded-lg py-5 px-2 max-w-[100%]">
          <div className="slider-container ">
            <Slider {...settings} className="px-1 ">
              {isLoading &&
                [...Array(5)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
            </Slider>
          </div>
          <div className="w-[100%] ">
            <div className="slider-container ">
              <Slider {...settings} className="px-1 ">
                {Array.isArray(products) &&
                  products.map((product: ProductTypes) => (
                    <div
                      key={product?.id}
                      className="flex items-center justify-center pr-2"
                      aria-hidden={false}
                    >
                      <div className="flex flex-col gap-1 h-full top-products-card">
                        <div className="overflow-hidden aspect-square  flex justify-center items-center top-products-img-box">
                          <div className="h-30 w-30 flex justify-center items-center">
                            <img
                              src={product?.images?.[0] ?? productDemo}
                              alt={product?.title ?? "Product Image"}
                              className=" object-fit"
                              width={100}
                              height={100}
                            />
                          </div>
                          <div className="top-products-img-overlay">
                            <div className="top-products-img-overlay-actions flex justify-around items-center gap-3">
                              <button
                                className="flex justify-center items-center h-10 w-10 rounded-full bg-white text-black hover:bg-black hover:text-white duration-500"
                                onClick={() => handleAddProduct(product.id)}
                              >
                                <ShoppingCart />
                              </button>
                              <button
                                className="flex justify-center items-center h-10 w-10 rounded-full bg-white text-black hover:bg-black hover:text-white duration-500"
                                onClick={() => previewProduct(product.id)}
                              >
                                <Eye />
                              </button>
                              <button className="flex justify-center items-center h-10 w-10 rounded-full bg-white text-black hover:bg-black hover:text-white duration-500">
                                <Heart />
                              </button>
                            </div>
                          </div>
                        </div>
                        <Link to={`/product/${product?.id}`} className="px-2 w-full flex flex-col items-center text-center min-h-20">
                          <h2 className="text-sm text-nowrap text-ellipsis max-w-[90%] overflow-hidden mx-auto">
                            {product.title}
                          </h2>
                          <div className="flex items-center gap-3 ">
                            <span className="text-xs text-nowrap md:text-[16px] font-semibold">
                              {(product.price - 0.05 * product.price).toFixed(
                                2
                              )}{" "}
                              EGP
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
              </Slider>
              {Array.isArray(products) && products.length === 0 && (
                <div className="flex justify-center">
                  <h1 className="font-semibold text-slate-300 flex items-center gap-2">
                    Products Comming soon
                    <span>
                      <Command />
                    </span>
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
