const request = require('supertest');
const fs = require('fs');
const app = require('../index.js');
const path = require('path');

jest.mock('fs');

// Test routes
describe('Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /upload should process and return file details', async () => {
    // 1. mock upload csv file (test/sample.csv)
    // 2. mock preprocess of data
    // 3. mock writing of file into json (like a db)
    // 4. mock response
  });

  test('GET /post should get page info', async () => {
    const mockData = {
      id: 'sample-id',
      data: Array.from({ length: 10 }, (_, i) => ({ postId: i + 1, body: `Post ${i + 1}` })),
    };

    fs.existsSync.mockReturnValue(true);
    fs.readFile.mockImplementation((path, encoding, cb) => cb(null, JSON.stringify(mockData)));

    const res = await request(app).get('/post').query({ id: 'sample-id', page: 1 });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Page 1 of posts retrieved successfully');
    expect(res.body.posts).toHaveLength(5);
    expect(res.body.totalPages).toBe(2);
  });

  test('GET /post return error if file not found', async () => {
    fs.existsSync.mockReturnValue(false);

    const res = await request(app).get('/post').query({ id: 'non-existent-id' });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('File not found');
  });
});
