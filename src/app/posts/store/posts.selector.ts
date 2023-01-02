import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Posts } from './posts';

export const selectPosts = createFeatureSelector<Posts[]>('myposts');

export const selectPostById = (postId: number) =>
  createSelector(selectPosts, (posts: Posts[]) =>
    posts.find((item) => item.id === postId)
  );
