// Logout handler
const handleLogout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    console.error(response.statusText);
  }
};

// Event listener
document.querySelector("#logout").addEventListener("click", handleLogout);
