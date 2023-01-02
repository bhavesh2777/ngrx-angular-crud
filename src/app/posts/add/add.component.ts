import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { updateLoaderStatus } from 'src/app/shared/spinner/spinner.action';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Posts } from '../store/posts';
import { addNewPostAPI } from '../store/posts.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  postForm: Posts = {
    id: 0,
    title: '',
    description: '',
    likes: 0,
  };
  spinner$: Observable<boolean>;

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {
    this.spinner$ = this.store.pipe(
      select((state: any) => state.spinner.isLoading)
    );
  }

  ngOnInit(): void {}

  addNewPost() {
    if (this.postForm.title && this.postForm.description) {
      this.store.dispatch(updateLoaderStatus({ isLoading: true }));
      this.store.dispatch(addNewPostAPI({ newPost: this.postForm }));
      const apiStatus$ = this.appStore.pipe(select(selectAppState));
      apiStatus$.subscribe((appState) => {
        if (appState.apiStatus === 'success') {
          this.store.dispatch(updateLoaderStatus({ isLoading: false }));
          this.appStore.dispatch(
            setAPIStatus({
              apiStatus: { apiStatus: '', apiResponseMessage: '' },
            })
          );
          this.router.navigate(['/']);
        }
      });
    }
  }
}
