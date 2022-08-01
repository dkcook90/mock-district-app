//using our Router method within express
const router = require('express').Router();
//allows usage of the api folder
const apiRoutes = require('./api');

//for any route in the api folder, put /api on the endpoint
router.use('/api', apiRoutes);

module.exports = router;