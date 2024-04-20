import { Post } from "../models/post.js";

function newPost(req, res) {
  try {
    let offset = new Date().getTimezoneOffset() * 60000
    let oneYearFromNow = new Date().setFullYear(new Date().getFullYear() + 1)
    let localISOTime = new Date(oneYearFromNow - offset).toISOString().slice(0, 16)
    res.render('posts/new', {
      title: 'Add Post'
    })
  } catch (error) {
    console.log(error)
    res.redirect('/posts')
  }
} 

export {
  newPost as new,
}