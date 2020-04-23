const apiUrl = window.location.origin + '/session/';

export const getCurrentUserId = async () => {
    let response = await fetch(apiUrl + 'currentuserid');
    let data = await response.json()
    return data;
}