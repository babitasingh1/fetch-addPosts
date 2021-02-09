const fetchButton = document.querySelector('#available-posts button');
const postTemplate = document.getElementById('single-post');
const listElement = document.querySelector('.posts');
const addBtn = document.querySelector('#new-post button');
const form = document.querySelector('#new-post form');
const postList = document.querySelector('ul');

async function fetchPosts() {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );

    const listOfPosts = response.data;

    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector('h2').textContent = post.title.toUpperCase();
      postEl.querySelector('p').textContent = post.body;

      // assign id property of each li to the fetched post id..will use to identify the li at the time of delete
      postEl.querySelector('li').id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    alert(error.message);
  }
}

async function submitPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };
  try {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      post
    );
  } catch (error) {
    console.log(error.message);
  }
}

async function deletePost(postId) {
  try {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    console.log(postId);
    console.log('post selected to delete');
  } catch (error) {
    console.log(error.message);
  }
}

fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(event.currentTarget);
  const enteredTitle = event.currentTarget.querySelector('#title').value;
  const enteredContent = event.currentTarget.querySelector('#content').value;
  submitPost(enteredTitle, enteredContent);
});

postList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const postId = event.target.closest('li').id;
    deletePost(postId);
  }
});
