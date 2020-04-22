import {
  newPool
} from '../poolFactory';

const pool = newPool();

export const getItems = async () => {
  const response = await pool.query(itemsDisplayQuery);

  if (response.rows == null || response.rows.length < 1) {
    //handle no rows, maybe it's okay to just return empty list?
  }
  const mappedItems = response.rows.map(mapItemDisplay);

  return mappedItems;
}

export const getItem = async (id) => {
  const response = await pool.query(itemQuery(id));

  if (response.rows == null || response.rows.length < 1) {
    //handle no rows, maybe it's okay to just return empty list?
  }
  const mappedItem = mapItem(response.rows[0]);

  return mappedItem;
}

export const createItem = async (newItem, createdById) => {
  let response = null;
  try {
   response = await pool.query(`INSERT INTO items(name, complete, priority, "categoryId", description, effort, "completeBy", "createdByUserId", "createdDate") 
  VALUES(
    '${newItem.Name}', 
    '${newItem.Complete ? '1' : '0'}', 
    '${newItem.Priority.toString()}', 
    '${newItem.CategoryId.toString()}', 
    '${newItem.Description}', 
    '${newItem.Effort.toString()}', 
    ${newItem.CompleteBy != "" ? `'${newItem.CompleteBy}'` : null },
    '${createdById}',
    to_timestamp(${Math.floor(Date.now())} / 1000.0)
    )`);
  }
  catch(err)
  {
    console.log(err)
  }

  if (response.rows == null || response.rows.length < 1) {
    //handle no rows, maybe it's okay to just return empty list?
  }

  return response;
}

export const updateItem = async (editedItem) => {
  const response = await pool.query(`UPDATE items SET (name, complete, priority, "categoryId", description, effort, "completeBy") 
  = 
  ('${editedItem.Name}', '${editedItem.Complete ? '1' : '0'}', '${editedItem.Priority.toString()}', '${editedItem.CategoryId.toString()}', '${editedItem.Description}', '${editedItem.Effort.toString()}', ${editedItem.CompleteBy != "" ? `'${editedItem.CompleteBy}'` : null })
   where id = ${editedItem.Id.toString()}`);

  if (response.rows == null || response.rows.length < 1) {
    //handle no rows, maybe it's okay to just return empty list?
  }

  return response;
}

//my god make this easier to read! have seperate complete and incomplete queries?
export const toggleItemComplete = async (itemId, isComplete, completeById) => {
  const response = await pool.query(`UPDATE items SET (complete, "completedByUserId", "completedDate") =
  ('${isComplete ? '1' : '0'}', ${isComplete ? completeById : null}, ${isComplete ? `to_timestamp(${Math.floor(Date.now())} / 1000.0)` : null})
  where id = ${itemId.toString()}`);

  if (response.rows == null || response.rows.length < 1) {
    //handle no rows, maybe it's okay to just return empty list?
  }

  return response;
}

export const deleteItem = async (id) => {
  const response = await pool.query(`DELETE from items where id = ${id}`);

  if (response.rows == null || response.rows.length < 1) {
    //handle no rows, maybe it's okay to just return empty list?
  }
  
  return response;
}

const itemsDisplayQuery = `
SELECT 
items.id as item_id,
items.name as item_name,
items.complete,
items.priority,
items.description,
items.effort,
items."completeBy",
items."categoryId" as item_categoryid,
categories.id as category_id,
categories.name as category_name
FROM items INNER JOIN categories ON items."categoryId" = categories.id;
`

const itemQuery = (id) => `
SELECT *
FROM items
WHERE id = ${id};
`

const mapItemDisplay = (item) => {
  return {
    "Id": item.item_id,
    "Name": item.item_name,
    'Complete': item.complete == "1" ? true : false,
    'Priority': item.priority,
    'Description': item.description,
    'Effort': item.effort,
    'CompleteBy': item.completeBy,
    'CategoryId': item.item_categoryid,
    'CategoryName': item.category_name
  };
}

const mapItem = (item) => {
  return {
    "Id": item.id,
    "Name": item.name,
    'Complete': item.complete == "1" ? true : false,
    'Priority': item.priority,
    'Description': item.description,
    'Effort': item.effort,
    'CompleteBy': item.completeBy,
    'CategoryId': item.categoryId,
  };
}