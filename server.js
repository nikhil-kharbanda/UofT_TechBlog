const path = require("path");
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const expbs = require("express-handlebars");
const mysql = require('mysql2')
const helpers = require('./utils/helpers');
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = expbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", 'handlebars');

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening to.."));
});