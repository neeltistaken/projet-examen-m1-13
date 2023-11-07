import axios from 'axios';

describe('AuthorController', () => {
  let id: string = '';
  describe('CreateAuthor', () => {
    it('should return an author object', async () => {
      const params = {
        firstName: 'Cyril',
        lastName: 'Cuvelier',
        photoUrl: 'helloWord',
      };
      const responseAPI = {
        firstName: 'Cyril',
        lastName: 'Cuvelier',
        photoUrl: 'helloWord',
      };
      const url = 'http://localhost:3001/authors';
      const response = await axios.post(url, null, { params });
      id = response.data.id;
      expect(response.data).toEqual(expect.objectContaining(responseAPI));
    });
  });
  describe('UpdateAuthor', () => {
    it('should return an modified author object', async () => {
      const params = {
        id,
        firstName: 'Rémi',
        lastName: 'Van Boxem',
        photoUrl: 'helloWordBis',
      };
      const responseAPI = {
        id,
        firstName: 'Rémi',
        lastName: 'Van Boxem',
        photoUrl: 'helloWordBis',
      };
      const url = `http://localhost:3001/authors/${id}`;
      const response = await axios.put(url, null, { params });
      expect(response.data).toEqual(expect.objectContaining(responseAPI));
    });
    it("should return an 404 error because author doesn't exist", async () => {
      const params = {
        id: 'kdhjsbfksb',
        firstName: 'Rémi',
        lastName: 'Van Boxem',
        photoUrl: 'helloWordBis',
      };
      let error: number = 0;
      const url = `http://localhost:3001/authors/${id}`;
      try {
        await axios.put(url, null, { params });
      } catch (errorUpdate) {
        error = errorUpdate.response.status;
      }
      expect(error).toEqual(404);
    });
  });
  describe('GetAuthor', () => {
    it('should return an author object from an id', async () => {
      const params = {
        id,
      };
      const responseAPI = {
        id,
        firstName: 'Rémi',
        lastName: 'Van Boxem',
        photoUrl: 'helloWordBis',
      };
      const url = `http://localhost:3001/authors/${id}`;
      const response = await axios.get(url, { params });
      expect(response.data).toEqual(expect.objectContaining(responseAPI));
    });
    it("should return an 404 error because author id doesn't exist", async () => {
      const fakeId: string = 'fudiskahlskjf';
      const url = `http://localhost:3001/authors/${fakeId}`;
      let error: number = 0;
      try {
        await axios.get(url, null);
      } catch (errorGet) {
        error = errorGet.response.status;
      }
      expect(error).toEqual(404);
    });
  });
  describe('GetAllAuthors', () => {
    it('should return all authors', async () => {
      const apiObject = {
        books: [],
        firstName: 'Rémi',
        id,
        lastName: 'Van Boxem',
        photoUrl: 'helloWordBis',
      };
      const url = 'http://localhost:3001/authors';
      const response = await axios.get(url, null);
      expect(response.data).toContainEqual(apiObject);
    });
  });
  describe('DeleteAuthor', () => {
    it('should delete an author', async () => {
      const apiObject = {
        books: [],
        firstName: 'Rémi',
        id,
        lastName: 'Van Boxem',
        photoUrl: 'helloWordBis',
      };
      const url = `http://localhost:3001/authors/${id}`;
      const response = await axios.delete(url, null);
      expect(response.data).toEqual(apiObject);
    });
    it("should return an error 404 because author doesn't exist", async () => {
      const fakeId: string = 'fudiskahlskjf';
      const url = `http://localhost:3001/authors/${fakeId}`;
      let error: number = 0;
      try {
        await axios.delete(url, null);
      } catch (errorDelete) {
        error = errorDelete.response.status;
      }
      expect(error).toEqual(404);
    });
  });
});
