const express = require('express');
const app = express();
const { render } = require('ejs');
const frontRoutes = require('./routes/frontRoutes');
const methodOverride = require('method-override');
const frontController = require('./controllers/frontController');
const bodyParser = require('body-parser').json({limit: '50mb'});

//////////// Start the server ////////////

app.listen(5550, () => console.log('Omar listening'));

//////////// Middlewears ////////////

app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(methodOverride('_method'));
app.use(bodyParser);

//////////// Main routes ////////////

app.get('/', frontController.home_get);
app.get('/404', (req, res) => {
    res.status(404).render('404', { title: '404'});
});

app.use(frontRoutes);

app.use((req, res) => {
    res.redirect('/404');
});

