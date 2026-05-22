import { Category } from "./category.js";
import { Speaker } from "./speaker.js";

export interface Event {
  id: number;
  name: string;
  location: string;
  dateEvent: string;
  description: string;

  categoryId: number;
  speakerId: number;

  category: Category;
  speaker: Speaker;
}