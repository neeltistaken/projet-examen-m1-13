import axios from 'axios';

let authorId: string = '';
let bookId: string = '';
const fakeId = 'azsdfghn';
beforeAll(async () => {
  const params = {
    firstName: 'Cyril',
    lastName: 'Cuvelier',
    photoUrl: 'test',
  };
  const url = 'http://localhost:3001/authors';
  const response = await axios.post(url, null, { params });
  authorId = response.data.id;
});

describe('BookController', () => {
  describe('Createbook', () => {
    it('should return an book object', async () => {
      const params = {
        authorId,
        title: 'TEST',
      };
      const reponseAPI = {
        name: 'TEST',
      };
      const url = 'http://localhost:3001/books';
      const response = await axios.post(url, null, { params });
      expect(response.data).toMatchObject(reponseAPI);
      bookId = response.data.id;
    });
  });
  describe('GetBook', () => {
    it('should return an book object', async () => {
      const reponseAPI = {
        id: bookId,
        name: 'TEST',
        author: {
          id: authorId,
          firstName: 'Cyril',
          lastName: 'Cuvelier',
          photoUrl: 'test',
        },
      };
      const url = `http://localhost:3001/books/${bookId}`;
      const response = await axios.get(url, null);
      expect(response.data).toMatchObject(reponseAPI);
      bookId = response.data.id;
    });
    it("should return an error 404 because book doesn't exist", async () => {
      let error: number = 0;
      const url = `http://localhost:3001/books/${fakeId}`;
      try {
        await axios.get(url, null);
      } catch (errorGet) {
        error = errorGet.response.status;
      }
      expect(error).toEqual(404);
    });
  });
  describe('UpdateBook', () => {
    it('should return a modified book object', async () => {
      const params = {
        id: bookId,
        authorId,
        title: 'TEST Modified',
      };
      const reponseAPI = {
        id: bookId,
        name: 'TEST Modified',
      };
      const url = `http://localhost:3001/books/${bookId}`;
      const response = await axios.put(url, null, { params });
      expect(response.data).toMatchObject(reponseAPI);
    });
    it("should return an error 404 because book doesn't exist", async () => {
      const params = {
        id: fakeId,
        authorId: fakeId,
        title: 'TEST Modified',
      };
      let error: number = 0;
      const url = `http://localhost:3001/books/${bookId}`;
      try {
        await axios.put(url, null, { params });
      } catch (errorUpdate) {
        error = errorUpdate.response.status;
      }
      expect(error).toEqual(404);
    });
  });
  // TO-DO Patch Add book genre
  // TO-DO Delete remove book genre
  describe('RemoveBook', () => {
    it('should return the book object of the deleted book', async () => {
      const params = {
        id: bookId,
      };
      const reponseAPI = {
        id: bookId,
        name: 'TEST Modified',
      };
      const url = `http://localhost:3001/books/${bookId}`;
      const response = await axios.delete(url, { params });
      expect(response.data).toMatchObject(reponseAPI);
    });
    it("should return an error 404 because the book doesn't exist", async () => {
      const params = {
        id: fakeId,
      };
      let error: number = 0;
      const url = `http://localhost:3001/books/${fakeId}`;
      try {
        await axios.delete(url, { params });
      } catch (errorDeleteBook) {
        error = errorDeleteBook.response.status;
      }
      expect(error).toEqual(404);
    });
  });
});
