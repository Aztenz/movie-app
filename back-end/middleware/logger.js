const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Define a write stream to log requests to a text file
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

// Create a custom morgan token for logging the request body
morgan.token('req-body', (req) => JSON.stringify(req.body));

// Define the log format
const logFormat = ':date[iso] :method :url :status :res[content-length] - :response-time ms :req-body';

// Create a logger middleware
const loggerMiddleware = morgan(logFormat, { stream: accessLogStream });

module.exports = loggerMiddleware;
