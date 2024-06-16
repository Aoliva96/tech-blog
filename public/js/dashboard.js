// Create new post form handler
const handleNewPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector(".title-new").value.trim();
  const content = document.querySelector(".content-new").value.trim();

  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      console.error(response.statusText);
      // Helper function to display error message
      toggleMessage("post-error", "Failed to create post, please try again.");
    }
  }
};

// Show edit form handler
const showEditForm = (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    document.querySelector(`.post-${id}`).classList.toggle("d-none");
    document.querySelector(`.edit-${id}`).classList.toggle("d-none");
  }
};

// Edit post button handler
const handleEditPost = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const title = document.querySelector(".title-edit").value.trim();
    const content = document.querySelector(".content-edit").value.trim();

    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        console.error(response.statusText);
        // Helper function to display error message
        toggleMessage("post-error", "Failed to edit post, please try again.");
      }
    }
  }
};

// Delete post button handler
const handleDeletePost = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      console.error(response.statusText);
      // Helper function to display error message
      toggleMessage("post-error", "Failed to delete post, please try again.");
    }
  }
};

// Event listeners
document
  .querySelector(".new-post-form")
  .addEventListener("submit", handleNewPost);
document
  .querySelector(".edit-post-form")
  .addEventListener("submit", handleEditPost);
document
  .querySelectorAll(".edit-btn")
  .forEach((btn) => btn.addEventListener("click", showEditForm));
document
  .querySelectorAll(".delete-btn")
  .forEach((btn) => btn.addEventListener("click", handleDeletePost));
