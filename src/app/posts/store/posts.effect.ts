import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addNewPostAPI,
  addNewPostAPISuccess,
  fetchPostsAPI,
  fetchPostsAPISuccess,
  editPostAPI,
  editPostAPISuccess,
  deletePostAPI,
  deletePostAPISuccess,
} from './posts.action';
import { withLatestFrom, mergeMap, EMPTY, map, switchMap } from 'rxjs';
import { selectPosts } from './posts.selector';
import { select, Store } from '@ngrx/store';
import { PostsService } from '../posts.service';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';

@Injectable()
export class PostsEffect {
  constructor(
    private actions$: Actions,
    private store: Store,
    private appStore: Store<Appstate>,
    private postsService: PostsService
  ) {}

  fetchAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchPostsAPI),
      withLatestFrom(this.store.pipe(select(selectPosts))),
      mergeMap(([, postFromStore]) => {
        if (postFromStore.length > 0) return EMPTY;
        return this.postsService
          .getPosts()
          .pipe(map((data) => fetchPostsAPISuccess({ allPosts: data })));
      })
    )
  );

  addNewPostAPI$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewPostAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.postsService.createPost(action.newPost).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return addNewPostAPISuccess({ newPost: data });
          })
        );
      })
    )
  );

  editPostAPI$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editPostAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.postsService.updatePost(action.editPost).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return editPostAPISuccess({ editPost: data });
          })
        );
      })
    )
  );

  deletePostAPI$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePostAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.postsService.deletePost(action.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deletePostAPISuccess({ id: action.id });
          })
        );
      })
    )
  );
}
