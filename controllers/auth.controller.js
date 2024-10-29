import User from "@/models/user.model";
import generateAccessToken from "@/utils/jwt.util";

// signup
export async function signUpUser(req) {
  try {
    const { email, phone, originalName ,filePath ,avatar} = req.body;
  
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (existingUser) {
      return {
        success: false,
        message: "کاربری با این ایمیل یا شماره تلفن قبلاً ثبت‌نام کرده است. لطفاً به صفحه ورود بروید.",
        redirectToLogin: true,
      };
    }

    const userCount = await User.countDocuments();

    const role = userCount === 0 ? "superAdmin" : "user";  
  
    const status = userCount === 0 ? "active" : "inactive";  

    const user = await User.create({
      ...req.body,
      role: role,  
      status: status,  
      avatar: {
        originalName: originalName || "N/A",
        url: filePath || "uploads/default-avatar.jpg",
      },
     
    });

    const result = await user.save({ validateBeforeSave: true });

    if (result) {
      return {
        success: true,
        message: "ثبت نام شما با موفقیت انجام شد",
      };
    } else {
      return {
        success: false,
        message: "ثبت نام شما با شکست مواجه شد",
      };
    }
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      let message = "مشکلی در ثبت نام وجود دارد.";
      if (field === "email") {
        message = "ایمیل وارد شده قبلاً ثبت شده است. لطفاً از ایمیل دیگری استفاده کنید یا به صفحه ورود بروید.";
      } else if (field === "phone") {
        message = "شماره تلفن وارد شده قبلاً ثبت شده است. لطفاً از شماره دیگری استفاده کنید یا به صفحه ورود بروید.";
      }
      return {
        success: false,
        message: message,
      };
    }

    // خطای عمومی
    return {
      success: false,
      message: `خطا: ${error.message}`,
    };
  }
}



// signin
export async function signInUser(req) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (await user.comparePassword(req.body.password, user.password)) {
        if (user.status === "active") {
          const accessToken = generateAccessToken(user);

          return {
            success: true,
            message: "ورود با موفقیت انجام شد",
            accessToken,
          };
        } else {
          return {
            success: false,
            message: "حساب کاربری شما غیرفعال است",
          };
        }
      } else {
        return {
          success: false,
          message: "رمز عبور اشتباه است",
        };
      }
    } else {
      return {
        success: false,
        message: "کاربری با این ایمیل یافت نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `خطا: ${error.message}`,
    };
  }
}


// forgot password
export async function forgotPassword(req) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const hashedPassword = user.encryptPassword(req.body.password);

      const result = await User.findByIdAndUpdate(user._id, {
        $set: { password: hashedPassword },
      });

      if (result) {
        return {
          success: true,
          message: "Password reset successfully",
        };
      } else {
        return {
          success: false,
          message: "Password reset failed",
        };
      }
    } else {
      return {
        success: false,
        message: "User not found",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// get persist user
export async function persistUser(req) {
  try {
    const user = await User.findById(req.user._id).populate([
      {
        path: "favorite",
        populate: [
          "user",
          {
            path: "rents",
            populate: ["owner"],
          },
        ],
      },
      {
        path: "cart",
        populate: [
          "user",
          {
            path: "rents",
            populate: ["owner"],
          },
        ],
      },
      {
        path: "reviews",
        populate: ["reviewer", "rent"],
      },
      {
        path: "purchases",
        populate: [
          "user",
          {
            path: "rent",
            populate: [
              {
                path: "users",
                populate: [
                  {
                    path: "purchases",
                    populate: ["user", "rent"],
                  },
                ],
              },
              "owner",
              "reviews",
            ],
          },
        ],
      },
      {
        path: "rents",
        populate: [
          {
            path: "users",
            populate: [
              {
                path: "purchases",
                populate: ["user", "rent"],
              },
            ],
          },
          ,
          "owner",
          "reviews",
        ],
      },
    ]);

    if (user) {
      return {
        success: true,
        message: "Successfully fetch user information",
        data: user,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch user information",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
