import { Request, Response } from 'express';
import User from '../models/user';
import redisClient from '../utils/redisClient';

export const addToMyList = async (req: Request, res: Response) => {
  const { userId, itemId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (user.myList.includes(itemId)) {
      return res.status(400).send('Item already in list');
    }

    user.myList.push(itemId);
    await user.save();

    // Invalidate cache
    await redisClient.del(`myList:${userId}`);

    res.status(200).send('Item added to list');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export const removeFromMyList = async (req: Request, res: Response) => {
  const { userId, itemId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.myList = user.myList.filter(id => id !== itemId);
    await user.save();

    // Invalidate cache
    await redisClient.del(`myList:${userId}`);

    res.status(200).send('Item removed from list');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export const listMyItems = async (req: Request, res: Response) => {
  const { userId } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const cacheKey = `myList:${userId}:page:${page}:limit:${limit}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const user = await User.findById(userId).lean().exec();
    if (!user) {
      return res.status(404).send('User not found');
    }

    const myList = user.myList.slice((page - 1) * limit, page * limit);

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(myList)); // Cache for 1 hour

    res.status(200).json(myList);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
