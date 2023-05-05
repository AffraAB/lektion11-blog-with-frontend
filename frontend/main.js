// View posts
async function getPosts() {
  const postsTable = document.querySelector('#posts');
  const response = await fetch('/api/posts');
  const posts = await response.json();

  posts.forEach((post) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${post.id}</td>
      <td>${post.title}</td>
      <td>${post.content}</td>
    `;
    row.setAttribute('data-id', post.id);
    postsTable.appendChild(row);
  });
}

// Create post
async function createPost() {
  const createPostForm = document.querySelector('#create-post-form');
  createPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const titleInput = createPostForm.querySelector('#title');
    const contentInput = createPostForm.querySelector('#content');

    const post = {
      title: titleInput.value,
      content: contentInput.value,
    };

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });

    const result = await response.json();

    if (result.success) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${result.id}</td>
        <td>${post.title}</td>
        <td>${post.content}</td>
      `;
      row.setAttribute('data-id', result.id);
      const postsTable = document.querySelector('#posts');
      postsTable.appendChild(row);
    } else {
      alert('Error creating post');
    }

    titleInput.value = '';
    contentInput.value = '';
  });
}

// Update post
async function updatePost() {
  const updatePostForm = document.querySelector('#update-post-form');
  const postsTable = document.querySelector('#posts');
  updatePostForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const idInput = updatePostForm.querySelector('#update-id');
    const titleInput = updatePostForm.querySelector('#update-title');
    const contentInput = updatePostForm.querySelector('#update-content');

    const post = {
      title: titleInput.value,
      content: contentInput.value,
    };

    const response = await fetch(`/api/posts/${idInput.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });

    const result = await response.json();
    console.log(result);
    if(result.success) {
      const row = postsTable.querySelector(`tr[data-id="${idInput.value}"]`);
      row.innerHTML = `
        <td>${idInput.value}</td>
        <td>${post.title}</td>
        <td>${post.content}</td>
      `;
  
      idInput.value = '';
      titleInput.value = '';
      contentInput.value = '';
    } else {
      alert('Error updating post');
    }
  });
}

// Delete post
async function deletePost() {
  const deletePostForm = document.querySelector('#delete-post-form');
  const postsTable = document.querySelector('#posts');
  deletePostForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const idInput = deletePostForm.querySelector('#delete-id');

    const response = await fetch(`/api/posts/${idInput.value}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    if (result.success) {
      const row = postsTable.querySelector(`tr[data-id="${idInput.value}"]`);
      row.remove();
    } else {
      alert('Error deleting post');
    }

    idInput.value = '';
  });
}

getPosts();
createPost();
updatePost();
deletePost();