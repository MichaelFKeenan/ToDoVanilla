//can hopefully change this someday
const apiUrl = window.location.origin + '/api/items/';
const googleApiUrl = window.location.origin + '/googleapi/';

export const getAllItems = async () => {
  let response = await fetch(apiUrl);
  let data = await response.json()
  return data;
}

export const getItem = async (id) => {
    let response = await fetch(apiUrl + `getitem/${id}`);
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

    if(response.status == "200"){
        const calendarResponse = await fetch(`${googleApiUrl}event`, {
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
    }

    //what if create succeeds but calendar creation fails? need to notify user somehow
    //ideally queue the operation and have a processing task, unrealistic right now though!

    //handle errors here?
    return await response;
}

export const editItem = async (item) => {
    //validate here?

    const response = await fetch(apiUrl, {
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
        body: JSON.stringify(item) // body data type must match "Content-Type" header
    });

    //handle errors here?
    return await response;
}

export const toggleItemComplete = async (completedItemId, isComplete, userId) => {
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
        body: JSON.stringify({'completedItemId': completedItemId, 'isComplete': isComplete, 'userId': userId}) // body data type must match "Content-Type" header
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