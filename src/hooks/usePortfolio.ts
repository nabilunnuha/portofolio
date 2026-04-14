import { useQuery } from '@tanstack/react-query';
import { getProfile, getProjects, getBlogPosts } from '../api/portfolio';

export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

export const useProjects = () =>
  useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

export const useBlogPosts = () =>
  useQuery({
    queryKey: ['blog'],
    queryFn: getBlogPosts,
  });
