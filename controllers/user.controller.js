import Cart from "@/models/cart.model";
import Favorite from "@/models/favorite.model";
import Purchase from "@/models/purchase.model";
import Rent from "@/models/rent.model";
import Review from "@/models/review.model";
import User from "@/models/user.model";
import removePhoto from "@/utils/remove.util";

// دریافت تمام کاربران
export async function getUsers() {
  try {
    const users = await User.find().populate([
      "rents",
      {
        path: "purchases",
        populate: [
          "user",
          {
            path: "rent",
            populate: ["users", "owner", "reviews"],
          },
        ],
      },
    ]);

    if (users) {
      return {
        success: true,
        message: "کاربران با موفقیت دریافت شدند",
        data: users,
      };
    } else {
      return {
        success: false,
        message: "دریافت کاربران با شکست مواجه شد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// دریافت اطلاعات یک کاربر
export async function getUser(req) {
  try {
    const user = await User.findById(req.query.id);

    if (user) {
      return {
        success: true,
        message: "اطلاعات کاربر با موفقیت دریافت شد",
        data: user,
      };
    } else {
      return {
        success: false,
        message: "دریافت اطلاعات کاربر با شکست مواجه شد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// بروزرسانی اطلاعات کاربر
export async function updateUser(req) {
  try {
    const user = await User.findById(req.query.id);

    if (!user) {
      return {
        success: false,
        message: "کاربر پیدا نشد",
      };
    } else {
      const updatedUser = req.body;

      if (req.file && req.file.path && req.file.filename) {
        await removePhoto(user.avatar.public_id);

        updatedUser.avatar = {
          url: req.file.path,
          public_id: req.file.filename,
        };
      }

      const result = await User.findByIdAndUpdate(user._id, {
        $set: updatedUser,
      });

      if (result) {
        return {
          success: true,
          message: "اطلاعات کاربر با موفقیت بروزرسانی شد",
        };
      } else {
        return {
          success: false,
          message: "بروزرسانی اطلاعات کاربر با شکست مواجه شد",
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// حذف یک کاربر
export async function deleteUser(req) {
  try {
    const user = await User.findByIdAndDelete(req.query.id);

    if (!user) {
      return {
        success: false,
        message: "کاربر پیدا نشد",
      };
    } else {
      await removePhoto(user.avatar.public_id);

      // حذف لیست علاقه‌مندی‌های کاربر
      if (user.favorite) {
        Favorite.findByIdAndDelete(user.favorite);
      }

      // حذف سبد خرید کاربر
      if (user.cart) {
        Cart.findByIdAndDelete(user.cart);
      }

      // حذف کاربر از تمام اجاره‌ها
      if (user.rents.length > 0) {
        for (let i = 0; i < user.rents.length; i++) {
          const rent = await Rent.findByIdAndDelete(user.rents[i]);

          rent.gallery.forEach(
            async (image) => await removePhoto(image.public_id)
          );

          // حذف از سبد خرید تمام کاربران
          await Cart.updateMany(
            {},
            {
              $pull: {
                rents: rent._id,
              },
            }
          );

          // حذف از لیست علاقه‌مندی‌های تمام کاربران
          await Favorite.updateMany(
            {},
            {
              $pull: {
                rents: rent._id,
              },
            }
          );

          rent.users.forEach(async (user) => {
            const review = await Review.findOne({ reviewer: user });
            const purchase = await Purchase.findOne({ user: user });

            if (review) {
              await User.findByIdAndUpdate(review.reviewer, {
                $pull: {
                  reviews: review?._id,
                },
              });
            }

            if (purchase) {
              await User.findByIdAndUpdate(purchase.user, {
                $pull: {
                  purchases: purchase?._id,
                },
              });
            }

            // حذف از لیست خریدها
            await Purchase.deleteMany({ rent: rent._id });

            // حذف از لیست نظرات
            await Review.deleteMany({ rent: rent._id });
          });
        }
      }

      // حذف خریدهای کاربر
      if (user.purchases.length > 0) {
        for (let i = 0; i < user.purchases.length; i++) {
          await Purchase.findByIdAndDelete(user.purchases[i]);
        }
      }

      // حذف نظرات کاربر
      if (user.reviews.length > 0) {
        for (let i = 0; i < user.reviews.length; i++) {
          await Review.findByIdAndDelete(user.reviews[i]);
        }
      }

      return {
        success: true,
        message: "کاربر با موفقیت حذف شد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
