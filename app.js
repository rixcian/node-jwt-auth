const passport = require('passport'),
      express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      sequelize = require('./config/database'),
      User = require('./models/User');

sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');

      let app = express();
      app.use(cors());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(passport.initialize());

      app.get('/', async (req, res) => {
        // Find all users
        const users = await User.findAll({
          attributes: ['first_name', 'last_name']
        });
        
        res.json({ users });
      });

      app.post('/new', async (req, res) => {
        const { first_name, last_name } = req.body;

        const jane = await User.create({ id: 10, first_name, last_name });

        console.log("Jane's auto-generated ID:", jane.id);

        res.json({ msg: "User was successfully created." });
      });

      app.listen(3000, () => console.log('Application is running on port 3000 ...'));
    })
    .catch(() => console.error('Unable to connect to the database:', error));
