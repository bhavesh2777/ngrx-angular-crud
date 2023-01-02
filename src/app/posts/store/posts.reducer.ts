import { createReducer, on } from '@ngrx/store';
import { Posts } from './posts';
import {
  addNewPostAPISuccess,
  deletePostAPISuccess,
  editPostAPISuccess,
  fetchPostsAPISuccess,
} from './posts.action';

export const inititalState: ReadonlyArray<Posts> = [];

export const postReducer = createReducer(
  inititalState,
  on(fetchPostsAPISuccess, (state, { allPosts }) => {
    return allPosts;
  }),
  on(addNewPostAPISuccess, (state, { newPost }) => {
    const newState = [...state];
    newState.push(newPost);
    return newState;
  }),
  on(editPostAPISuccess, (state, { editPost }) => {
    const newState = [...state];
    const postIdx = newState.findIndex((item) => item.id === editPost.id);
    if (postIdx === -1) return newState;
    else {
      newState[postIdx] = editPost;
      return newState;
    }
  }),
  on(deletePostAPISuccess, (state, { id }) => {
    const newState = [...state];
    const deletedItemState = newState.filter((item) => item.id != id);
    return deletedItemState;
  })
);
