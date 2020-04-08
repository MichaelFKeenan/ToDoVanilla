//can hopefully change this someday
const apiUrl = window.location.origin + '/api/items/';

export const getAllItems = async () => {
  let response = await fetch(apiUrl);
  let data = await response.json()
  return data;
}

export const addItem = async (newItem) => {
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
        body: JSON.stringify(newItem) // body data type must match "Content-Type" header
    });

    //handle errors here?
    return await response;
}

export const toggleItemComplete = async (completedItemId, isComplete) => {
    //validate here?

    const response = await fetch(apiUrl + `toggleItemComplete`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({'completedItemId': completedItemId, 'isComplete': isComplete}) // body data type must match "Content-Type" header
    });

    //handle errors here?
    return await response;
}

export const deleteItem = async (itemIdToDelete) => {
    //validate here?

    const response = await fetch(apiUrl, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({Id: itemIdToDelete}) // body data type must match "Content-Type" header
    });

    //handle errors here?
    return await response;
}