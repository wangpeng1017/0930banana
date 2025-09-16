

export interface Transformation {
  key: string;
  titleKey: string;
  prompt: string;
  emoji: string;
  descriptionKey: string;
  isMultiImage?: boolean;
  isTwoStep?: boolean;
  stepTwoPrompt?: string;
  primaryUploaderTitle?: string;
  secondaryUploaderTitle?: string;
  primaryUploaderDescription?: string;
  secondaryUploaderDescription?: string;
}

export interface GeneratedContent {
  imageUrl: string | null;
  text: string | null;
  secondaryImageUrl?: string | null;
}