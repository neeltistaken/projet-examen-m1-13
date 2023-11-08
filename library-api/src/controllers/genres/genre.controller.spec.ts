import axios from 'axios';

let genreId: string = '';
const fakeId: string = 'vkjgfl';
describe('GenreController', () => {
  describe('CreateGenre', () => {
    it('should return a Genre object', async () => {
      const params = {
        name: 'test',
      };
      const responseAPI = {
        name: 'test',
      };
      const url = 'http://localhost:3001/genres';
      const response = await axios.post(url, null, { params });
      expect(response.data).toMatchObject(responseAPI);
      genreId = response.data.id;
    });
    it("should return a 404 error because name isn't defined", async () => {
      const params = {
        name: '',
      };
      const url = 'http://localhost:3001/genres';
      let error: number = 200;
      try {
        await axios.post(url, null, { params });
      } catch (errorCreate) {
        error = errorCreate.response.status;
      }
      expect(error).toEqual(404);
    });
  });
  describe('ModifyGenre', () => {
    it('should return a modified Genre object', async () => {
      const params = {
        name: 'test BIS',
      };
      const responseAPI = {
        id: genreId,
        name: 'test BIS',
      };
      const url = `http://localhost:3001/genres/${genreId}`;
      const response = await axios.patch(url, null, { params });
      expect(response.data).toEqual(responseAPI);
    });
    it("should return an error 404 because Genre object doesn't exist", async () => {
      const params = {
        name: 'test BIS',
      };
      const url = `http://localhost:3001/genres/${fakeId}`;
      let error: number = 200;
      try {
        await axios.patch(url, null, { params });
      } catch (errorGet) {
        error = errorGet.response.status;
      }
      expect(error).toEqual(404);
    });
  });
  describe('GetGenre', () => {
    it('should return all the Genre objects', async () => {
      const responseAPI = {
        id: genreId,
        name: 'test BIS',
      };
      const url = 'http://localhost:3001/genres';
      const response = await axios.get(url, null);
      expect(response.data).toContainEqual(responseAPI);
    });
  });
  describe('DeleteGenre', () => {
    it('should return the deleted Genre objects', async () => {
      const responseAPI = {
        id: genreId,
        name: 'test BIS',
      };
      const url = `http://localhost:3001/genres/${genreId}`;
      const response = await axios.delete(url, null);
      expect(response.data).toEqual(responseAPI);
    });
  });
});
