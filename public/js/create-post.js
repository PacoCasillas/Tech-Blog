const submitNewBlogpost = document.getElementById("#submit-create-blogpost-btn");
const blogpostTitle = document.getElementById("#create-blogpost-title");
const blogpostContent = document.getElementById("#create-blogpost-content");

submitNewBlogpost.addEventListener("click", (e) => {
  e.preventDefault();
  const title = blogpostTitle.value;
  const content = blogpostContent.value;
  if (title === "" || content === "") {
    alert("Please fill out all fields");
    return;
  }
  const data = { title, content };
  fetch("/api/blogpost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        // Redirect to the dashboard
        window.location.href = "/dashboard";
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
