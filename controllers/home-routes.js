const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const auth = require("../utils/auth");

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
          attributes: ["comment_text", "user_id", "post_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    // Serialize for template parsing
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data/session flag to template
    res.render("homepage", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    console.error("Error getting all posts:", err);
    res.status(500).json(err);
  }
});

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
          attributes: ["comment_text", "user_id", "post_id", "created_at"],
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

    const post = postData.get({ plain: true });

    res.render("single-post", { ...post, logged_in: req.session.logged_in });
  } catch (err) {
    console.error("Error getting post:", err);
    res.status(500).json(err);
  }
});

// Use auth to protect user dashboard route
router.get("/dashboard", auth, async (req, res) => {
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
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
