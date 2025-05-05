


import adImg1 from "../../assets/images/topSlides/l3.webp"

import adImg2 from "../../assets/images/topSlides/r2.jpg"
import adImg3 from "../../assets/images/topSlides/l1.webp"

import adImg4 from "../../assets/images/topSlides/r4.webp"



export default function HomeAds() {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-5 gap-3 ">
                <div className="rounded-xl overflow-hidden bg-gray-300 col-span-1 row-span-1 lg:row-span-3 h-[200px] lg:min-h-[400px] ">
                    <div className="relative text-white h-full" >
                        <div className=" absolute top-0 bottom-0 right-0 h-full w-full bg-amber-500 -z-[-1]  object-cover">
                            <img src={adImg4} alt="test" loading="lazy" height={600} width={800} className="h-full w-full object-cover" />
                        </div>

                        <div className=" absolute z-[1] left-[2rem] md:left-[5rem] top-[50%] -translate-y-[50%] h-full flex flex-col gap-2 lg:gap-5 justify-center">
                            <h2> Category</h2>
                            <p className="text-xl md:text-3xl font-bold">20% off pre-Order and purchases</p>
                            <button className="px-5 py-3 bg-black/20 rounded-2xl self-start">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl overflow-hidden bg-gray-300 col-span-1 row-span-1 lg:row-span-2  h-[200px] lg:h-auto">
                    <div className="h-full relative text-white overflow-hidden" >

                        <div className=" absolute top-0 left-0 h-full w-full bg-gray-100 -z-[-1] rotate-y-180">
                            <img src={adImg1} alt="test" loading="lazy" height={100} width={200} className="h-full w-full object-cover" />
                        </div>
                        <div className=" absolute z-[1] left-[2rem] md:left-[5rem] top-[50%] -translate-y-[50%] h-full flex flex-col gap-5 justify-center">
                            <p className="text-xl md:text-3xl font-bold">20% off pre-Order and purchases</p>
                            <button className="px-5 py-3 bg-black/20 rounded-2xl self-start">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl overflow-hidden bg-gray-300 col-span-1 row-span-1 lg:row-span-3 h-[200px] lg:min-h-[400px] ">
                    <div className="relative text-white h-full" >

                        <div className=" absolute top-0 bottom-0 right-0 h-full w-full bg-amber-500 -z-[-1]  object-cover">
                            <img src={adImg2} alt="test" loading="lazy" height={600} width={800} className="h-full w-full object-cover" />
                        </div>

                        <div className=" absolute z-[1] left-[2rem] md:left-[5rem] top-[50%] -translate-y-[60%] h-full flex flex-col gap-2 lg:gap-5 justify-center ">
                            <h2> Category</h2>
                            <p className="text-xl md:text-3xl font-bold">20% off pre-Order and purchases</p>
                            <button className="px-5 py-3 bg-black/20 rounded-2xl self-start">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl overflow-hidden bg-gray-300 col-span-1 row-span-1 lg:row-span-2  h-[200px] lg:h-auto">
                    <div className="h-full relative text-white overflow-hidden">

                        <div className=" absolute top-0 left-0 h-full w-full bg-gray-100 -z-[-1] rotate-y-180">
                            <img src={adImg3} alt="test" loading="lazy" height={100} width={200} className="h-full w-full object-cover" />
                        </div>
                        <div className=" absolute z-[1] left-[2rem] md:left-[5rem] top-[50%] -translate-y-[50%] h-full flex flex-col gap-5 justify-center">
                            <p className="text-xl md:text-3xl font-bold">20% off pre-Order and purchases</p>
                            <button className="px-5 py-3 bg-black/20 rounded-2xl self-start">Buy Now</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
