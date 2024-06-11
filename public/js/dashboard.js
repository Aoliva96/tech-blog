import { toggleMessage } from "./helpers";

// Create new post form handler
const handleNewPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

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
  .querySelector("#new-post-form")
  .addEventListener("submit", handleNewPost);
document
  .querySelector("#post-list")
  .addEventListener("click", handleDeletePost);
