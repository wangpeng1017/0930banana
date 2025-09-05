
export interface Transformation {
  title: string;
  prompt: string;
  emoji: string;
}

export interface GeneratedContent {
  imageUrl: string | null;
  text: string | null;
}
