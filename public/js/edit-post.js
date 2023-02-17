// const postId = document.querySelector('input[name="post-id"]').value;

// const editFormHandler = async (event) => {
//     event.preventDefault();
  
//     const postTitle = document.querySelector('input[name="post-title"]').value;
//     const postContent = document.querySelector('textarea[name="post-body"]').value;
  
//     console.log(postTitle);
//     console.log(postContent);
  
//     const response = await fetch(`/api/post/${postId}`, {
//       method: 'PUT',
//       body: JSON.stringify({
//         postTitle,
//         postContent,
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
  
//     console.log(response);
//     if (response.ok) {
//       document.location.replace('/dashboard');
//     } else {
//       alert('Failed to update your post');
//     }
//     document.location.replace('/dashboard');
//   };
  
//   const deleteClickHandler = async () => {
//     await fetch(`/api/post/${postId}`, {
//       method: 'DELETE'
//     });
  
//     document.location.replace('/dashboard');
//   };

//   document
//     .querySelector('#edit-post-form')
//     .addEventListener('submit', editFormHandler);
//   document
//     .querySelector('#delete-btn')
//     .addEventListener('submit', deleteClickHandler);


async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document.querySelector('input[name="content"]').value.trim();
  console.log(title);
  console.log(content);

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
    
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        post_id: id,
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }

}

document
.querySelector('.edit-post-form')
.addEventListener('submit', editFormHandler);