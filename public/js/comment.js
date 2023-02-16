const commentFormHandler = async (event) => {
  event.preventDefault();

  console.log("comment JS is WORKING!!!");

  const content = document.querySelector("#content").value.trim();
  console.log(content);

  if (content) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content }),
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
