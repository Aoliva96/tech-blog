// Check user login status
const checkLogin = async () => {
  const response = await fetch("/api/users/", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

// Show/hide comment form and delete buttons based on user login status
checkLogin().then((data) => {
  if (data.logged_in) {
    document.querySelector(".new-comment-container").classList.remove("hidden");
  } else {
    document.querySelector(".new-comment-container").classList.add("hidden");
  }

  if (data.id) {
    // If user is logged in, show delete buttons for comments they own
    document.querySelectorAll(".comment").forEach((comment) => {
      const userId = parseInt(comment.getAttribute("data-user-id"));

      if (data.id === userId) {
        comment.querySelector(".delete-btn").classList.remove("hidden");
        comment.querySelector(".comment-divider").classList.remove("hidden");
      } else {
        comment.querySelector(".delete-btn").classList.add("hidden");
        comment.querySelector(".comment-divider").classList.add("hidden");
      }
    });
  } else {
    // If user is not logged in, hide all delete buttons
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.classList.add("hidden");
    });
    document.querySelectorAll(".comment-divider").forEach((divider) => {
      divider.classList.add("hidden");
    });
  }
});

// Add new comment handler
const handleNewComment = async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute("data-id");
  const content = document.querySelector(".content-comment").value.trim();

  if (content) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ content, post_id: id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      console.error(response.statusText);
      // Helper function to display error message
      toggleMessage(
        "new-comment-error",
        "Failed to add comment, please try again."
      );
    }
  }
};

// Delete comment handler
const handleDeleteComment = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-comment-id")) {
    const id = event.target.getAttribute("data-comment-id");

    console.log("id:", id); // Debug

    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      console.error(response.statusText);
      // Helper function to display error message
      toggleMessage(
        `comment-error-${id}`,
        "Failed to delete comment, please try again."
      );
    }
  }
};

// Event listeners
document
  .querySelector(".new-comment-form")
  .addEventListener("submit", handleNewComment);
document
  .querySelectorAll(".delete-btn")
  .forEach((btn) => btn.addEventListener("click", handleDeleteComment));
