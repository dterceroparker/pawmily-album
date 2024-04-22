import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as postsCtrl from '../controllers/posts.js'

const router = Router()

router.get('/', isLoggedIn, postsCtrl.index)

router.get('/new', isLoggedIn, postsCtrl.new) 

router.post('/', isLoggedIn, postsCtrl.create)

router.get('/:postId', isLoggedIn, postsCtrl.show)

router.delete('/:postId', isLoggedIn, postsCtrl.delete)

router.patch('/:postId/likes', isLoggedIn, postsCtrl.addLikes)

router.post('/:postId/comments', isLoggedIn, postsCtrl.addComment)

router.delete('/:postId/comments/:commentId', isLoggedIn, postsCtrl.deleteComment)


export {
  router
}
