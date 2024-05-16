import { Schema, model, Document } from 'mongoose';

interface Episode {
  episodeNumber: number;
  seasonNumber: number;
  releaseDate: Date;
  director: string;
  actors: string[];
}

interface TVShow extends Document {
  title: string;
  description: string;
  genres: string[];
  episodes: Episode[];
}

const episodeSchema = new Schema<Episode>({
  episodeNumber: { type: Number, required: true },
  seasonNumber: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String }],
});

const tvShowSchema = new Schema<TVShow>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String }],
  episodes: [episodeSchema],
});

const TVShow = model<TVShow>('TVShow', tvShowSchema);
export default TVShow;
