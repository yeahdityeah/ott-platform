import mongoose from 'mongoose';
import User from './src/models/user';
import Movie from './src/models/movie'; 
import TVShow from './src/models/tvshow'; 

const mongoUri = 'mongodb://localhost:27017/ott-platform';

const seedData = async () => {
  try {
    await mongoose.connect(mongoUri);

    await User.deleteMany({});
    await Movie.deleteMany({});
    await TVShow.deleteMany({});

    const users = await User.create([
      {
        username: 'user1',
        favoriteGenres: ['Action', 'Comedy'],
        dislikedGenres: ['Horror'],
        watchHistory: [],
        myList: [],
      },
      {
        username: 'user2',
        favoriteGenres: ['Drama', 'Romance'],
        dislikedGenres: ['SciFi'],
        watchHistory: [],
        myList: [],
      },
    ]);

    const movies = await Movie.create([
      {
        title: 'Action Movie 1',
        description: 'An exciting action movie.',
        genres: ['Action'],
        releaseDate: new Date('2020-01-01'),
        director: 'Director A',
        actors: ['Actor 1', 'Actor 2'],
      },
      {
        title: 'Comedy Movie 1',
        description: 'A hilarious comedy movie.',
        genres: ['Comedy'],
        releaseDate: new Date('2021-01-01'),
        director: 'Director B',
        actors: ['Actor 3', 'Actor 4'],
      },
    ]);

    const tvShows = await TVShow.create([
      {
        title: 'Drama Show 1',
        description: 'A dramatic TV show.',
        genres: ['Drama'],
        episodes: [
          {
            episodeNumber: 1,
            seasonNumber: 1,
            releaseDate: new Date('2022-01-01'),
            director: 'Director C',
            actors: ['Actor 5', 'Actor 6'],
          },
        ],
      },
      {
        title: 'Romance Show 1',
        description: 'A romantic TV show.',
        genres: ['Romance'],
        episodes: [
          {
            episodeNumber: 1,
            seasonNumber: 1,
            releaseDate: new Date('2023-01-01'),
            director: 'Director D',
            actors: ['Actor 7', 'Actor 8'],
          },
        ],
      },
    ]);
    console.log(users);
    console.log(movies);
    console.log(tvShows);

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seedData();
