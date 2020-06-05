const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const compression = require('compression');
const colors = require('colors');

// Load environment variables: specify path of the ENV file
dotenv.config({ path: './.env' });

// inistantiate App
const app = express();

//================================================================
//                      connect to DB
//================================================================
const connectDB = require('./_db/db');
connectDB();


// Middlewares
if (process.env.NODE_ENV === "development") {                           // Logging middleware
  app.use(morgan("dev"));
} else {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
  app.use(morgan('combined', {stream: accessLogStream}));
}
app.use(bodyParser.json());                                             // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));                     // to support URL-encoded bodies
app.use(cookieParser());                                                // Cookie parser
app.use(mongoSanitize());                                               // Sanitize
app.use(helmet());                                                      // Set Security Headers
app.use(xss());                                                         // Prevent cross-site-scripting
app.use(hpp());                                                         // Prevent http param pollution
app.use(cors());                                                        // Enable Cross Origin Resource Sharing
app.use(rateLimit({ windowMs: 10 * 60 * 1000, max: 100 }));             // Rate limiting: 100 requests per 10 minutes
app.use(compression());                                                 // Compress CSS & JS Assests


// set static folder
app.use(express.static(path.join(__dirname, 'public')));


//================================================================
//                        Mount Routes
//================================================================
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/categories', require('./routes/categories'));
// Catch 404 
app.use((req, res, next) => {
	res.status(404).json({ success: false, error: "Endpoint Not Found" });
});


// Custom Error Handler Middleware
app.use(errorHandler);




const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT, 
  console.log(`\n` + ` Server running in ${process.env.NODE_ENV} mode on port ${PORT} `.black.bgBrightYellow + ` ...🚀`)
);

//================================================================
//         Handle Unhandled-Promise-Rejections Globally
//================================================================
process.on('unhandledRejection', (err, promise) => {
    console.log(`\n❌ Error: `+` ${err.message} `.white.bgRed+`\n`);
    // close server & exit process with failure
    server.close(() => process.exit(1));
});




