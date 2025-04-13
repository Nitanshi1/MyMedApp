const { model } = require("mongoose");
const User = require("./../db/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // Import axios for making HTTP requests

const RECAPTCHA_SECRET_KEY = "6LcTZkUqAAAAADOybp5SRyQOUVt0i8TnKob1lkPs"; // Replace with your secret key from Google reCAPTCHA
const RECAPTCHA_SECRET_KEY1 = "6LdyfEUqAAAAAF9JDfOIQSzx_PXlCmIttKmzX9Ph";                          
// Function to validate reCAPTCHA
async function validateRecaptcha(recaptchaToken) {
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      }
    );
    return response.data.success; // Return whether the validation was successful
  } catch (error) {
    console.error("Error during reCAPTCHA validation", error);
    return false;
  }
}

async function validateRecaptchaRegister(recaptchaToken) {
    try {
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        null,
        {
          params: {
            secret: RECAPTCHA_SECRET_KEY1,
            response: recaptchaToken,
          },
        }
      );
      return response.data.success; // Return whether the validation was successful
    } catch (error) {
      console.error("Error during reCAPTCHA validation", error);
      return false;
    }
  }

async function registerUser(model) {
  // Validate reCAPTCHA before proceeding with registration
  const isRecaptchaValid = await validateRecaptchaRegister(model.recaptcha);
  if (!isRecaptchaValid) {
    return { success: false, message: "Invalid reCAPTCHA" };
  }
    console.log(isRecaptchaValid);

  const hashPassword = await bcrypt.hash(model.password, 10);
  let user = new User({
    name: model.name,
    email: model.email,
    password: hashPassword,
  });
  await user.save();

  return { success: true, message: "User registered successfully" };
}

async function loginUser(model) {
  // Validate reCAPTCHA before proceeding with login
  const isRecaptchaValid = await validateRecaptcha(model.recaptcha);
  if (!isRecaptchaValid) {
    return { success: false, message: "Invalid reCAPTCHA" };
  }

  const user = await User.findOne({ email: model.email });
  if (!user) {
    return null;
  }

  const isMatched = await bcrypt.compare(model.password, user.password);
  if (isMatched) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      "secret",
      {
        expiresIn: "1h",
      }
    );
    return { token, user, success: true };
  } else {
    return { success: false, message: "Invalid credentials" };
  }
}

module.exports = { registerUser, loginUser };
