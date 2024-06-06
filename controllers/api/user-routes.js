const router = require("express").Router();
const { User } = require("../../models");

// Create new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.error("Error creating new user:", err);
    res.status(400).json(err);
  }
});

// Log in user
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.json({
        user: userData,
        message: `Login successful! Welcome ${req.session.username}.`,
      });
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(400).json(err);
  }
});

// Log out user
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      console.log(`Logged out user ${req.session.username}.`);
      res.status(204).end();
    });
  } else {
    console.error("Could not log out user, not found.");
    res.status(404).end();
  }
});

module.exports = router;
