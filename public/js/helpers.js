// Format date as MM/DD/YYYY
function formatDate(date) {
  return date.toLocaleDateString();
}

// Toggle element visibility
function toggleMessage(elementName, newContent) {
  const element = document.getElementById(elementName);
  if (element) {
    const message = element.querySelector(".message");
    if (message) {
      message.innerHTML = newContent ? newContent : "";
    }
    element.classList.remove("hidden");
  }
}

// Scroll to top of page
function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
