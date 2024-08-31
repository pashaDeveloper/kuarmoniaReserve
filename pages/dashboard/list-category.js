import Panel from "@/layouts/Panel";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import Modal from "../../components/shared/modal/Modal";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import AddCategory from './add-category';

const ListCategory = () => {
  const { data, isLoading, error } = useGetCategoriesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = Array.isArray(data?.data) ? data.data : []; 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <p>در حال بارگذاری...</p>;
  }

  if (error) {
    return <p>خطا در بارگذاری داده‌ها: {error.message}</p>;
  }

  return (
    <>
      <button
        className="fixed bottom-16 right-[400px] cursor-pointer bg-green-400 rounded-full flex items-center z-50 justify-center transition-all duration-300 hover:bg-green-700 active:scale-95"
        style={{
          width: "64px",
          height: "64px",
          transition:
            "background-color 0.3s !important, transform 0.1s !important",
        }}
        onClick={openModal}
      >
        <FaPlus size={24} color="white" />
      </button>

      <Panel>
        <section className="h-full w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 z-10">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">ردیف</th>
                  <th scope="col" className="px-6 py-3">شناسه</th>
                  <th scope="col" className="px-6 py-3">عنوان</th>
                  <th scope="col" className="px-6 py-3">توضیحات</th>
                  <th scope="col" className="px-6 py-3">تعداد</th>
                  <th scope="col" className="px-6 py-3">تاریخ ایجاد</th>
                  <th scope="col" className="px-6 py-3">اسلاگ</th>
                  <th scope="col" className="px-6 py-3">عملیات</th>
                </tr>
              </thead>
              <tbody>
              {categories.map((category, index) => (
    <tr key={category._id} className="bg-white hover:bg-secondary/50 transition-colors">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{index + 1}</td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{category._id}</td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{category.title}</td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{category.description}</td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">---</td> {/* تعداد یا سایر اطلاعات */}
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{new Date(category.createdAt).toLocaleDateString("fa-IR")}</td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{category.slug}</td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {/* دکمه‌های عملیات (مثل ویرایش یا حذف) */}
      </td>
    </tr>
  ))}
              </tbody>
            </table>
          </div>
        </section>
      </Panel>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="lg:w-1/3 md:w-1/2 w-full z-50"
      >
        <AddCategory onClose={closeModal} />
      </Modal>
    </>
  );
};

export default ListCategory;
