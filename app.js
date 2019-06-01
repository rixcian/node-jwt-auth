const mongoose = require('mongoose'),
      passport = require('passport'),
      express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      dbConfig = require('./config/database');

// Connection to MongoDB database
mongoose.connect(dbConfig.server, { useCreateIndex: true, useNewUrlParser: true });

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Page is under construction!');
});

app.use('/api', require('./routes/api'));

app.listen(3000, () => console.log('Application is running on port 3000 ...'));
