import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import { getAllItems, getItem, addItem, editItem } from './itemsService'


const CreateItem = (Id: number, AssignedToUserId: number, CompleteBy: string): Item => {
  return {
      Id,
      Name: "any",
      Complete: true,
      Priority: 1,
      CategoryId: 1,
      AssignedToUserId,
      Description: "any",
      Effort: 1,
      CompleteBy,
      UserId: 1
  }
}

describe('Items Service', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe('given items returned from api', () => {
    beforeEach(() => {
      fetchMock.mockImplementation((url: string) =>
        url === 'http://localhost/api/items/'
          ? Promise.resolve(new Response(JSON.stringify([{"id": 1},{"id": 2}])))
          : Promise.reject(new Error('bad url'))
      )
    })
  
    test('get all items returns all items', async () => {
      const allItems = await getAllItems();
      expect(allItems).toStrictEqual([{"id": 1},{"id": 2}]);
    });
  });

  describe('given item returned from api', () => {
    beforeEach(() => {
      fetchMock.mockImplementation((url: string) =>
        url === 'http://localhost/api/items/getitem/1'
          ? Promise.resolve(new Response(JSON.stringify([{"id": 1}])))
          : Promise.reject(new Error('bad url'))
      )
    })
  
    test('get item by id returns item', async () => {
      const item = await getItem(1);
      expect(item).toStrictEqual([{"id": 1}]);
    });
  });

  describe('given create item succeeds', () => {
    beforeEach(() => {
      fetchMock.mockImplementation((url: string) => {
        switch(url){
          case 'http://localhost/api/items/' :
            return Promise.resolve(new Response())
          case 'http://localhost/api/users/getemailaddress/10' :
            return Promise.resolve(new Response(JSON.stringify({emailAddress: "user@email.com"})))
          case 'http://localhost/googleapi/event' :
            return Promise.resolve(new Response()) 
          default :
            return Promise.reject(new Error('bad url'))
        }
      })
    });
  
    test('item without assigned user and with complete by date does not create event', async () => {
      const response = await addItem(CreateItem(1, null, "somedate"));
      expect(response.status).toEqual(200);
      expect(fetch).not.toHaveBeenCalledWith('http://localhost/googleapi/event');
    });

    test('item with assigned user and without complete by date does not create event', async () => {
      const response = await addItem(CreateItem(1, 10, null));
      expect(response.status).toEqual(200);
      expect(fetch).not.toHaveBeenCalledWith('http://localhost/googleapi/event');
    });

    test('item with assigned user and complete by date does create event', async () => {
      const response = await addItem(CreateItem(1, 10, "some date"));
      expect(response.status).toEqual(200);
      expect(fetchMock.mock.calls[2][0]).toEqual("http://localhost/googleapi/event");
      expect(fetchMock.mock.calls[2][1].method).toStrictEqual("POST");
      expect(fetchMock.mock.calls[2][1].body).toStrictEqual("{\"Id\":1,\"Name\":\"any\",\"Complete\":true,\"Priority\":1,\"CategoryId\":1,\"AssignedToUserId\":10,\"Description\":\"any\",\"Effort\":1,\"CompleteBy\":\"some date\",\"UserId\":1,\"assignedUserEmail\":\"user@email.com\"}");
    });
  });

  describe('given edit item succeeds', () => {
    beforeEach(() => {
      fetchMock.mockImplementation((url: string) => {
        if (url === 'http://localhost/api/items/') {
          return Promise.resolve(new Response()) 
        }
      
        return Promise.reject(new Error('bad url'))
      })
    });
  
    test('sends edit request to api', async () => {
      const response = await editItem({"id": "1"});
      expect(response.status).toEqual(200);
      expect(fetchMock.mock.calls[0][0]).toEqual("http://localhost/api/items/");
      expect(fetchMock.mock.calls[0][1].method).toStrictEqual("PUT");
      expect(fetchMock.mock.calls[0][1].body).toStrictEqual("{\"id\":\"1\"}");
    });
  });
})