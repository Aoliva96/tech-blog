module.exports = {
  // Format date as MM/DD/YYYY
  formatDate: (date) => {
    return date.toLocaleDateString();
  },
  // Toggle element visibility
  toggleMessage: (elementName, newContent) => {
    const element = document.getElementById(elementName);
    if (element) {
      const message = element.querySelector(".message");
      if (message) {
        message.innerHTML = newContent ? newContent : "";
      }
      element.style.display =
        element.style.display === "none" ? "block" : "none";
    }
  },
};
