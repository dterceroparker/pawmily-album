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
    enum: ['Puppy', 'Adult', 'Senior']
},
  photo: String,
  description: String,
  date: Date,
  likes: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  comments: [commentSchema]
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}
