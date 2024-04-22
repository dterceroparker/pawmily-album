import { Post } from "../models/post.js";
import { Profile } from "../models/profile.js";

function newPost(req, res) {
    let offset = new Date().getTimezoneOffset() * 60000
    let oneYearFromNow = new Date().setFullYear(new Date().getFullYear() + 1)
    let localISOTime = new Date(oneYearFromNow - offset).toISOString().slice(0, 16)
    res.render('posts/new', {
      title: 'Add Post'
    })
  } 

function create(req, res) {
  req.body.author = req.user.profile._id
  Post.create(req.body)
  .then(post => {
    res.redirect('/posts')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Post.findById(req.params.postId)
  .populate('author')
  .populate('comments.author')
  .then(post => {
    res.render('posts/show', {
      title: 'Post Details',
      post
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

//profile show function
// function show(req, res) {
//   Profile.findById(req.params.profileId)
//   .then(profile => {
//     Post.find({author: profile._id})
//     .populate('author')
//     .populate('comments.author')
//     .then(post => {
//       res.render('posts/show', {
//         title: 'Post Details',
//         post
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.redirect('/')
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/')
//   })
// }

function index(req, res) {
  Post.find({})
  .populate('author')
  .then(posts => {
    res.render('posts/index', {
      title: 'All Posts',
      posts: posts
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addLikes(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    post.likes.push(req.user.profile._id)
    post.save()
    res.redirect(`/posts/${post._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deletePost(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    if (post.author.equals(req.user.profile._id)) {
      Post.findByIdAndDelete(req.params.postId)
      .then(() => {
        res.redirect("/posts")
      })
      .catch(err => {
        console.log(err)
        res.redirect('/posts')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('posts')
  })
}

function edit(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    if (post.author.equals(req.user.profile._id)) {
        res.render('posts/edit', {
        post,
        title: 'Edit Post',
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function update(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    if (post.author.equals(req.user.profile._id)) {
      post.updateOne(req.body)
      .then(()=> {
        res.redirect(`/posts/${post._id}`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/posts`)
  })
}

function addComment(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    req.body.author = req.user.profile._id
    post.comments.push(req.body)
    post.save()
    .then(()=> {
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteComment(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    post.comments.remove({_id: req.params.commentId})
    post.save()
    .then(() => {
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  newPost as new,
  create,
  show,
  index,
  addLikes,
  deletePost as delete,
  update,
  addComment,
  deleteComment,
  edit
}