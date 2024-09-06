import React from "react";
const Info = ({ tag }) => {
  return (

        <div >
          <h2 >
                      <span className="inline-flex w-full items-center px-2 py-4 rounded  font-medium bg-green-100 justify-center  border-[1px] border-green-300 text-xl text-center text-green-700 ">

          {tag.title}
                      </span>
                      </h2>

                      <div className="flex flex-col gap-2">
  <p className="flex flex-row flex-wrap mt-2 items-center gap-2">
    <span className="inline-flex  w-full items-center px-2 py-2 rounded border-[1px] border-fuchsia-300 text-xs font-medium bg-fuchsia-100 text-fuchsia-800">
      {tag.description}
    </span>
  </p>
</div>
<table className="table-auto w-full">
        <tbody>
          {/* وضعیت */}
          <tr>
            <td className="py-2 px-4">وضعیت</td>
            <td className="py-2 px-4">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  tag.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {tag.status ? "فعال" : "غیرفعال"}
              </span>
            </td>
          </tr>

          {/* تاریخ ایجاد */}
          <tr>
            <td className="px-4">تاریخ ایجاد</td>
            <td className="py-2 px-4">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                {new Date(tag.createdAt).toLocaleDateString("fa-IR")}
              </span>
            </td>
          </tr>

          {/* شناسه */}
          <tr>
            <td className="px-4">شناسه</td>
            <td className="py-2 px-4">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-md font-medium bg-orange-100 text-orange-800">
                {tag.tagId}
              </span>
            </td>
          </tr>

          {/* شناسه یکتا */}
          <tr>
            <td className="px-4">شناسه یکتا</td>
            <td className="py-2 px-4">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-md font-medium bg-orange-100 text-orange-800">
                {tag._id}
              </span>
            </td>
          </tr>

          {/* اسلاگ */}
          <tr>
            <td className="px-4">اسلاگ</td>
            <td className="py-2 px-4">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-md font-medium bg-orange-100 text-orange-800">
                {tag.slug}
              </span>
            </td>
          </tr>

          {/* کلمات کلیدی */}
          <tr>
            <td className="px-4">کلمات کلیدی</td>
            <td className="py-2 px-4">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                {tag.keywords.join(", ")}
              </span>
            </td>
          </tr>

          {/* ربات‌ها */}
          <tr>
            <td className="px-4">ربات‌ها</td>
            <td className="py-2 px-4">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
              {tag.robots && tag.robots.length > 0
                        ? tag.robots.map((robot) => robot.value).join(", ")
                        : "ندارد"}
              </span>
            </td>
          </tr>

          {/* URL کاننیکال */}
          <tr>
            <td className="px-4">URL کاننیکال</td>
            <td className="py-2 px-4">
              <a
                href={tag.canonicalUrl}
                className="inline-flex items-center px-2 py-0.5 rounded text-md font-medium bg-blue-100 text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tag.canonicalUrl}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
          {/* هر اطلاعات دیگری که نیاز دارید */}
        </div>
  
  );
};

export default Info;
