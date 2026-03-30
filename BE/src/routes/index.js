import { Router } from 'express'
import authRoutes from './authRoutes.js'
import userRoutes from './userRoutes.js'
import adminRoutes from './adminRoutes.js'
import jobRoutes from './jobRoutes.js'
import cvRoutes from './cvRoutes.js'
const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/admin', adminRoutes)
router.use('/jobs', jobRoutes)
router.use('/cvs', cvRoutes)

export default router