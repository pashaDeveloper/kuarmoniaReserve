import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function KarmoniaTestimonials() {
    // State برای ذخیره نظر شخص فعال
    const [activeTestimonial, setActiveTestimonial] = useState();
    const [fadeClass, setFadeClass] = useState('');

    const testimonials = [
        {
            id: 1,
            name: 'Client 1',
            image: 'https://pagedone.io/asset/uploads/1704349534.png',
            text: 'از زمانی که با شرکت کارمونیا همکاری کردم، توانستم مراحل مهاجرت به کانادا از طریق ازدواج را با خیال راحت طی کنم. مشاوران حرفه‌ای و دلسوز این تیم کمک کردند تا تمامی مراحل به سرعت و بدون مشکل پیش برود.'
        },
        {
            id: 2,
            name: 'Client 2',
            image: 'https://pagedone.io/asset/uploads/1704349572.png',
            text: 'من و همسرم به دنبال مهاجرت به ترکیه از طریق ازدواج بودیم. با راهنمایی‌های دقیق و پشتیبانی بی‌وقفه تیم کارمونیا , فرآیند مهاجرت برای ما بسیار ساده و سریع شد.'
        },
        {
            id: 3,
            name: 'Client 3',
            image: 'https://pagedone.io/asset/uploads/1704349514.png',
            text: 'من تجربه مهاجرت موفق به کانادا از طریق برنامه‌های سرمایه‌گذاری را با کمک تیم کارمونیا با تجربه داشته‌ام. تیم کارمونیا حرفه‌ای و راهکارهای منطقی و واقع‌گرایانه‌ای که به من ارائه دادند، باعث شد که این مسیر را با موفقیت طی کنم.'
        },
    ];

    // انتخاب یک نظر پیش‌فرض
    useEffect(() => {
        setActiveTestimonial(testimonials[0].text); // اولین نظر به عنوان پیش‌فرض
    }, []);

    // تابع برای مدیریت کلیک روی پروفایل
    const handleProfileClick = (testimonialText) => {
        setFadeClass('fade-in-slide');  // اعمال انیمیشن Fade
        setTimeout(() => {
            setActiveTestimonial(testimonialText);  // ذخیره نظر شخص کلیک شده
            setFadeClass('');  // حذف انیمیشن بعد از مدتی
        }, 500);  // مدت زمان انیمیشن (هم‌زمان با مدت زمان انیمیشن CSS)
    };

    return (
        <section className="py-14 lg:py-24 bg-blue-100 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                <div className="mb-16 rounded-full">
                    <h2 className="text-4xl font-manrope font-bold text-gray-900 text-center">
                        نظرات مشتریان موفق ما در زمینه مهاجرت
                    </h2>
                </div>

                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    className="mySwiper2"
                >
                    <SwiperSlide>
                    <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className={`relative mb-20 ${fadeClass}`}>
                            <div className="max-w-max mx-auto lg:max-w-4xl">
                                <p className="text-lg text-gray-500 leading-8 mb-8 text-center">
                                    {activeTestimonial}
                                </p>
                            </div>
                        </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

                <Swiper
                    spaceBetween={50}
                    slidesPerView={3}
                    loop={true}
                    className="mySwiper max-w-[320px] "
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id} onClick={() => handleProfileClick(testimonial.text)}>
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="mx-auto scale-90 transition-all duration-300 w-16 border rounded-full border-indigo-600 object-cover cursor-pointer"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
