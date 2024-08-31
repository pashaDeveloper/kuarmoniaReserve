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

export async function getCategories(req) {
  try {
    const categories = await Category.find({}); // Retrieve all categories from the database

    if (categories.length > 0) {
      return {
        success: true,
        data: categories,
        message: "Categories retrieved successfully",
      };
    } else {
      return {
        success: false,
        message: "No categories found",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
