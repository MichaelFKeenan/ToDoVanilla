const items = [
    {
        "Id": 1,
        "Name": "item one name",
        "Complete": true,
        "Priority": 1
    },
    {
        "Id": 2,
        "Name": "item two name",
        "Complete": false,
        "Priority": 3
    },
    {
        "Id": 3,
        "Name": "item three name",
        "Complete": false,
        "Priority": 2
    }
]

export const getAllItems = async () => items

export const addItem = async (newItem) => {
    //validate here?
    const newId = items[items.length - 1].Id + 1;
    newItem.Id = newId;
    items.push(newItem)
    console.log(items);
}