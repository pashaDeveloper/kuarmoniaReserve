// controllers/blog.controller.js
import Blog from '@/models/blog.model';
import Like from '@/models/like.model';
import User from '@/models/user.model';
import path from "path";

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
    } = req.body;

    let parsedSocialLinks = [];
    let featuredImage = null;
    if (socialLinks) {
      try {
        parsedSocialLinks = JSON.parse(socialLinks);
      } catch (e) {
        console.error("Error parsing socialLinks:", e.message);
      }
    }
    if (req.body.featuredImage && req.body.featuredImage.length) {
      featuredImage = {
        url: req.body.featuredImage[0] || "N/A", 
        public_id: path.basename(req.body.featuredImage[0]) || "ناشناخته", 
      };
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      publishDate,
      tags,
      category,
      featuredImage,
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
    const { page = 1, limit = 7, search = "",userId } = req.query; 
    const skip = (page - 1) * limit;
    const user = await User.findById(userId);
    if (!user) {
      return {
        success: false,
        message: "کاربر پیدا نشد",
      };
    }
    const isSuperAdmin = user.role === 'superAdmin';

    if (!isSuperAdmin) {
      searchQuery.authorId = userId;
    }

    const searchQuery = search
    ? { 
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } }
        ],
        isDeleted: false 
      }
    : { isDeleted: false };
    const blogs = await Blog.find(searchQuery)
    .skip(skip)
    .limit(Number(limit))
    .populate('authorId', 'name avatar.url') 
    .select('_id blogId title createdAt views likes dislikes status likeCount dislikeCount featuredImage.url');



    const total = await Blog.countDocuments(searchQuery);

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


export async function getClientBlogs(req) {
  try {
    const { page = 1, limit = 8 } = req.query; 
    const skip = (page - 1) * limit;

    const filter = {
      isDeleted: false,
      publishStatus: "approved", 
      status: "active", 
    };
    const superAdmin = await User.findOne({ role: 'superAdmin' });
    const blogs = await Blog.find(filter)
    .skip(skip)
    .limit(Number(limit))
    .populate('authorId', 'name avatar.url') 
    .select('_id blogId title description createdAt views likes dislikes status isFeatured featuredImage.url visibility publishStatus publishDate');

    const total = await Blog.countDocuments({ isDeleted: false });

    if (blogs.length > 0) {
      return {
        success: true,
        data: blogs,
        superAdmin:{
          avatar:superAdmin?.avatar?.url,
          name:superAdmin?.name
        },
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

    const blog = await Blog.findById(req.query.id)
    .populate('authorId', 'name avatar.url') 
    .populate('category', 'title')
    .populate('tags', 'title') 
    .select('_id blogId title description slug canonicalUrl content createdAt views likes dislikes status isFeatured featuredImage.url metaTitle metaDescription metaKeywords visibility publishStatus publishDate');
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
  console.log("id",id)
  try {
    const { title, description, content, publishDate, tags, category, featuredImage, authorId, isDeleted ,publishStatus} = req.body || {};
    console.log("publishStatus",publishStatus)

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
