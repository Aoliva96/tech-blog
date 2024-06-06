module.exports = {
  // Format date as MM/DD/YYYY
  formatDate: (date) => {
    return date.toLocaleDateString();
  },
  // Format large numbers with commas
  formatAmount: (amount) => {
    return parseInt(amount).toLocaleString();
  },
  // Toggle element visibility
  toggleMessage: (elementName, newContent) => {
    const element = document.getElementById(elementName);
    if (element) {
      element.innerHTML = "";
      if (newContent) {
        element.innerHTML = newContent;
      }
      element.style.display =
        element.style.display === "none" ? "block" : "none";
    }
  },
};
