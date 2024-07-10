/*
 * API Tests using Playwright and Axios
 *
 * To run these tests, ensure you have Node.js installed, then install the
 * necessary dependencies by running:
 * 
 * npm install --save-dev playwright axios
 * 
 * You can execute the tests using the following command:
 * 
 * npx playwright test api.test.js
 */

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

  // Additional Tests
  test('GET /comments', async () => {
    const response = await axios.get(`${apiBaseUrl}/comments`);
    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('GET /comments/1', async () => {
    const response = await axios.get(`${apiBaseUrl}/comments/1`);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
  });

  test('POST /comments', async () => {
    const newComment = {
      postId: 1,
      name: 'test name',
      email: 'test@example.com',
      body: 'This is a test comment'
    };
    const response = await axios.post(`${apiBaseUrl}/comments`, newComment);
    expect(response.status).toBe(201);
    expect(response.data.name).toBe(newComment.name);
    expect(response.data.email).toBe(newComment.email);
    expect(response.data.body).toBe(newComment.body);
  });

  test('PUT /comments/1', async () => {
    const updatedComment = {
      id: 1,
      postId: 1,
      name: 'updated name',
      email: 'updated@example.com',
      body: 'This is an updated test comment'
    };
    const response = await axios.put(`${apiBaseUrl}/comments/1`, updatedComment);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe(updatedComment.name);
    expect(response.data.email).toBe(updatedComment.email);
    expect(response.data.body).toBe(updatedComment.body);
  });

  test('DELETE /comments/1', async () => {
    const response = await axios.delete(`${apiBaseUrl}/comments/1`);
    expect(response.status).toBe(200);
  });

  test('GET /comments?postId=1', async () => {
    const response = await axios.get(`${apiBaseUrl}/comments`, { params: { postId: 1 } });
    expect(response.status).toBe(200);
    response.data.forEach(comment => {
      expect(comment.postId).toBe(1);
    });
  });

  test('GET /users', async () => {
    const response = await axios.get(`${apiBaseUrl}/users`);
    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('GET /users/1', async () => {
    const response = await axios.get(`${apiBaseUrl}/users/1`);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
  });

  test('POST /users', async () => {
    const newUser = {
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496'
        }
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
      }
    };
    const response = await axios.post(`${apiBaseUrl}/users`, newUser);
    expect(response.status).toBe(201);
    expect(response.data.name).toBe(newUser.name);
    expect(response.data.email).toBe(newUser.email);
  });

  test('PUT /users/1', async () => {
    const updatedUser = {
      id: 1,
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'janedoe@example.com',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496'
        }
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
      }
    };
    const response = await axios.put(`${apiBaseUrl}/users/1`, updatedUser);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe(updatedUser.name);
    expect(response.data.email).toBe(updatedUser.email);
  });

  test('DELETE /users/1', async () => {
    const response = await axios.delete(`${apiBaseUrl}/users/1`);
    expect(response.status).toBe(200);
  });

});
