const submitUpdateBtn = document.getElementById("submit-update-btn");
const blogpostTitle = document.getElementById("blog-post-title");
const blogpostContent = document.getElementById("blog-post-content");
const blogpostId = submitUpdateBtn.dataset.id; 

submitUpdateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // let blogpostId = submitUpdateBtn.getAttribute("data-id");
  const title = blogpostTitle.value;
  const content = blogpostContent.value;
  const data = { title, content };

  fetch(`/api/blogpost/${blogpostId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        window.location.href = "/dashboard";
      } else {
        console.log("Error updating blog post");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});