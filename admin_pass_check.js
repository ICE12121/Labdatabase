const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// Set up your database connection here
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'P@ssw0rd',
  port: 5432,
});

async function verifyUser(username, inputPassword) {
  try {
    // Query the database for the user's details
    const result = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      
      // Compare the input password with the stored hashed password
      const match = await bcrypt.compare(inputPassword, user.password);

      if (match) {
        // Passwords match
        console.log("User verified");
        return true;
      } else {
        // Passwords don't match
        console.log("Password incorrect");
        return false;
      }
    } else {
      // User does not exist
      console.log("User not found");
      return false;
    }
  } catch (err) {
    // Handle errors with the query
    console.error(err);
    return false;
  }
}
// You would call verifyUser from within your login route, passing in the credentials supplied by the user.