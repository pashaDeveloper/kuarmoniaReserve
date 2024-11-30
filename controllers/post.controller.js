// controllers/post.controller.js
import post from '@/models/post.model';
import Like from '@/models/like.model';
import User from '@/models/user.model';

export async function addpost(req) {
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

    const post = await post.create({
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

    if (post) {
      const like = await Like.create({
        entityId: post._id,
        entityType: "post", 
        type: "like", 
      });

      const dislike = await Like.create({
        entityId: post._id, 
        entityType: "post",
        type: "dislike",
      });

    
      post.likes = [like._id];
      post.dislikes = [dislike._id];
      await post.save();

      return {
        success: true,
        message: "بلاگ با موفقیت ایجاد شد",
        data: post,
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



export async function getposts(req) {
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
    const posts = await post.find(searchQuery)
    .skip(skip)
    .limit(Number(limit))
    .populate('authorId', 'name avatar.url') 
    .select('_id postId title createdAt views likes dislikes status likeCount dislikeCount featuredImage.url');



    const total = await post.countDocuments(searchQuery);

    if (posts.length > 0) {
      return {
        success: true,
        data: posts,
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


export async function getClientposts(req) {
  try {
    const { page = 1, limit = 8 } = req.query; 
    const skip = (page - 1) * limit;

    const filter = {
      isDeleted: false,
      publishStatus: "approved", 
      status: "active", 
    };
    const superAdmin = await User.findOne({ role: 'superAdmin' });
    const posts = await post.find(filter)
    .skip(skip)
    .limit(Number(limit))
    .populate('authorId', 'name avatar.url') 
    .select('_id postId title description createdAt views likes dislikes status isFeatured featuredImage.url visibility publishStatus publishDate');

    const total = await post.countDocuments({ isDeleted: false });

    if (posts.length > 0) {
      return {
        success: true,
        data: posts,
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


export async function getpostsForDropDownMenu() {
  try {
    const posts = await posts.find({ isDeleted: false, status: 'active' }).select('id title description');
    
    if (posts.length > 0) {
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

export async function getpost(req) {
  try {

    const post = await post.findById(req.query.id)
    .populate('authorId', 'name avatar.url') 
    .populate('category', 'title')
    .populate('tags', 'title') 
    .select('_id postId title description slug canonicalUrl content createdAt views likes dislikes status isFeatured featuredImage.url metaTitle metaDescription metaKeywords visibility publishStatus publishDate');
    if (post) {
      return {
        success: true,
        message: "اطلاعات بلاگ با موفقیت دریافت شد",
        data: post,
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




export async function updatepost(req) {
  const { id } = req.query;
  console.log("id",id)
  try {
    const { title, description, content, publishDate, tags, category, featuredImage, authorId, isDeleted ,publishStatus} = req.body || {};
    console.log("publishStatus",publishStatus)

    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
     if (description !== undefined) updateFields.description = description;
     if (content !== undefined) updateFields.content = content;
    // if (publishDate !== undefined) updateFields.publishDate = publishDate;
    // if (tags !== undefined) updateFields.tags = tags;
    // if (category !== undefined) updateFields.category = category;
    // // if (featuredImage !== undefined) updateFields.featuredImage = featuredImage;
    // if (authorId !== undefined) updateFields.authorId = authorId;
    // if (isDeleted !== undefined) updateFields.isDeleted = isDeleted;
     if (publishStatus !== undefined) updateFields.publishStatus = publishStatus;

    const post = await post.findByIdAndUpdate(id, updateFields, { new: true })
      .populate('tags')  
      .populate('category')  
      .populate('authorId');  
    if (post) {
      return {
        success: true,
        message: "بلاگ با موفقیت به‌روزرسانی شد",
        data: post,
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
