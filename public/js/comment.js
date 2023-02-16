const commentFormHandler = async (event) => {
  event.preventDefault();

  console.log("comment JS is WORKING!!!");

  const content = document.querySelector("#content").value.trim();
  const post_id = event.target.dataset.postsid;
  console.log(content);

  if (content && post_id) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(response);
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".content")
  .addEventListener("submit", commentFormHandler);
