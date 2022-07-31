const routes = require('./routes')
const express = require('express');
//part of node
const path = require('path')
const sequelize = require('./config/connection');

//setting the express library to "app" for use later
const app = express();
//declairing our port as 3001 and also setting a process.env port for deployment
const PORT = process.env.PORT || 3001;

//allows application to accept json requests
app.use(express.json());
//allows the use of req.params
app.use(express.urlencoded({ extended: true }));
//allowing the express library to use our routes folder and therefore all routes we have built out
app.use(routes);
//serves build folder which will run react front end to the client after app is deployed
app.use(express.static(path.join(__dirname, '../client/build')))

//connects to database and runs while server is listening (app.listen)
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});