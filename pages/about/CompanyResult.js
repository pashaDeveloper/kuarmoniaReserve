import React from 'react';

export default function CompanyResults() {
    return (
        <section className="py-20 bg-blue-100-900 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="font-manrope text-4xl text-center text-gray-600 font-bold mb-14">
نتیجه تلاش های ما
                </h2>
                <div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between">
                    <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 dark:bg-gray-800 bg-white p-6 rounded-2xl shadow-md dark:shadow-gray-900 shadow-gray-100">
                        <div className="flex gap-5">
                            <div className="font-manrope text-2xl font-bold text-indigo-600">
                                240%
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl text-white font-semibold mb-2">
                                    رشد شرکت در زمینه مهاجرت
                                </h4>
                                <p className="text-xs text-gray-400 leading-5">
                                    رشد چشمگیر شرکت در ارائه خدمات مهاجرتی و تسهیل فرآیندهای قانونی برای مشتریان.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 dark:bg-gray-800 bg-white p-6 rounded-2xl shadow-md dark:shadow-gray-900 shadow-gray-100">
                        <div className="flex gap-5">
                            <div className="font-manrope text-2xl font-bold text-indigo-600">
                                175+
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl text-white font-semibold mb-2">
                                    اعضای تیم مهاجرت و سرمایه‌گذاری
                                </h4>
                                <p className="text-xs text-gray-400 leading-5">
                                    تیمی متخصص و با تجربه که در زمینه مشاوره سرمایه‌گذاری و مهاجرت بین‌المللی فعالیت می‌کند.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 dark:bg-gray-800 bg-white p-6 rounded-2xl shadow-md dark:shadow-gray-900 shadow-gray-100">
                        <div className="flex gap-5">
                            <div className="font-manrope text-2xl font-bold text-indigo-600">
                                625+
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl text-white font-semibold mb-2">
                                    پروژه‌های مهاجرت و سرمایه‌گذاری تکمیل‌شده
                                </h4>
                                <p className="text-xs text-gray-400 leading-5">
                                    بیش از 625 پروژه در زمینه مهاجرت و سرمایه‌گذاری با موفقیت به پایان رسیده است.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
