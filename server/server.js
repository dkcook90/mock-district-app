const routes = require('./routes')
const express = require('express');
const sequelize = require('./config/connection');

//setting the express library to "app" for use later
const app = express();
//declairing our port as 3001 and also setting a process.env port for deployment
const PORT = process.env.PORT || 3001;

//allows application to accept json requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//allowing the express library to use our routes folder and therefore all routes we have built out
app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});