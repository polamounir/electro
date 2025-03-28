"use client"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/styles/home.css";

import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MainSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
    };

    const slides = [
        { title: "Google Smart Home", desc: "A hands-free device that can provide answers to spoken questions, play music, interact with smart home devices and more.", url: "", textPostion: "lm", className: "bg-[url('/images/mainSlider/slide1.webp')]" },
        { title: "Sport Watches Bluetooth Speaker", desc: "This upgraded wearable waterproof wireless wrist portable sports Bluetooth speaker watch features a multi-functional ", url: "", textPostion: "rm", className: "bg-[url('/images/mainSlider/slide2.webp')]" },
        { title: "Apple Watch Series", desc: "The all-new watchOS 10 brings more to your watch screen than ever before. Virtually every app has an updated look", url: "", textPostion: "ct", className: "bg-[url('/images/mainSlider/slide3.webp')]" },
    ];


    useEffect(() => {
        const clonedSlides = document.querySelectorAll(".slick-slide");
        clonedSlides.forEach((slide) => {
            slide.setAttribute("aria-hidden", "true");
            slide.querySelectorAll("a, button, input, select, textarea").forEach((el) => {
                el.setAttribute("tabindex", "-1");
            });
        });
    }, []);
    return (
        <main className="bg-slate-200 w-full overflow-hidden">
            <div className="mx-auto w-full">
                <Slider {...settings}>
                    {slides.map((slide) => (
                        <div
                            key={slide.title}
                            className={`flex justify-center items-center min-h-[500px] lg:h-[75dvh] text-white shadow-lg bg-cover bg-center ${slide.className} `}
                        >
                            <div className="main-slider-content relative w-full h-full">
                                <div className={`main-slider-text ${slide.textPostion} w-[80%] lg:w-[500px] mx-auto  static lg:absolute`}>
                                    <div className="mt-20 lg:mt-0 flex flex-col items-center text-center lg:items-start lg:text-start gap-5 ">
                                        <h2 className="text-3xl lg:text-5xl">{slide.title}</h2>
                                        <p> {slide.desc}</p>
                                        <button className="" aria-label="view more button"><Link to="" className="px-10 py-3 font-semibold rounded duration-500">View Details</Link></button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </Slider>
            </div>
        </main>
    );
}
