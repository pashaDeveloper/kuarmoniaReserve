import Tag from '@/models/tag.model';

// Add a new tag
export async function addTag(req) {
  try {
    const { title, description, keywords, robots } = req.body; // استفاده از داده‌های فیک

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


export async function getTags() {
  try {
    const tags = await Tag.find({ isDeleted: false }); // Retrieve all categories from the database
    if (tags.length > 0) {
      return {
        success: true,
        data: tags,
        message: " تگ ها با موفقیت دریافت شد",
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
export async function updateTag(req) {

  const { id } = req.query;
  try {
    const { title, description, status, isDeleted } = req.body || {};
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status;
    if (isDeleted !== undefined) updateFields.isDeleted = isDeleted;

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
