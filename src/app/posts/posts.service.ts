import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from './store/posts';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Posts[]>('http://localhost:3000/posts');
  }

  createPost(payload: Posts) {
    return this.http.post<Posts>('http://localhost:3000/posts', payload);
  }

  updatePost(payload: Posts) {
    return this.http.put<Posts>(
      `http://localhost:3000/posts/${payload.id}`,
      payload
    );
  }

  deletePost(id: number) {
    return this.http.delete(`http://localhost:3000/posts/${id}`);
  }
}
