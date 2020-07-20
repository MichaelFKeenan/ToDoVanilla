//can hopefully change this someday
const apiUrl = window.location.origin + '/api/categories/';

export const getAllCategories = async () => {
  let response = await fetch(apiUrl);
  let data = await response.json()
  return data;
}

export const deleteCategory = async (itemId: number) => {
  console.log('delete', itemId);
}

export const editCategory = async (item: Item) => {
  console.log('edit', item);
}

export const addCategory = async (newCategory: string) => {
  //validate here?

  const response = await fetch(apiUrl, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(newCategory) // body data type must match "Content-Type" header
  });

  //handle errors here?
  return await response;
}