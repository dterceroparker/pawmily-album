import { Profile } from '../models/profile.js'
import { Post } from "../models/post.js";

function showProfilePosts(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    Post.find({author: profile._id})
    .populate('author')
    .populate('comments.author')
    .then(posts => {
      res.render('profiles/show', {
        title: 'My Album',
        posts
      })
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
  showProfilePosts,
}