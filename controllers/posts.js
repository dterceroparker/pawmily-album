import { Post } from "../models/post.js";

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
      title: 'My Album',
      post
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
}