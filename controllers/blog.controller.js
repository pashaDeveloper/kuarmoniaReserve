// controllers/blog.controller.js
import Blog from '@/models/blog.model';
import Like from '@/models/like.model';

export async function addBlog(req) {
  try {
    const {
      title,
      description,
      content,
      publishDate,
      tags,
      category,
      authorId,
      socialLinks,
      metaTitle,
      metaDescription,
      readTime,
      isFeatured,
      visibility,
      relatedPosts,
      featuredImage,
    } = req.body;

    let parsedSocialLinks = [];
    if (socialLinks) {
      try {
        parsedSocialLinks = JSON.parse(socialLinks);
      } catch (e) {
        console.error("Error parsing socialLinks:", e.message);
      }
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      publishDate,
      tags,
      category,
      featuredImage: {
        url: req.body.filePath,
        public_id: req.file?.filename || "N/A",
        originalName: req.body.originalName || "ناشناخته",
      },
      authorId,
      socialLinks: parsedSocialLinks,
      metaTitle,
      metaDescription,
      readTime,
      isFeatured,
      visibility,
      relatedPosts,
    });

    if (blog) {
      const like = await Like.create({
        entityId: blog._id,
        entityType: "Blog", 
        type: "like", 
      });

      const dislike = await Like.create({
        entityId: blog._id, 
        entityType: "Blog",
        type: "dislike",
      });

    
      blog.likes = [like._id];
      blog.dislikes = [dislike._id];
      await blog.save();

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

    const blogs = await Blog.find({ isDeleted: false })
    .skip(skip)
    .limit(Number(limit))
    .populate('authorId', 'name avatar.url') 
    .select('_id blogId title createdAt views likes dislikes status likeCount dislikeCount featuredImage.url');



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

export async function getBlog(req) {
  try {
    const blog = await Blog.findById(req.query.id);
    if (blog) {
      return {
        success: true,
        message: "اطلاعات بلاگ با موفقیت دریافت شد",
        data: blog,
      };
    } else {
      return {
        success: false,
        message: "دریافت اطلاعات بلاگ با شکست مواجه شد",
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
  console.log("req.query", req.query);
  try {
    const { title, description, content, publishDate, tags, category, featuredImage, authorId, isDeleted ,publishStatus} = req.body || {};
    console.log('publishStatus',publishStatus)
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
    if (publishStatus !== undefined) updateFields.publishStatus = publishStatus;

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
