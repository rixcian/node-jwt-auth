const morgan = require('morgan'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      express = require('express'),
      cors = require('cors'),
      dbConfig = require('./config/database');

// Connection to MongoDB database
mongoose.connect(dbConfig.server);

let app = express();
app.use(cors());
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Page is under construction!');
});

app.use('/api', require('./routes/api'));
