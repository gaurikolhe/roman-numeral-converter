import express, { Request, Response } from 'express';
import cors from 'cors';
import { toRomanNumeral } from './utils/romanNumeral';
import winston from 'winston';
import client from 'prom-client';
import './tracing';

// Configure Winston logger for logging application events and errors
const logger = winston.createLogger({
  level: 'info', // Log level set to 'info' and above
  format: winston.format.json(), // Log format as JSON for structured logging
  transports: [
    new winston.transports.File({ filename: 'app.log' }), // Save logs to app.log file
    new winston.transports.Console(), // Also log to console for development
  ],
});

// Set up Prometheus metrics for monitoring
const register = new client.Registry();
// Collect default metrics (e.g., CPU, memory usage) for Prometheus
client.collectDefaultMetrics({ register });
// Define a custom counter metric for tracking total HTTP requests
const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  registers: [register],
});

// Initialize Express application
const app = express();

// Enable CORS to allow requests from the frontend (http://localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET'], // Allow only GET requests
  allowedHeaders: ['Content-Type'], // Allow only specific headers
}));

// Route to handle Roman numeral conversion
app.get('/romannumeral', (req: Request, res: Response) => {
  // Increment the request counter for Prometheus metrics
  requestCounter.inc();
  // Log the incoming request with the query parameter
  logger.info(`Received request: query=${req.query.query}`);
  try {
    // Extract the query parameter and parse it as an integer
    const query = req.query.query;
    const num = parseInt(query as string, 10);

    // Validate the input: Check if it's a valid number
    if (isNaN(num)) {
      logger.error(`Invalid input: query=${req.query.query}`);
      return res.status(400).send('Invalid input: must be a number');
    }

    // Convert the number to a Roman numeral using the utility function
    const output = toRomanNumeral(num);
    // Log the successful conversion
    logger.info(`Converted ${num} to ${output}`);
    // Send the response with the input and converted Roman numeral
    res.json({ input: num.toString(), output });
  } catch (error) {
    // Log any errors that occur during processing
    logger.error(`Error: ${(error as Error).message}`);
    // Send a 400 status with the error message
    res.status(400).send((error as Error).message);
  }
});

// Route to expose Prometheus metrics for monitoring
app.get('/metrics', async (req: Request, res: Response) => {
  // Set the content type for Prometheus metrics
  res.set('Content-Type', register.contentType);
  // Send the collected metrics as the response
  res.end(await register.metrics());
});

// Start the server on port 8080
app.listen(8080, () => {
  logger.info('Server running on http://localhost:8080');
});