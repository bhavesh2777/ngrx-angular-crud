import { createAction, props } from '@ngrx/store';
import { Posts } from './posts';

// Fetch posts
export const fetchPostsAPI = createAction(
  '[Posts API] trigger fetch all posts API'
);

export const fetchPostsAPISuccess = createAction(
  '[Posts API] fetch all posts API Success',
  props<{ allPosts: Posts[] }>()
);

// Add posts
export const addNewPostAPI = createAction(
  '[Posts API] trigger add new post API',
  props<{ newPost: Posts }>()
);

export const addNewPostAPISuccess = createAction(
  '[Posts API] Add new post API Success',
  props<{ newPost: Posts }>()
);

// Edit posts
export const editPostAPI = createAction(
  '[Posts API] trigger edit post API',
  props<{ editPost: Posts }>()
);

export const editPostAPISuccess = createAction(
  '[Posts API] Edit post API Success',
  props<{ editPost: Posts }>()
);

// Delete posts
export const deletePostAPI = createAction(
  '[Posts API] trigger delete post API',
  props<{ id: number }>()
);

export const deletePostAPISuccess = createAction(
  '[Posts API] Delete post API Success',
  props<{ id: number }>()
);
