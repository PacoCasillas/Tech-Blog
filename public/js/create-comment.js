const submitNewComment = document.getElementById("submit-create-comment-btn");

submitNewComment.addEventListener("click", (e) => {
  e.preventDefault();
  const blogpostComment = document.getElementById("comment-text");
  const comment = blogpostComment.value;
  if (comment === "") {
    alert("Please fill out a comment");
    return;
  }
  const blogpostId = submitNewComment.dataset.blogpostId; 
  
  const data = { 
    commented_text: comment, 
    blogpost_id: blogpostId
};
//   fetch(`/api/comments`, {
    fetch(`/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        window.location.href = "/";
      } else {
        console.log("Error creating comment");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});