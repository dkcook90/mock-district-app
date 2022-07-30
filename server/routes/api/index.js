const router = require('express').Router();
const schoolRoutes = require('./schoolRoutes')
const teacherRoutes = require('./teacherRoutes')
const studentRoutes = require('./studentRoutes')

router.use('/schools', schoolRoutes)
router.use('/teachers', teacherRoutes)
router.use('/students', studentRoutes)