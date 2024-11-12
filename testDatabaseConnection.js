// testDatabaseConnection.js
import connectToDatabase from './api/config/database.js';

// Call the function to test the database connection
(async () => {
  try {
    await connectToDatabase();
    console.log('Test successful: Database connected');
    process.exit(0); // Exit after successful connection
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit with an error code if there's an issue
  }
})();
