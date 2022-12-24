const express = require('express');
const connectDB = require('./db');
var cors = require('cors');
const bodyParser = require('body-parser')

var whitelist = ['https://localhost:8082/', 'http://example.com/']
var corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const app = express();
//body-parse
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// cors 
app.use(cors(corsOptions));

// Connect Database
connectDB();


// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.json());

// link the router
// app.use(require('./router/auth'));
// // app.use(require('./router/userauth.js'));
// app.use(require('./router/answer/AnswerCrud.js'));
// app.use(require('./router/question/QuestionCrud.js'));
// app.use(require('./router/question/QuestionPublic.js'));
// app.use(require('./router/user/UserProfile.js'));

// Middleware
const middleware = (req, res, next) => {
  console.log("Hello my middleware");
  next();
}
// middleware();

app.get('/', (req, res) => {
  console.log("Hello Askoverflosw!!");
  res.send('Hello Askoverflosw!!')
});

app.get('/contact', middleware, (req, res) => {
  console.log("Hello my contact");
  res.send('Hello Contact')
});

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));