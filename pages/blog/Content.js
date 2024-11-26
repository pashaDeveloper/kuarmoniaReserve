  
import React, { useState, useEffect } from "react";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import LoadImage from "@/components/shared/image/LoadImage";
import { TagIcon } from "@/utils/SaveIcon";
import { FaInstagram, FaTwitter, FaTelegramPlane } from "react-icons/fa";

  const Content =  ({
    title = "",
    content = "",
    galleryPreview,
    publishDate = null,
    selectedTags = [],
    author = "",
    avatar,
  }) => {
    const colors = [
        { bg: "bg-orange-200", text: "text-orange-700" },
        { bg: "bg-green-200", text: "text-green-700" },
        { bg: "bg-blue-200", text: "text-blue-700" },
        { bg: "bg-red-200", text: "text-red-700" },
        { bg: "bg-purple-200", text: "text-purple-700" },
        { bg: "bg-yellow-200", text: "text-yellow-700" },
        { bg: "bg-pink-200", text: "text-pink-700" },
      ];
      return (
        <div className="col-span-1 md:col-span-10 shadow  mt-116 order-1 md:order-2">
        <div className="absolute inset-0 -z-10">
       <img
         src={galleryPreview}
         alt="تصویر ستون بزرگ"
         className="w-full object-cover h-[500px]"
       />
     </div>
     <div className="max-w-3xl mx-auto">
        <div className="relative rounded-full">
          <div className="absolute top-[-150px] left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
            <div className="profile-container text-center shine-effect rounded-full flex justify-center mb-4">
              {/* {isAvatarLoading && (
                <SkeletonImage
                  height={100}
                  width={100}
                  showSize={false}
                  borderRadius="rounded-full"
                />
              )}     */}
              <LoadImage
                src={avatar}
                alt="avatar"
                height={300}
                width={300}
                className={`h-[100px] w-[100px] profile-pic rounded-full text-center `}
              />
            </div>
          </div>

          <div className="relative bg-gray-50 z-10 dark:bg-gray-800 dark:text-gray-100 shadow-lg top-0 -mt-20 p-5 sm:p-10 ">
            <div className="flex items-center mt-14 justify-center">
              <div className="text-gray-700">
                <p>
                  <a
                    href="#"
                    className="text-indigo-600 font-medium hover:text-gray-900 transition text-center duration-500 ease-in-out dark:text-gray-300"
                  >
                    <span className="text-2xl"> {author}</span>
                  </a>
                </p>
                <p className="text-center text-sm mt-1">
                  <span className="font-medium">
                    {new Date(publishDate).toLocaleDateString("fa-IR", {
                      weekday: "long",
                    })}{" "}
                    - {new Date(publishDate).toLocaleDateString("fa-IR")}
                  </span>
                </p>
              </div>
            </div>
            <h1 className="font-bold text-3xl mb-2 mt-12 text-center">
              {title ? `${title}` : <SkeletonText lines={1} />}
            </h1>
            <div className="text-base leading-8 my-5 text-justify">
              {content ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                ></div>
              ) : (
                <SkeletonText lines={22} />
              )}
            </div>

            {selectedTags.length ? (
              selectedTags.map((tag, index) => {
                const randomColor =
                  colors[Math.floor(Math.random() * colors.length)];
                console.log("tag", tag);
                return (
                  <div
                    key={index}
                    className={`ml-2 text-xs inline-flex items-center  leading-sm uppercase px-3 py-1 rounded-full ${randomColor.bg}  ${randomColor.text} mb-2`}
                  >
                    <TagIcon className="ml-1" />
                    {tag.title}
                  </div>
                );
              })
            ) : (
              <SkeletonText lines={1} />
            )}

            <section className="bg-gray-100 py-8 rtl">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-4">نظرات مشتریان</h2>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center mb-2">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="تصویر کاربر"
                        className="w-10 h-10 rounded-full ml-3"
                      />
                      <div>
                        <h3 className="font-semibold">جان دو</h3>
                        <p className="text-sm text-gray-500">
                          ارسال شده در ۱۵ مارس ۲۰۲۴
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      محصول فوق‌العاده‌ای است! من یک هفته است که از آن استفاده
                      می‌کنم و بسیار راضی هستم.
                    </p>
                    <div className="flex items-center mt-2">
                      <button className="text-blue-500 hover:text-blue-600 ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 inline"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        پسندیدن
                      </button>
                      <button className="text-gray-500 hover:text-gray-600">
                        پاسخ
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center mb-2">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="تصویر کاربر"
                        className="w-10 h-10 rounded-full ml-3"
                      />
                      <div>
                        <h3 className="font-semibold">جین اسمیت</h3>
                        <p className="text-sm text-gray-500">
                          ارسال شده در ۱۰ مارس ۲۰۲۴
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      ارسال بسیار سریع بود و محصول در شرایط کاملاً سالم به دستم
                      رسید. بسیار توصیه می‌کنم!
                    </p>
                    <div className="flex items-center mt-2">
                      <button className="text-blue-500 hover:text-blue-600 ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 inline"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        پسندیدن
                      </button>
                      <button className="text-gray-500 hover:text-gray-600">
                        پاسخ
                      </button>
                    </div>
                  </div>
                </div>

                <form
                  className="mt-8 bg-white p-4 rounded-lg shadow"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    console.log({
                      name: formData.get("name"),
                      comment: formData.get("comment"),
                    });
                    // ارسال داده‌ها به API یا پردازش بیشتر
                  }}
                >
                  <h3 className="text-lg font-semibold mb-2">افزودن نظر</h3>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      نام
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="comment"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      نظر
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    ارسال نظر
                  </button>
                </form>
              </div>
            </section>

            <div className="absolute top-1/2 right-0 transform translate-x-1/2 translate-y-[-50%] bg-white dark:bg-slate-900 py-3 px-2 md:px-2 lg:px-3 rounded-full border border-gray-300 dark:border-gray-700">
              <a
                href="https://instagram.com"
                className="flex items-center mb-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-pink-500 w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                className="flex items-center mb-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-blue-500 w-5 h-5" />
              </a>
              <a
                href="https://telegram.org"
                className="flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegramPlane className="text-blue-600 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
       </div>
  );
};
  export default Content;

  
