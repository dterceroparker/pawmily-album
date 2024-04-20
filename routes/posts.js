import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as postsCtrl from '../controllers/posts.js'

const router = Router()

//GET localhost:3000/posts/new
router.get('/new', postsCtrl.new) 

export {
  router
}
