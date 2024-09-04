import Category from '@/models/category.model';

// Add a new category
export async function addCategory(req) {
  try {
    const { title, description } = req.body;

    const category = await Category.create({
      title,
      description,
    });
    if (category) {
      return {
        success: true,
        message: "دسته بندی با موفقیت ایجاد شد",
      };
    } else {
      return {
        success: false,
        message: "خطا در ساخت دسته بندی",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getCategories() {
  try {
    const categories = await Category.find({ isDeleted: false }); // Retrieve all categories from the database

    if (categories.length > 0) {
      return {
        success: true,
        data: categories,
        message: "دسته بندی با موفقیت دریافت شد",
      };
    } else {
      return {
        success: false,
        message: "هیچ دسته بندی یافت نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
export async function updateCategory(req) {


  try {
    const { id } = req.query;
    const { title, description, status, isDeleted } = req.body || {};
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status;
    if (isDeleted !== undefined) updateFields.isDeleted = isDeleted;

    const category = await Category.findByIdAndUpdate(id, updateFields, { new: true });

    if (category) {
      return {
        success: true,
        message: "دسته‌بندی با موفقیت به‌روزرسانی شد",
        data: category,
      };
    } else {
      return {
        success: false,
        message: "دسته‌بندی پیدا نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
