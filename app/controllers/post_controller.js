import Post from '../models/post_model';

const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags };
  });
};

export const createPost = (req, res) => {
  // res.send('post should be created here\n');
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.author = req.user;
  console.log(`post from createPost back: ${post}`);
  post.save()
  .then(result => {
    console.log(`author: ${post.author}`);
    res.json({ message: 'Post created!' });
  })
  .catch(error => {
    console.log('create error');
    res.json({ error });
  });
};
export const getPosts = (req, res) => {
  // res.send('posts should be returned\n');
  Post.find()
  .then(result => {
    res.json(cleanPosts(result));
  })
  .catch(error => {
    res.json({ error });
  });
};
export const getPost = (req, res) => {
  // res.send('single post looked up\n');
  Post.findById(req.params.id)
  .populate('author')
  .then(result => {
    res.json(result);
  })
  .catch(error => {
    res.json({ error });
  });
};
export const deletePost = (req, res) => {
  // res.send('delete a post here\n');
  Post.remove({ _id: req.params.id })
  .then(result => {
    res.json({ message: 'Deleted post!' });
  })
  .catch(error => {
    res.json({ error });
  });
};
export const updatePost = (req, res) => {
  // res.send('update a post here\n');
  const postBody = req.body;
  Post.findById(req.params.id)
  .then(result => {
    for (const [key, value] of req.body) {
      postBody[key] = value;
    }
  });
  Post.update({ _id: req.params.id }, postBody)
  .then(result => {
    res.json(result);
  })
  .catch(error => {
    res.json({ error });
  });
};
