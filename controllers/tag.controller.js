import tag from '@/models/tag.model';

// Add a new tag
export async function addTag(req) {
  try {
    const { title, description } = req.body;

    const tag = await tag.create({
      title,
      description,
    });
    if (tag) {
      return {
        success: true,
        message: " تگ با موفقیت ایجاد شد",
      };
    } else {
      return {
        success: false,
        message: "خطا در ساخت تگ",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getTags() {
  try {
    const tags = await tag.find({ isDeleted: false }); // Retrieve all categories from the database
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


  try {
    const { id } = req.query;
    const { title, description, status, isDeleted } = req.body || {};
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status;
    if (isDeleted !== undefined) updateFields.isDeleted = isDeleted;

    const tag = await tag.findByIdAndUpdate(id, updateFields, { new: true });

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
