import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  getPosts() {
    this.httpClient
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => ({ ...post, id: post._id }));
        })
      )
      .subscribe((tranformedPosts) => {
        this.posts = tranformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {
      id: '',
      title,
      content,
    };
    this.httpClient
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((res) => {
        this.posts.push({ ...post, id: res.postId });
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    this.httpClient
      .delete(`http://localhost:3000/api/posts/${postId}`)
      .subscribe((res) => {
        this.posts = this.posts.filter((post) => post.id !== postId);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  getPost(postId: string) {
    return this.httpClient.get<{
      message: string;
      post: { _id: string; title: string; content: string };
    }>(`http://localhost:3000/api/posts/${postId}`);
  }
  updatePost(id: string, title: string, content: string) {
    const post: Post = { id, title, content };
    this.httpClient
      .put(`http://localhost:3000/api/posts/${id}`, post)
      .subscribe((res) => {
        this.posts = this.posts.map((p) => {
          if (p.id === id) return post;
          return p;
        });
        this.postsUpdated.next([...this.posts]);
      });
  }
}
