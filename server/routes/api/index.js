const router = require('express').Router();
const schoolRoutes = require('./schoolRoutes')
const teacherRoutes = require('./teacherRoutes')
const studentRoutes = require('./studentRoutes')
const userRoutes = require('./userRoutes')

router.use('/schools', schoolRoutes)
router.use('/teachers', teacherRoutes)
router.use('/students', studentRoutes)
router.use('/users', userRoutes)

module.exports = router;