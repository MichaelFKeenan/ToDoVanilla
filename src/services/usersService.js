//can hopefully change this someday
const apiUrl = window.location.origin + '/api/users/';

export const getUsers = async () => {
    let response = await fetch(apiUrl);
    let data = await response.json()
    return data;
}