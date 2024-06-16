const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const auth = require("../utils/auth");

// Endpoint: / (homepage)
// =======================

// Get all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["content", "user_id", "post_id", "date_created"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    // Serialize for template
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data/session flag to template
    res.render("homepage", { posts, logged_in: req.session.logged_in });
    // Test JSON response
    // res.status(200).json(posts);
  } catch (err) {
    console.error("Error getting all posts:", err);
    res.status(500).json(err);
  }
});

// Get single post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["content", "user_id", "post_id", "date_created"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with specified id." });
      return;
    }

    // Serialize data for template
    const post = postData.get({ plain: true });
    // Pass serialized data/session flag to template
    res.render("post", { post, logged_in: req.session.logged_in });
    // Test JSON response
    // res.status(200).json(post);
  } catch (err) {
    console.error("Error getting post:", err);
    res.status(500).json(err);
  }
});

// Auth protected user dashboard route
router.get("/dashboard", auth, async (req, res) => {
  if (req.session.logged_in) {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        include: [{ model: Post }],
      });

      const user = userData.get({ plain: true });

      res.render("dashboard", { ...user, logged_in: true });
    } catch (err) {
      console.error("Error getting user data:", err);
      res.status(500).json(err);
    }
  } else {
    res.redirect("/login");
  }
});

// Logged in user redirect
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  } else {
    res.render("login");
  }
});

module.exports = router;
