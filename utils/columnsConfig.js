export const tagColumns = [
    { key: 'tagId', label: 'شناسه', color: "gray" },
    { key: 'title', label: 'عنوان', color: "green", ignore: true }, 
    { key: 'description', label: 'توضیحات', color: "blue", ignore: true },
    { key: 'keywords', label: 'کلمات کلیدی', color: "purple", render: (item) => item.keywords && item.keywords.join(", ") }, 
    { key: 'robots', label: 'ربات‌ها', color: "orange", render: (item) => item.robots && item.robots.map((robot) => robot.value).join(", ") }, 
    { key: 'canonicalUrl', label: 'URL کاننیکال', color: "teal" }, 
    { key: 'createdAt', label: 'تاریخ ایجاد', color: "indigo", render: (item) => new Date(item.createdAt).toLocaleDateString("fa-IR") }, 
    { key: 'slug', label: 'اسلاگ', color: "red" } 
  ];

 export  const blogColumns = [
    { key: 'blogId', label: 'شناسه بلاگ', color: "gray" },
    { key: 'title', label: 'عنوان', color: "green", ignore: true },
    { key: 'slug', label: 'اسلاگ', color: "red" },
    { key: 'description', label: 'توضیحات', color: "blue", ignore: true },
    { key: 'content', label: 'محتوا', color: "purple", ignore: true },
    { key: 'publishDate', label: 'تاریخ انتشار', color: "teal", render: (item) => new Date(item.publishDate).toLocaleDateString("fa-IR") },
    { key: 'tags', label: 'تگ‌ها', color: "orange", render: (item) => item.tags && item.tags.map((tag) => tag.title).join(", ") },
    { key: 'category', label: 'دسته‌بندی', color: "indigo", render: (item) => item.category?.title },
    { key: 'featuredImage', label: 'تصویر ویژه', color: "cyan", render: (item) => item.featuredImage ? `<img src="${item.featuredImage}" alt="تصویر" />` : "بدون تصویر" },
    { key: 'authorId', label: 'نویسنده', color: "yellow", render: (item) => item.authorId?.name },
    { key: 'createdAt', label: 'تاریخ ایجاد', color: "indigo", render: (item) => new Date(item.createdAt).toLocaleDateString("fa-IR") },
  ];