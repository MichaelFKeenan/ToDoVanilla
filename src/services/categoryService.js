//can hopefully change this someday
const apiUrl = window.location.origin + '/';

export const getAllCategories = async () => {
  let response = await fetch(apiUrl + `categories`);
  let data = await response.json()
  return data;
}

export const deleteCategory = async (itemId) => {
  console.log('delete', itemId);
}

export const editCategory = async (item) => {
  console.log('edit', item);
}