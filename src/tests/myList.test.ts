import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import User from '../models/user';

const mongoUri = 'mongodb://localhost:27017/ott-platform-test';

beforeAll(async () => {
  await mongoose.disconnect(); 
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('My List API', () => {
  let userId: string;

  beforeEach(async () => {
    const user = new User({
      username: 'testuser',
      favoriteGenres: [],
      dislikedGenres: [],
      watchHistory: [],
      myList: [],
    });
    await user.save();
    userId = user._id.toString(); 
  });

  it('should add an item to the list', async () => {
    const res = await request(app)
      .post('/mylist/add')
      .send({ userId, itemId: 'item123' });
    expect(res.status).toBe(200);
    expect(res.text).toBe('Item added to list');
  });

  it('should remove an item from the list', async () => {
    await request(app)
      .post('/mylist/add')
      .send({ userId, itemId: 'item123' });

    const res = await request(app)
      .post('/mylist/remove')
      .send({ userId, itemId: 'item123' });
    expect(res.status).toBe(200);
    expect(res.text).toBe('Item removed from list');
  });

  it('should list items with pagination', async () => {
    for (let i = 1; i <= 15; i++) {
      await request(app)
        .post('/mylist/add')
        .send({ userId, itemId: `item${i}` });
    }

    const res = await request(app)
      .get('/mylist/list')
      .query({ userId, page: 2, limit: 5 });
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(5);
  });
});
