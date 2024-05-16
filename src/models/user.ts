import { Schema, model, Document } from 'mongoose';

type Genre = 'Action' | 'Comedy' | 'Drama' | 'Fantasy' | 'Horror' | 'Romance' | 'SciFi';

interface WatchHistory {
  contentId: string;
  watchedOn: Date;
  rating?: number;
}

interface User extends Document {
  username: string;
  favoriteGenres: Genre[];
  dislikedGenres: Genre[];
  watchHistory: WatchHistory[];
  myList: string[];
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  favoriteGenres: [{ type: String }],
  dislikedGenres: [{ type: String }],
  watchHistory: [
    {
      contentId: { type: String },
      watchedOn: { type: Date },
      rating: { type: Number },
    },
  ],
  myList: [{ type: String, index: true }], //adding indexing for efficiency
});

const User = model<User>('User', userSchema);
export default User;
