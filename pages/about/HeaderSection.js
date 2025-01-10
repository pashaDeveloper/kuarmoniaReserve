import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const HeaderSection = () => {
    const TypingAnimation = ({ texts, speed = 9000, pause = 12000 }) => {
        const [displayedText, setDisplayedText] = useState("");
        const [index, setIndex] = useState(0);
        const [textIndex, setTextIndex] = useState(0);
        const [isDeleting, setIsDeleting] = useState(false);
      
        useEffect(() => {
          const currentText = texts[textIndex];
          if (isDeleting) {
            if (displayedText.length > 0) {
              const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev.slice(0, -1));
              }, speed / 2);
              return () => clearTimeout(timeout);
            } else {
              setIsDeleting(false);
              setTextIndex((prev) => (prev + 1) % texts.length);
            }
          } else {
            if (displayedText.length < currentText.length) {
              const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + currentText[displayedText.length]);
              }, speed);
              return () => clearTimeout(timeout);
            } else {
              const timeout = setTimeout(() => {
                setIsDeleting(true);
              }, pause);
              return () => clearTimeout(timeout);
            }
          }
        }, [displayedText, isDeleting, texts, textIndex, speed, pause]);
        return (
            <div style={{ direction: "rtl" }}>
              {displayedText}
              <span className="cursor font-thin">|</span>
            </div>
          );
        };
  return (
    <div 
    className="bg-blue-100  h-[1000px] md:h-screen dark:bg-gray-900 pt-36 bg-no-repeat bg-center relative"
    style={{
      backgroundImage: "url('https://tragod.com/wp-content/uploads/2024/04/banner_img_3.webp')",
      backgroundAttachment: "fixed",  // این ویژگی باعث می‌شود که پس‌زمینه حرکت نکند
      backgroundPosition: "center",
      backgroundSize: "cover"
    }}
  > 
  <div className="absolute h-[1000px] md:h-screen inset-0  bg-blue-500 bg-opacity-70"></div>
  
      <section  className=" flex flex-col md:grid md:grid-cols-2  relative">
      <div className="container">
                  <div className="headline pera-content  text-center">
                  <div className="flex flex-col gap-2 justify-center">
    <h1 className="text-3xl rounded-sm  bg-cyan-300 text-white w-fit py-2 text-right px-6  bg-opacity-70	 ">
  کارمونیا  </h1>
  
    <h1 className=" text-4xl md:text-6xl rounded-sm bg-cyan-300 text-white  md:w-[550px] py-4 text-right px-2 font-bold bg-opacity-70	w-[350px] ">
  
    <TypingAnimation texts={["ازدواج بین المللی", "مهاجرت", "سرمایه گذاری", "اخذ ویزا","پی گیری امور وکالتی"]} speed={80} pause={6000} />
    </h1>
    {/* توضیحات */}
    <p>
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.
    </p>
  </div>
  
      </div>
              
              
          </div>
          <div className="h-screen flex-1 relative">
  
  
          <motion.div
        className="gt-banner-men absolute z-10"
        initial={{ opacity: 0, x: -300 }} 
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.5,
          duration: 1.5, 
          type: "tween", 
        }}
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
      >
          <motion.div
        className="gt-banner-men position-absolute"
        animate={{
          opacity: 1,
          x: 0,
          y: [0, -10, 0], 
        }}
        transition={{
          delay: 0.5,
          duration: 1.5, 
          type: "tween",
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
      >
   <img
    decoding="async"
    src="https://tragod.com/wp-content/uploads/2024/04/banner_men.webp"
    alt="Banner"
  />
      </motion.div>
      </motion.div>
          
          
             
          
                          <motion.div 
                          className=" absolute translate-y-28 translate-x-28 left-0"
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          transition={{
                              delay: 2,
                            duration: 2, 
                            ease: "easeInOut",
                          }}
                          >
                          <img  src="https://tragod.com/wp-content/uploads/2024/04/glass1.webp" alt="" />
                          </motion.div>        
                          <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          transition={{
                              delay: 2,
                            duration: 2, 
                            ease: "easeInOut",
                          }}
                          className=" absolute  translate-y-96  left-0">                        
                          <img    src="https://tragod.com/wp-content/uploads/2024/04/plane1.webp" alt=""  />
                          </motion.div>        
                     
                       <motion.div
        className=" fixed  z-8 top-24"
        initial={{ opacity: 1, x: 300 }} 
        animate={{
          opacity: 1,
          x: [-200,-800,-200],
        }}
        transition={{
          delay: 2,
          duration: 30,
          type: "tween",
          repeat: Infinity, 
          repeatType: "loop", 
          ease: "easeInOut", 
        }}
       
      >
        <img
          src="https://tragod.com/wp-content/uploads/2024/04/cloud2.webp"
          alt="Banner"
        />
      </motion.div> 
                          <div className="absolute ">
               {/* <img decodin
               
               g="async" src="https://tragod.com/wp-content/uploads/2024/04/banner_img_3.webp" alt=""  /> */}
          </div>
                
      </div>
     
  </section>
  </div>
  )
}

export default HeaderSection