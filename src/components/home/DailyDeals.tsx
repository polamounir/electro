
import { useEffect } from "react";
import Slider from "react-slick";
import productDemo from "../../assets/images/product_placeholder.webp";
import { ProductTypes } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { fetchDailyDeals } from "../../api/products";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addToCartAsync } from "../../app/features/slices/cartSlice";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function DailyDeals() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    centerMode: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    centerMode: true,
                    centerPadding: "15px",
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "10px",
                },
            },
        ],
    };

    const {
        data: products = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products", "dailyDeals"],
        queryFn: () => fetchDailyDeals(),
    });

    useEffect(() => {
        // fetchData()
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

    const dispatch = useDispatch<AppDispatch>();

    const addProductToCart = (id: string) => {
        dispatch(addToCartAsync(id));
        toast.success("Product added successfully");
    };
    if (isError)
        return <h2 className="text-center p-4"> something went wrong</h2>;
    return (
        <div className="daily-deals bg-white rounded-lg shadow-lg py-5 px-5 md:px-20 select-none">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Daily Deals</h2>
            {/* {loading && <div className="text-center min-h-35 flex justify-center items-center">Loading...</div>} */}
            <div className="slider-container ">
                {isLoading && (
                    <div className="text-center min-h-35 flex justify-center items-center">
                        Loading...
                    </div>
                )}
                <Slider {...settings} className="px-1 ">
                    {products?.map((product: ProductTypes, index: number) => (
                        <div
                            key={index}
                            className="flex items-center justify-center h-40 pr-5 "
                            aria-hidden={false}
                        >
                            <div className="flex gap-1 h-35 bg-white shadow-md border border-gray-200 rounded-lg daily-deal-card cursor-auto">
                                <div className="relative overflow-hidden h-full w-40 bg-slate-50 flex justify-center items-center">
                                    <div className="daily-deal-card-overlay">
                                        <button
                                            className="duration-500"
                                            onClick={() => addProductToCart(product.id)}
                                        >
                                            <ShoppingCart size={35} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                    <img
                                        src={product?.images?.[0] ?? productDemo}
                                        alt={product?.title ?? "Product Image"}
                                        className=""
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <Link to={`/product/${product?.id}`} className="px-2 w-full  flex flex-col items-start justify-between py-5">
                                    <h2 className="text-">{product.title?.slice(0, 25)}...</h2>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="line-through text-red-600">
                                            {product.price.toFixed(2)} EGP
                                        </span>
                                        <span className="font-semibold">
                                            {(product.price - 0.05 * product.price).toFixed(2)} EGP
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
