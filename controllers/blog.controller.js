// controllers/blog.controller.js
import Blog from '@/models/blog.model';

export async function addBlog(req) {
  try {
    const {
      title,
      description,
      content,
      publishDate,
      tags, // نیازی به JSON.parse نیست
      category,
      authorId,
      socialLinks,
      metaTitle,
      metaDescription,
      readTime,
      isFeatured,
      visibility,
      relatedPosts,
      featuredImage, // تغییرات در این قسمت اعمال شده است
    } = req.body;

    console.log('req.body', req.body);

    // بررسی و تجزیه socialLinks
    let parsedSocialLinks = [];
    if (socialLinks) {
      try {
        parsedSocialLinks = JSON.parse(socialLinks);
      } catch (e) {
        console.error("Error parsing socialLinks:", e.message);
      }
    }

    // ایجاد بلاگ
    const blog = await Blog.create({
      title,
      description,
      content,
      publishDate,
      tags, // استفاده مستقیم از tags
      category,
      featuredImage: {
        url: req.body.filePath, // اطمینان حاصل کنید که filePath موجود باشد
        public_id: req.file?.filename || "N/A", // اگر req.file وجود دارد
        originalName: req.body.originalName || "ناشناخته",
      },
      authorId,
      socialLinks: parsedSocialLinks,
      metaTitle,
      metaDescription,
      readTime,
      isFeatured,
      visibility,
      relatedPosts
    });

    if (blog) {
      return {
        success: true,
        message: "بلاگ با موفقیت ایجاد شد",
        data: blog,
      };
    } else {
      return {
        success: false,
        message: "خطا در ساخت بلاگ",
      };
    }
  } catch (error) {
    console.error("Error:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
}


export async function getBlogs(req) {
  try {
    const { page = 1, limit = 7 } = req.query; 
    const skip = (page - 1) * limit;

 
    const blogs = await Blog.find({ isDeleted: false });
console.log('blogs',blogs)
    const total = await Blog.countDocuments({ isDeleted: false });

    if (blogs.length > 0) {
      return {
        success: true,
        data: blogs,
        total,
        message: "بلاگ‌ها با موفقیت دریافت شد",
      };
    } else {
      return {
        success: false,
        message: "هیچ بلاگی یافت نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getBlogsForDropDownMenu() {
  try {
    const blogs = await Blogs.find({ isDeleted: false, status: 'active' }).select('id title description');
    
    if (blogs.length > 0) {
      return {
        success: true,
        data: categories,
        message: "بلاگ ها با موفقیت برای DropDownMenu دریافت شدند",
      };
    } else {
      return {
        success: false,
        message: "هیچ بلاگی فعال برای DropDownMenu یافت نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}



export async function updateBlog(req) {
  const { id } = req.query;
  try {
    const { title, description, content, publishDate, tags, category, featuredImage, authorId, isDeleted } = req.body || {};
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (content !== undefined) updateFields.content = content;
    if (publishDate !== undefined) updateFields.publishDate = publishDate;
    if (tags !== undefined) updateFields.tags = tags;
    if (category !== undefined) updateFields.category = category;
    if (featuredImage !== undefined) updateFields.featuredImage = featuredImage;
    if (authorId !== undefined) updateFields.authorId = authorId;
    if (isDeleted !== undefined) updateFields.isDeleted = isDeleted;

    const blog = await Blog.findByIdAndUpdate(id, updateFields, { new: true })
      .populate('tags')  
      .populate('category')  
      .populate('authorId');  

    if (blog) {
      return {
        success: true,
        message: "بلاگ با موفقیت به‌روزرسانی شد",
        data: blog,
      };
    } else {
      return {
        success: false,
        message: "بلاگی پیدا نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
