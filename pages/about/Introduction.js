import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const Introduction = () => {
  // مشاهده برای تصاویر
  const { ref: image1Ref, inView: image1InView } = useInView({
    triggerOnce: true,
    threshold: 0.1 // 60% قابل مشاهده باشد
  });
  const { ref: image2Ref, inView: image2InView } = useInView({
    triggerOnce: true,
    threshold: 0.2 // 60% قابل مشاهده باشد
  });
  const { ref: image3Ref, inView: image3InView } = useInView({
    triggerOnce: true,
    threshold: 0.3 // 60% قابل مشاهده باشد
  });
  // مشاهده برای متن
  const { ref: text1Ref, inView: text1InView } = useInView({
    triggerOnce: true,
    threshold: 0.2 // 30% قابل مشاهده باشد
  });
  const { ref: text2Ref, inView: text2InView } = useInView({
    triggerOnce: true,
    threshold: 0.3 // 30% قابل مشاهده باشد
  });
  const { ref: text3Ref, inView: text3InView } = useInView({
    triggerOnce: true,
    threshold: 0.3 // 30% قابل مشاهده باشد
  });

  return (
    <section className="overflow-hidden z-9 py-4    curved-section">
      <div className="rounded-primary bg-gradient-to-r mt-8 from-blue-100 to-blue-50 dark:from-gray-900 p-4 dark:to-gray-800 dark:bg-gray-900" >
      <div ref={image1Ref}>
        <div ref={image2Ref}>
          <div ref={image3Ref}>
            <div ref={text1Ref}>
              <div ref={text2Ref}>
                <div ref={text3Ref}>
                  <div className="container mx-auto">
                    <div className="flex flex-wrap items-center justify-between -mx-4">
                      <div className="w-full px-4 lg:w-6/12">
                        <div className="flex items-center -mx-3 sm:-mx-4">
                          <div className="w-full px-3 sm:px-4 xl:w-1/2">
                            <motion.div
                              className="py-3 sm:py-4"
                              initial={{ opacity: 0, x: 20 }}
                              animate={
                                image1InView
                                  ? { opacity: 1, x: 0 }
                                  : { opacity: 0, x: 20 }
                              }
                              transition={{ duration: 1.2, ease: "easeOut" }}
                            >
                              <Image
                                src="/assets/about/intro1.jpg"
                                alt="Image 1"
                                className="w-full rounded-2xl"
                                width={500}
                                height={300}
                                layout="responsive"
                              />
                            </motion.div>
                            <motion.div
                              className="py-3 sm:py-4"
                              initial={{ opacity: 0, x: 20 }}
                              animate={
                                image2InView
                                  ? { opacity: 1, x: 0 }
                                  : { opacity: 0, x: 20 }
                              }
                              transition={{ duration: 1, ease: "easeOut" }}
                            >
                              <Image
                                src="/assets/about/intro3.jpg"
                                alt="Image 2"
                                className="w-full rounded-2xl"
                                width={500}
                                height={300}
                                layout="responsive"
                              />
                            </motion.div>
                            
                          </div>
                          <div className="w-full relative px-3 z-50 sm:px-4 xl:w-1/2">
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={
                                image3InView
                                  ? { opacity: 1, x: 0 }
                                  : { opacity: 0, x: 20 }
                              }
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                              <Image
                                src="/assets/about/intro2.jpg"
                                alt="Image 3"
                                width={500}
                                height={300}
                                className="w-full rounded-2xl flex "
                                priority
                              />
                            </motion.div>
                            <span className="absolute -right-7 -bottom-7 z-49 ">
                  <svg
                    width={134}
                    height={106}
                    viewBox="0 0 134 106"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="1.66667"
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 1.66667 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 16.3333 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 31 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 45.6667 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3334"
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 60.3334 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 88.6667 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 117.667 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 74.6667 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 103 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 132 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.66667"
                      cy="89.3333"
                      r="1.66667"
                      transform="rotate(-90 1.66667 89.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy="89.3333"
                      r="1.66667"
                      transform="rotate(-90 16.3333 89.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy="89.3333"
                      r="1.66667"
                      transform="rotate(-90 31 89.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy="89.3333"
                      r="1.66667"
                      transform="rotate(-90 45.6667 89.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3333"
                      cy="89.3338"
                      r="1.66667"
                      transform="rotate(-90 60.3333 89.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy="89.3338"
                      r="1.66667"
                      transform="rotate(-90 88.6667 89.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy="89.3338"
                      r="1.66667"
                      transform="rotate(-90 117.667 89.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy="89.3338"
                      r="1.66667"
                      transform="rotate(-90 74.6667 89.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy="89.3338"
                      r="1.66667"
                      transform="rotate(-90 103 89.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy="89.3338"
                      r="1.66667"
                      transform="rotate(-90 132 89.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.66667"
                      cy="74.6673"
                      r="1.66667"
                      transform="rotate(-90 1.66667 74.6673)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.66667"
                      cy="31.0003"
                      r="1.66667"
                      transform="rotate(-90 1.66667 31.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 16.3333 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy="31.0003"
                      r="1.66667"
                      transform="rotate(-90 16.3333 31.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 31 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy="31.0003"
                      r="1.66667"
                      transform="rotate(-90 31 31.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 45.6667 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy="31.0003"
                      r="1.66667"
                      transform="rotate(-90 45.6667 31.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3333"
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 60.3333 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3333"
                      cy="30.9998"
                      r="1.66667"
                      transform="rotate(-90 60.3333 30.9998)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 88.6667 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy="30.9998"
                      r="1.66667"
                      transform="rotate(-90 88.6667 30.9998)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 117.667 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy="30.9998"
                      r="1.66667"
                      transform="rotate(-90 117.667 30.9998)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 74.6667 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy="30.9998"
                      r="1.66667"
                      transform="rotate(-90 74.6667 30.9998)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 103 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy="30.9998"
                      r="1.66667"
                      transform="rotate(-90 103 30.9998)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 132 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy="30.9998"
                      r="1.66667"
                      transform="rotate(-90 132 30.9998)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.66667"
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 1.66667 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.66667"
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 1.66667 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 16.3333 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 16.3333 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 31 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 31 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 45.6667 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 45.6667 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3333"
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 60.3333 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3333"
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 60.3333 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 88.6667 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 88.6667 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 117.667 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 117.667 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 74.6667 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 74.6667 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 103 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 103 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 132 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 132 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.66667"
                      cy="45.3333"
                      r="1.66667"
                      transform="rotate(-90 1.66667 45.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.66667"
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 1.66667 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy="45.3333"
                      r="1.66667"
                      transform="rotate(-90 16.3333 45.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 16.3333 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy="45.3333"
                      r="1.66667"
                      transform="rotate(-90 31 45.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 31 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy="45.3333"
                      r="1.66667"
                      transform="rotate(-90 45.6667 45.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 45.6667 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3333"
                      cy="45.3338"
                      r="1.66667"
                      transform="rotate(-90 60.3333 45.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3333"
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 60.3333 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy="45.3338"
                      r="1.66667"
                      transform="rotate(-90 88.6667 45.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 88.6667 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy="45.3338"
                      r="1.66667"
                      transform="rotate(-90 117.667 45.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 117.667 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy="45.3338"
                      r="1.66667"
                      transform="rotate(-90 74.6667 45.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 74.6667 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy="45.3338"
                      r="1.66667"
                      transform="rotate(-90 103 45.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 103 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy="45.3338"
                      r="1.66667"
                      transform="rotate(-90 132 45.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 132 1.66683)"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
                          </div>
                        </div>
                        
                      </div>

                      <div className="w-full text-justify px-4 lg:w-1/2 xl:w-5/12">
                        <div className="mt-10 lg:mt-0 ">
                          <motion.span
                            className="block mb-4 text-lg font-semibold text-primary"
                            initial={{ opacity: 0, y: -20 }}
                            animate={
                              text1InView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: -20 }
                            }
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          >
                            <h1 className="md:text-6xl text-2xl ">چرا کارمونیا ؟</h1>
                          </motion.span>

                          <motion.h2
                            className="mb-5 md:text-3xl text-lg text-right  text-dark dark:text-white sm:text-[40px]/[48px]"
                            initial={{ opacity: 0, x: -20 }}
                            animate={
                              text2InView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: -20 }
                            }
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          >
                            فرصت‌های ویژه برای مهاجرت و سرمایه‌ گذاری در ترکیه و
                            کانادا
                          </motion.h2>

                          <motion.p
                            className="mb-5 text-base text-body-color dark:text-dark-6"
                            initial={{ opacity: 0, x: -20 }}
                            animate={
                              text3InView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: -20 }
                            }
                            transition={{ duration: 0.7, ease: "easeOut" }}
                          >
                            شرکت ما با تجربه‌ای طولانی در زمینه مهاجرت و
                            سرمایه‌گذاری، راهکارهای مطمئن و حرفه‌ای برای شروع
                            زندگی و سرمایه‌گذاری در کشورهای ترکیه و کانادا ارائه
                            می‌دهد.
                          </motion.p>

                          <motion.a
                            href="javascript:void(0)"
                            className="inline-flex items-center justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-primary hover:bg-opacity-90"
                            initial={{ scale: 0.9 }}
                            animate={
                              text3InView ? { scale: 1 } : { scale: 0.9 }
                            }
                            transition={{ duration: 0.9, ease: "easeOut" }}
                          >
                            شروع کنید
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Introduction;
