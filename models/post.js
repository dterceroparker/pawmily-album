import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  content: String,
}, {
  timestamps: true
})

const postSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  stage: {
    type: String,
    enum: ['Puppy', 'Adult', 'Sage']
},
  photo: String,
  description: String,
  date: Date,
  likes: [{
    type: Schema.Types.ObjectId, ref: 'Profile',
    // let like = localStorage.getItem
  }],
  comments: [commentSchema]
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}
