const { test, expect } = require('@playwright/test');
const axios = require('axios');

test.describe('API Tests', () => {

  const apiBaseUrl = 'https://jsonplaceholder.typicode.com';

  test('GET /posts', async () => {
    const response = await axios.get(`${apiBaseUrl}/posts`);
    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('GET /posts/1', async () => {
    const response = await axios.get(`${apiBaseUrl}/posts/1`);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
  });

  test('POST /posts', async () => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };
    const response = await axios.post(`${apiBaseUrl}/posts`, newPost);
    expect(response.status).toBe(201);
    expect(response.data.title).toBe(newPost.title);
    expect(response.data.body).toBe(newPost.body);
    expect(response.data.userId).toBe(newPost.userId);
  });

  test('PUT /posts/1', async () => {
    const updatedPost = {
      id: 1,
      title: 'foo updated',
      body: 'bar updated',
      userId: 1
    };
    const response = await axios.put(`${apiBaseUrl}/posts/1`, updatedPost);
    expect(response.status).toBe(200);
    expect(response.data.title).toBe(updatedPost.title);
    expect(response.data.body).toBe(updatedPost.body);
  });

  test('DELETE /posts/1', async () => {
    const response = await axios.delete(`${apiBaseUrl}/posts/1`);
    expect(response.status).toBe(200);
  });

  test('GET /posts/9999', async () => {
    try {
      await axios.get(`${apiBaseUrl}/posts/9999`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test('GET /posts?userId=1', async () => {
    const response = await axios.get(`${apiBaseUrl}/posts`, { params: { userId: 1 } });
    expect(response.status).toBe(200);
    response.data.forEach(post => {
      expect(post.userId).toBe(1);
    });
  });

  test('POST /posts with invalid data', async () => {
    const invalidPost = {
      title: '',
      body: '',
      userId: 1
    };
    try {
      await axios.post(`${apiBaseUrl}/posts`, invalidPost);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test('GET /posts with headers', async () => {
    const response = await axios.get(`${apiBaseUrl}/posts`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    expect(response.status).toBe(200);
  });

  test('GET /posts with timeout', async () => {
    try {
      await axios.get(`${apiBaseUrl}/posts`, { timeout: 1 });
    } catch (error) {
      expect(error.code).toBe('ECONNABORTED');
    }
  });

});

