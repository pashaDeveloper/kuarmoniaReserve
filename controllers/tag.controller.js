import Tag from '@/models/tag.model';

export async function addTag(req) {
  try {
    const { title, description, keywords, robots } = req.body; 

    const tag = await Tag.create({
      title,
      description,
      keywords,
      robots
    });

    if (tag) {
      return {
        success: true,
        message: "تگ با موفقیت ایجاد شد",
      };
    } else {
      return {
        success: false,
        message: "خطا در ساخت تگ",
      };
    }
  } catch (error) {
    console.error("Error:", error.message); // چاپ خطا برای مشاهده جزئیات
    return {
      success: false,
      message: error.message,
    };
  }
}


export async function getTags(req) {
  try {
    const { page = 1, limit = 7 } = req.query; 
    const skip = (page - 1) * limit;

    const tags = await Tag.find({ isDeleted: false })
      .skip(skip)
      .limit(Number(limit));

    const total = await Tag.countDocuments({ isDeleted: false });

    if (tags.length > 0) {
      return {
        success: true,
        data: tags,
        total,
        message: "تگ‌ها با موفقیت دریافت شد",
      };
    } else {
      return {
        success: false,
        message: "هیچ تگی یافت نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getTagsForDropDownMenu() {
  try {
    const tags = await Tag.find({ isDeleted: false, status: 'active' }).select('_id title description');
    console.log("tags",tags); // اصلاح تایپی

    if (tags.length > 0) {
      return {
        success: true,
        data: tags,
        message: "تگ ها با موفقیت برای دریافت شدند",
      };
    } else {
      return {
        success: false,
        message: "هیچ تگ فعالی  یافت نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function updateTag(req) {
  const { id } = req.query;
  console.log(req.body)
  try {
    const { title, description, status, isDeleted ,robots,keywords} = req.body || {};
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status;
    if (isDeleted !== undefined) updateFields.isDeleted = isDeleted;
    if (robots !== undefined) updateFields.robots = robots;
    if (keywords !== undefined) updateFields.keywords = keywords;
    const tag = await Tag.findByIdAndUpdate(id, updateFields, { new: true });

    if (tag) {
      return {
        success: true,
        message: "تگ با موفقیت به‌روزرسانی شد",
        data: tag,
      };
    } else {
      return {
        success: false,
        message: "تگی پیدا نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
