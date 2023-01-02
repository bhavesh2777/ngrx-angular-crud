import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Posts } from '../store/posts';
import { editPostAPI } from '../store/posts.action';
import { selectPostById } from '../store/posts.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  postForm: Posts = {
    id: 0,
    title: '',
    description: '',
    likes: 0,
  };

  addLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  ngOnInit(): void {
    // Fetch post by Id from store to populate data in post form
    const fetchPost$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const postId = Number(params.get('id'));
        return this.store.pipe(select(selectPostById(postId)));
      })
    );
    fetchPost$.subscribe((data) => {
      if (data) this.postForm = { ...data };
      else this.router.navigate(['/']);
    });
  }

  updatePost() {
    if (this.postForm.title && this.postForm.description) {
      this.addLoader = true;
      this.store.dispatch(editPostAPI({ editPost: { ...this.postForm } }));
      const apiStatus$ = this.appStore.pipe(select(selectAppState));
      apiStatus$.subscribe((appState) => {
        if (appState.apiStatus === 'success') {
          this.appStore.dispatch(
            setAPIStatus({
              apiStatus: { apiResponseMessage: '', apiStatus: '' },
            })
          );
          this.router.navigate(['/']);
        }
        this.addLoader = false;
      });
    }
  }
}
