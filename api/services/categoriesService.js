import {
  newPool
} from '../poolFactory';

const pool = newPool();

export const getCategories = async () => {
  const response = await pool.query('SELECT * FROM categories;');
  
  if (response.rows == null || response.rows.length < 1) {
    //handle no rows, maybe it's okay to just return empty list?
  }

  const mappedCategories = response.rows.map(mapCategory);

  return mappedCategories;
}

export const createCategory = async (newCategory) => {
  const response = await pool.query(`INSERT INTO categories(name) 
  VALUES('${newCategory.Name}')`);

  if (response.rows == null || response.rows.length < 1) {
    //handle no rows, maybe it's okay to just return empty list?
  }

  return response;
}

const mapCategory = (category) => {
  return {
    "Id": category.id,
    "Name": category.name,
  };
}