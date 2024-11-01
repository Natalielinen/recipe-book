import { Story, StoryItem } from '@prisma/client';
import { createAxiosInstance } from './instance';

export type IStory = Story & {
  items: StoryItem[];
};

export const getAll = async (locale: string) => {
  const axiosInstance = createAxiosInstance(locale);
  const { data } = await axiosInstance.get<IStory[]>('/stories');

  return data;
};
