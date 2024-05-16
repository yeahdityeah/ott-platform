import { Schema, model, Document } from 'mongoose';

interface Movie extends Document {
  title: string;
  description: string;
  genres: string[];
  releaseDate: Date;
  director: string;
  actors: string[];
}

const movieSchema = new Schema<Movie>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String }],
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String }],
});

const Movie = model<Movie>('Movie', movieSchema);
export default Movie;
