const router = require("express").Router();
const { Comment } = require("../../models");
const auth = require("../../utils/auth");

// Create new comment
router.post("/", auth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.error("Error creating new comment:", err);
    res.status(400).json(err);
  }
});

// Update comment
router.put("/:id", auth, async (req, res) => {
  try {
    const [affectedRows] = await Comment.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      console.error("Could not update comment, not found.");
      res.status(404).end();
    }
  } catch (err) {
    console.error("Error updating comment:", err);
    res.status(500).json(err);
  }
});

// Delete comment
router.delete("/:id", auth, async (req, res) => {
  try {
    const [affectedRows] = Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      console.error("Could not delete comment, not found.");
      res.status(404).end();
    }
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json(err);
  }
});

module.exports = router;
