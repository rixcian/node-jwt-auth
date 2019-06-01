## Node REST JWT Authentication
<br />

It's a simple Node REST JWT authentication server that is built with Mongoose and Passport.

<br />

---

### How to test it?
- `git clone <this_repo_url>`
- `cd node-jwt-auth`
- `yarn install` or `npm install`
- Go to `config/database.js` and set MongoDB server address *(You can also change server secret, but it's not necessary)*
- `yarn run server` or `npm run server`
- The server starts running on `http:localhost:3000/api/`

### Routes
##### `[POST] http:localhost:3000/api/register`
- Request body: `{"username": "your_username", "email": "your@email.com", "password": "your_password"}`
- Returns register status

<br />

##### `[POST] http:localhost:3000/api/login`
- Request body: `{"username": "your_username", "password": "your_password"}`
- Returns JWT token

<br />

##### `[GET] http:localhost:3000/api/games`
- Request header [Authorization]: `<JWT_token>`
- Returns list of games