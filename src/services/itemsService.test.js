import { getAllItems } from './itemsService'

describe('given items returned from api', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((req) => {
      if(req != 'http://localhost/api/items/') return null;
      var response = new Promise((resolve, reject) => {
        resolve({
          ok: true, 
          json: function() { 
            return [{"id": 1}]
          }
        });
      });
  
      return response;
    });
  })

  test('get all items returns all items', async () => {
    const allItems = await getAllItems();
    expect(allItems).toStrictEqual([{"id": 1}]);
  });
})