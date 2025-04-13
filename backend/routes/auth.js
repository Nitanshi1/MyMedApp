const express = require("express");
const { registerUser, loginUser } = require("../handlers/auth-handler"); // Ensure loginUser is imported
const router = express.Router();

router.post("/register", async (req, res) => {
  const model = req.body;
   console.log(model)
  // Check if all required fields are present
  if (model.name && model.email && model.password && model.recaptcha) {
    try {
      await registerUser(model);
      res.status(201).json({
        message: "User registered!",
      });
    } catch (err) {
      res.status(500).json({
        error: "An error occurred while registering the user.",
        details: err.message,
      });
    }
  } else {
    res.status(400).json({
      error: "Please provide name, email, and password.",
    });
  }
});

router.post("/login", async (req, res) => {
  const model = req.body;

  // Check if both email and password are provided
  if (model.email && model.password && model.recaptcha) {
    try {
      const result = await loginUser(model);

      if (result.success==true) {
        res.json(result); // Send the login result (e.g., token or user data)
      } else {
        res.status(400).json({
          error: "Email or password is incorrect.",
        });
      }
    } catch (err) {
      res.status(500).json({
        error: "An error occurred during login.",
        details: err.message,
      });
    }
  } else {
    res.status(400).json({
      error: "Please provide email and password.",
    });
  }
});

module.exports = router;
