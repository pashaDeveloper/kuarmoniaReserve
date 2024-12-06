// controllers/post.controller.js
import Post from '@/models/post.model';
import Like from '@/models/like.model';
import User from '@/models/user.model';
import path from "path";
export async function addPost(req) {
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
    console.log("adawdawdaw",req.body.gallery )
    let parsedSocialLinks = [];
    let featuredImage = null;
    let gallery = [];
    if (socialLinks) {
      try {
        parsedSocialLinks = JSON.parse(socialLinks);
      } catch (e) {
        console.error("Error parsing socialLinks:", e.message);
      }
    }
    console.log("featuredImage",req.body.featuredImage)
    console.log("gallery",req.body.gallery)

    if (req.body.featuredImage && req.body.featuredImage.length) {
      const filePath = req.body.featuredImage[0];
      const fileExtension = path.extname(filePath).substring(1).toLowerCase();  // بررسی نوع فایل به حروف کوچک
      featuredImage = {
        url: filePath || "N/A", 
        public_id: path.basename(filePath) || "ناشناخته",
        Type: fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png" ? "image" : 
              fileExtension === "mp4" ? "video" : "unknown",
      };
    }
    
    if (req.body.gallery && req.body.gallery.length) {
      gallery = req.body.gallery.map((filePath) => {
        const fileExtension = path.extname(filePath).substring(1).toLowerCase();  // بررسی نوع فایل به حروف کوچک
        return {
          url: filePath, 
          public_id: path.basename(filePath) || "ناشناخته",
          Type: fileExtension === "jpg" ||fileExtension === "jpeg" || fileExtension === "png" ? "image" : fileExtension === "mp4" ? "video" : "unknown",
        };
      });
    }
    
  
    const post = await Post.create({
      title,
      description,
      content,
      publishDate,
      tags,
      category,
      featuredImage,
      gallery,
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
        entityType: "Post", 
        type: "like", 
      });

      const dislike = await Like.create({
        entityId: post._id, 
        entityType: "Post",
        type: "dislike",
      });

    
      post.likes = [like._id];
      post.dislikes = [dislike._id];
      await post.save(); 

      return {
        success: true,
        message: "پست با موفقیت ایجاد شد",
        data: post,
      };
    } else {
      return {
        success: false,
        message: "خطا در ساخت پست",
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



export async function getPosts(req) {
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
    if (!isSuperAdmin) {
      searchQuery.authorId = userId;
    }
    const posts = await Post.find(searchQuery)
    .skip(skip)
    .limit(Number(limit))
    .populate('authorId', 'name avatar.url') 
    .select('_id postId title createdAt views likes dislikes status likeCount dislikeCount featuredImage');



    const total = await Post.countDocuments(searchQuery);

    if (posts.length > 0) {
      return {
        success: true,
        data: posts,
        total,
        message: "پست‌ها با موفقیت دریافت شد",
      };
    } else {
      return {
        success: false,
        message: "هیچ پستی یافت نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}


export async function getClientPosts(req) {
  try {
    const { page = 1, limit = 8 } = req.query; 
    const skip = (page - 1) * limit;

    const filter = {
      isDeleted: false,
      publishStatus: "approved", 
      status: "active", 
    };
    const superAdmin = await User.findOne({ role: 'superAdmin' });
    const posts = await Post.find(filter)
    .skip(skip)
    .limit(Number(limit))
    .populate('authorId', 'name avatar.url') 
    .select('_id postId title description createdAt views likes dislikes status isFeatured featuredImage visibility publishStatus publishDate');
console.log("posts",posts)
    const total = await Post.countDocuments({ isDeleted: false });

    if (posts.length > 0) {
      return {
        success: true,
        data: posts,
        superAdmin:{
          avatar:superAdmin?.avatar?.url,
          name:superAdmin?.name
        },
        total,
        message: "پست‌ها با موفقیت دریافت شد",
      };
    } else {
      return {
        success: false,
        message: "هیچ پستی یافت نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}


export async function getPostsForDropDownMenu() {
  try {
    const posts = await Posts.find({ isDeleted: false, status: 'active' }).select('id title description');
    
    if (posts.length > 0) {
      return {
        success: true,
        data: categories,
        message: "پست ها با موفقیت برای DropDownMenu دریافت شدند",
      };
    } else {
      return {
        success: false,
        message: "هیچ پستی فعال برای DropDownMenu یافت نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getPost(req) {
  try {

    const post = await Post.findById(req.query.id)
    .populate('authorId', 'name avatar.url') 
    .populate('category', 'title')
    .populate('tags', 'title') 
    .select('_id postId title description slug canonicalUrl content createdAt views likes dislikes status isFeatured gallery featuredImage metaTitle metaDescription metaKeywords visibility publishStatus publishDate');
    if (post) {
      return {
        success: true,
        message: "اطلاعات پست با موفقیت دریافت شد",
        data: post,
      };
    } else {
      return {
        success: false,
        message: "دریافت اطلاعات پست با شکست مواجه شد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}




export async function updatePost(req) {
  const { id } = req.query;
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

    const post = await Post.findByIdAndUpdate(id, updateFields, { new: true })
      .populate('tags')  
      .populate('category')  
      .populate('authorId');  
    if (post) {
      return {
        success: true,
        message: "پست با موفقیت به‌روزرسانی شد",
        data: post,
      };
    } else {
      return {
        success: false,
        message: "پستی پیدا نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
