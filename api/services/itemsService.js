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

export const createItem = async (newItemRequest) => {
  let response = null;

  response = await pool.query(`INSERT INTO items(
     name, 
     complete, 
     priority, 
     "categoryId", 
     description, 
     effort, 
     "completeBy", 
     "createdByUserId", 
     "createdDate", 
     "assignedToUserId", 
     "assignedByUserId"
     ) 
  VALUES(
    '${newItemRequest.Name}', 
    '${newItemRequest.Complete ? '1' : '0'}', 
    '${newItemRequest.Priority.toString()}', 
    '${newItemRequest.CategoryId.toString()}', 
    '${newItemRequest.Description}', 
    '${newItemRequest.Effort.toString()}', 
    ${newItemRequest.CompleteBy != "" ? `'${newItemRequest.CompleteBy}'` : null },
    '${newItemRequest.UserId}',
    to_timestamp(${Math.floor(Date.now())} / 1000.0),
    ${newItemRequest.AssignedUserId != null ? `'${newItemRequest.AssignedUserId}'` : null},
    ${newItemRequest.AssignedUserId != null ? `'${newItemRequest.UserId}'` : null }
    )`);

  if (response.rows == null || response.rows.length < 1) {
    //handle no rows, maybe it's okay to just return empty list?
  }

  return response;
}

//only update assign date if assign has changed... need to work it out and pass in here!
export const updateItem = async (editedItemRequest) => {
  const response = await pool.query(`UPDATE items SET (
    name, 
    complete, 
    priority, 
    "categoryId", 
    description, 
    effort, 
    "completeBy", 
    "assignedToUserId", 
    "assignedByUserId") 
  = 
  (
    '${editedItemRequest.Name}', 
    '${editedItemRequest.Complete ? '1' : '0'}', 
    '${editedItemRequest.Priority.toString()}', 
    '${editedItemRequest.CategoryId.toString()}', 
    '${editedItemRequest.Description}', 
    '${editedItemRequest.Effort.toString()}', 
    ${editedItemRequest.CompleteBy != "" ? `'${editedItemRequest.CompleteBy}'` : null },
    ${editedItemRequest.AssignedUserId != null ? `'${editedItemRequest.AssignedUserId}'` : null},
    ${editedItemRequest.AssignedUserId != null ? `'${editedItemRequest.UserId}'` : null }
    )
   where id = ${editedItemRequest.Id.toString()}`);

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
items."assignedToUserId",
category.id as category_id,
category.name as category_name,
"assignedToUser"."displayName" as assigned_to_name
FROM items 
LEFT JOIN categories AS category ON items."categoryId" = category.id
LEFT JOIN users AS "assignedToUser" ON items."assignedToUserId" = "assignedToUser".id;
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
    'CategoryName': item.category_name,
    'AssignedUserName': item.assigned_to_name,
    'AssignedToUserId': item.assignedToUserId
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
    'CreatedByUserId': item.createdByUserId,
    'AssignedToUserId': item.assignedToUserId,
    'AssignedByUserId': item.assignedByUserId,
    'CompletedByUserId': item.completedByUserId,
    'CreatedDate': item.createdDate,
    'CompletedDate': item.completedDate,
    'AssignedDate': item.assignedDate,
  };
}