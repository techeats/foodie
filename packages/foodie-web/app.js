const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const exphbs = require('express-handlebars');
const helmet = require('helmet');
const path = require('path');
const Router = require('./router');

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.set('trust proxy', 1); // trust first proxy

const viewsPath = path.resolve('views');
const publicPath = path.resolve('public');

app.get('*.js.gz', (req, res, next) => {
  // req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.use(express.static(publicPath));

app.set('view cache', true);
app.set('views', viewsPath);
app.set('view engine', 'handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.use('/', Router);

/**
 * TODO
 * - Create 404 error
 */
// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).render('Error404');
});

app.use((error, req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.status(500).render('Error500');
  } else {
    res.status(error.status || 500).json({ body: error.message });
  }
});

module.exports = app;
