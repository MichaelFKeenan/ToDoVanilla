import {
  newPool
} from '../poolFactory';

const pool = newPool();

export const getUsers = async () => {
  let response;
  
  response = await pool.query('SELECT * FROM users;');

  if (response.rows == null || response.rows.length < 1) {
    //handle no rows, maybe it's okay to just return empty list?
  }

  const mappedUsers = response.rows.map(mapUser);

  return mappedUsers;
}

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

const mapUser = (category) => {
  return {
    "Id": category.id,
    "DisplayName": category.displayName,
    "EmailAddress": category.emailAddress,
    "ImageUrl": category.imageUrl,
    "GoogleId": category.googleId,
  };
}