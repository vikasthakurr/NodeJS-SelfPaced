const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = [];

  if (!username || username.trim().length < 3) {
    errors.push({
      username: "Username is required and must be at least 3 characters long",
    });
  }
  if (!email || !email.includes("@") || !email.includes(".")) {
    errors.push({ email: "email is required and must be a valid email" });
  }
  if (!password || password.length < 6) {
    errors.push({
      password: "Password is required and must be at least 6 characters long",
    });
  }
  if (errors.length > 0) return res.status(400).json({ errors });

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !email.includes("@") || !email.includes(".")) {
    errors.push({ email: "email is required and must be a valid email" });
  }
  if (!password) {
    errors.push({ password: "Password is required" });
  }
  if (errors.length > 0) return res.status(400).json({ errors });

  next();
};

export { validateLogin, validateRegister };
