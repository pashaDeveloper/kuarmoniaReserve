import React from "react";

const InfoTable = ({ data, columns }) => {
  return (
    <div dir="rtl">
      <table className="table-auto w-full text-sm">
        <tbody>
          {columns.map((column, index) => (
            <tr key={index}>
              <td className="px-2">{column.label}</td>
              <td className="py-1 px-2">
                <span
                  className={`inline-flex items-center px-1 py-0.5 rounded text-xs font-medium border ${getColor(column.key)}`}
                >
                  {column.render
                    ? column.render(data)
                    : data[column.key]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// تابعی برای اختصاص رنگ‌ها بر اساس key ستون
const getColor = (key) => {
  switch (key) {
    case 'tagId':
    case '_id':
      return 'bg-orange-100 text-orange-800 border-orange-800';
    case 'status':
      return 'bg-green-100 text-green-800 border-green-800';
    case 'createdAt':
      return 'bg-blue-100 text-blue-800 border-blue-800';
    case 'canonicalUrl':
      return 'bg-blue-100 text-blue-800 border-blue-800';
    case 'keywords':
      return 'bg-gray-100 text-gray-800 border-gray-800';
    case 'robots':
      return 'bg-yellow-100 text-yellow-800 border-yellow-800';
    case 'slug':
      return 'bg-orange-100 text-orange-800 border-orange-800';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-800';
  }
};

export default InfoTable;
