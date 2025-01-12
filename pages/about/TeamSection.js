import React from 'react'
import Image from "next/image";

export default function TeamSection() {
    return (
        <div>
            
    <section className="py-14 lg:py-24 relative text-justify">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
                <div className="img-box">
                    <Image alt="مدیر شرکت کارمونیا" width={600} height={600} src="/assets/about/marjan.jpg" 
                        className="max-lg:mx-auto rounded-primary object-cover" />
                </div>
                <div className="lg:pl-[100px] flex items-center text">
                    <div className="data w-full">
                        <h2
                            className="font-manrope font-bold md:text-4xl text-2xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
                            رهبر تیم  
                             </h2>
                        <p className=" md:text-xl text-md leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                        شرکت کارمونیا با هدایت مرجان قره گیزلی، متخصص در زمینه مهاجرت و سرمایه‌گذاری، به ارائه خدمات حرفه‌ای در این حوزه‌ها پرداخته است. مرجان قره گیزلی با چندین سال تجربه در این زمینه‌ها، به تیم کارمونیا کمک می‌کند تا راهکارهای مناسب برای مهاجرت و سرمایه‌گذاری در کشورهای ترکیه و کانادا ارائه دهند.


                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="py-14 lg:py-24 relative text-justify">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 ">

                <div className="lg:pr-24 flex items-center">
                    <div className="data w-full">
                  
                         <h2
                            className="font-manrope font-bold md:text-4xl text-2xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
  تیم ما
</h2>
<p className=" md:text-xl text-md leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
تیم کارمونیا متشکل از افراد با تخصص‌های مختلف در زمینه‌های مهاجرت و سرمایه‌گذاری است. هر عضو تیم با تلاش و تعهد بالا به ارائه بهترین خدمات به مشتریان می‌پردازد. ما در کارمونیا به توانمندی و تخصص‌های هر فرد احترام می‌گذاریم و تلاش می‌کنیم تا راهکارهایی حرفه‌ای، قابل اعتماد و موثر برای مهاجرت و سرمایه‌گذاری ارائه دهیم. از مشاوران حقوقی گرفته تا متخصصین مالی، تمامی اعضای تیم در کنار هم هستند تا تجربیات مفیدی برای متقاضیان فراهم کنند.
</p>

                    </div>
                </div>
                <div className="img-box ">
                <Image alt="مدیر شرکت کارمونیا" width={600} height={600} src="/assets/about/management.png" 
                        className="max-lg:mx-auto rounded-primary object-cover" />
                </div>
            </div>
        </div>
    </section>
        </div>
    )
}
