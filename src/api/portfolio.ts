import axiosInstance from './axiosInstance';

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string | string[];
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  summary: string;
  slug: string;
}

export interface Profile {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  email?: string;
  github?: string;
  linkedin?: string;
}

export const getProfile = async (): Promise<Profile> => {
  const res = await axiosInstance.get('/data/profile.json');
  return res.data;
};

export const getProjects = async (): Promise<Project[]> => {
  const res = await axiosInstance.get('/data/projects.json');
  return res.data;
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const res = await axiosInstance.get('/data/blog.json');
  return res.data;
};
