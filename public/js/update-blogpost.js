// update-blogpost.js
document.addEventListener("DOMContentLoaded", () => {
    // Add event listener to each "Update" button
    const updateButtons = document.querySelectorAll(".update-post-button");
    updateButtons.forEach((button) => {
      button.addEventListener("click", handleUpdate);
    });
  });
  
  async function handleUpdate(event) {
    event.preventDefault();
  
    // Get the blog post ID from the data attribute
    const postId = event.currentTarget.dataset.postId;
  
    // Fetch the current content of the blog post
    const response = await fetch(`/api/blogposts/${postId}`);
    if (!response.ok) {
      // Handle error
      console.log("Error retrieving blog post");
      return;
    }
  
    const postData = await response.json();
    const currentContent = postData.blogPost_content;
  
    // Prompt the user for the new content
    const newContent = prompt("Enter the new content:", currentContent);
    if (newContent === null) {
      // User clicked cancel
      return;
    }
  
    // Send the updated content to the server
    const updateResponse = await fetch(`/api/blogposts/${postId}/content`, {
      method: "PATCH",
      body: JSON.stringify({ content: newContent }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!updateResponse.ok) {
      // Handle error
      console.log("Error updating blog post");
      return;
    }
  
    // Reload the page to see the updated content
    location.reload();
  }