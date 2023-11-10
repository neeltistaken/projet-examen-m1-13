import axios from 'axios';

let authorId: string = '';
let bookId: string = '';
let genreId: string = '';
const fakeId = 'azsdfghn';

async function createAuthor(): Promise<void> {
  const params = {
    firstName: 'Cyril',
    lastName: 'Cuvelier',
    photoUrl: 'test',
  };
  const url = 'http://localhost:3001/authors';
  const responseAuthor = await axios.post(url, null, { params });
  authorId = responseAuthor.data.id;
}

async function createGenre(): Promise<void> {
  const params = {
    name: 'TEST GENRE',
  };
  const url = 'http://localhost:3001/genres';
  const responseAuthor = await axios.post(url, null, { params });
  genreId = responseAuthor.data.id;
}
beforeAll(async () => {
  await createAuthor();
  await createGenre();
});

describe('BookController', () => {
  describe('CreateBook', () => {
    it('should return an book object', async () => {
      const params = {
        authorId,
        title: 'TEST',
      };
      const responseAPI = {
        name: 'TEST',
      };
      const url = 'http://localhost:3001/books';
      const response = await axios.post(url, null, { params });
      expect(response.data).toMatchObject(responseAPI);
      bookId = response.data.id;
    });
  });
  describe('GetBook', () => {
    it('should return an book object', async () => {
      const responseAPI = {
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
      expect(response.data).toMatchObject(responseAPI);
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
      const responseAPI = {
        id: bookId,
        name: 'TEST Modified',
      };
      const url = `http://localhost:3001/books/${bookId}`;
      const response = await axios.put(url, null, { params });
      expect(response.data).toMatchObject(responseAPI);
    });
    it("should return an error 404 because book doesn't exist", async () => {
      const params = {
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
  describe('AddBookGenre', () => {
    it('should return an modified object book with a new genre', async () => {
      const params = {
        genreId,
      };
      const responseAPI = {
        id: bookId,
        name: 'TEST Modified',
        genres: [{ id: genreId, name: 'TEST GENRE' }],
      };
      const url = `http://localhost:3001/books/${bookId}/genre`;
      const response = await axios.patch(url, null, { params });
      expect(response.data).toMatchObject(responseAPI);
    });
    it("should return an error 404 because genre or book doesn't exist", async () => {
      const params = {
        genreId: fakeId,
      };
      const url = `http://localhost:3001/books/${fakeId}/genre`;
      let error: number = 200;
      try {
        await axios.patch(url, null, { params });
      } catch (errorAddBookGenre) {
        error = errorAddBookGenre.response.status;
      }
      expect(error).toEqual(404);
    });
  });
  describe('RemoveBookGenre', () => {
    it('should return an modified object book without a genre', async () => {
      const params = {
        genreId,
      };
      const responseAPI = {
        id: bookId,
        name: 'TEST Modified',
        genres: [],
      };
      const url = `http://localhost:3001/books/${bookId}/genre`;
      const response = await axios.delete(url, { params });
      expect(response.data).toMatchObject(responseAPI);
    });
    it("should return an error 404 because the genre doesn't exist", async () => {
      const params = {
        genreId: fakeId,
      };
      let error: number = 0;
      const url = `http://localhost:3001/books/${bookId}/genre`;
      try {
        await axios.delete(url, { params });
      } catch (errorDeleteBook) {
        error = errorDeleteBook.response.status;
      }
      expect(error).toEqual(404);
    });
  });
  describe('RemoveBook', () => {
    it('should return the book object of the deleted book', async () => {
      const params = {
        id: bookId,
      };
      const responseAPI = {
        id: bookId,
        name: 'TEST Modified',
      };
      const url = `http://localhost:3001/books/${bookId}`;
      const response = await axios.delete(url, { params });
      expect(response.data).toMatchObject(responseAPI);
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
