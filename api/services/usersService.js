import {
  newPool
} from '../poolFactory';

const pool = newPool();

export const getUserByEmailAddress = async (email) => {
  let response;
  
  response = await pool.query(`SELECT * FROM users WHERE users."emailAddress" = '${email}';`);

  if (response.rows == null || response.rows.length < 1) {
    //handle no rows, maybe it's okay to just return empty list?
  }
  return response.rows[0];
}

export const createUser = async (newUser) => {
  const response = await pool.query(`INSERT INTO users("emailAddress", "displayName", "imageUrl", "googleId") 
  VALUES('${newUser.emailAddress}', '${newUser.displayName}', '${newUser.imageUrl}', '${newUser.googleId}')`);

  return response;
}