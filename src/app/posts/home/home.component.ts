import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { deletePostAPI, fetchPostsAPI } from '../store/posts.action';
import { selectPosts } from '../store/posts.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  list$ = this.store.pipe(select(selectPosts));

  constructor(private store: Store, private appStore: Store<Appstate>) {}

  ngOnInit(): void {
    this.store.dispatch(fetchPostsAPI());
  }

  deletePost(postId: number) {
    if (confirm('Are you sure you want to delete this?')) {
      this.store.dispatch(deletePostAPI({ id: postId }));
      const apiStatus$ = this.appStore.pipe(select(selectAppState));
      apiStatus$.subscribe((appState) => {
        if (appState.apiStatus === 'success') {
          this.appStore.dispatch(
            setAPIStatus({
              apiStatus: { apiResponseMessage: '', apiStatus: '' },
            })
          );
        }
      });
    }
  }
}
