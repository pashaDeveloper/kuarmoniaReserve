import Blog from '@/models/blog.model';

export async function addBlog(req) {
  try {
    const { title, description, content, publishDate, tags, category, featuredImage, authorId } = req.body;

    const blog = await Blog.create({
      title,
      description,
      content,
      publishDate,
      tags,
      category,
      featuredImage,
      authorId
    });

    if (blog) {
      return {
        success: true,
        message: "بلاگ با موفقیت ایجاد شد",
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

    const blogs = await Blog.find({ isDeleted: false })
      .skip(skip)
      .limit(Number(limit))
      .populate('tags')  // Adjust if needed
      .populate('category')  // Adjust if needed
      .populate('authorId');  // Adjust if needed

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
