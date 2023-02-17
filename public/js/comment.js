// const commentFormHandler = async (event) => {
//   event.preventDefault();

//   console.log("comment JS is WORKING!!!");

//   const content = document.querySelector("#content").value.trim();
//   const post_id = event.target.dataset.postsid;
//   console.log(content);

//   if (content && post_id) {
//     const response = await fetch("/api/comments", {
//       method: "POST",
//       body: JSON.stringify({ content, post_id }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       console.log(response);
//       document.location.reload();
//     } else {
//       alert(response.statusText);
//     }
//   }
// };

// document
//   .querySelector(".content")
//   .addEventListener("submit", commentFormHandler);

async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document
    .querySelector('input[name="comment-body"]')
    .value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
      document.querySelector("#comment-form").style.display = "block";
    }
  }
}

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
