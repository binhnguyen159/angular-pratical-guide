import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { PostsService } from '../post.service';
import { Post } from './../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Array<Post> = [
    // { title: 'First post', content: "This is the first post's content" },
    // { title: 'Second post', content: "This is the Second post's content" },
    // { title: 'Third post', content: "This is the Third post's content" },
    // { title: 'Fouth post', content: "This is the Fouth post's content" },
    // { title: 'Fith post', content: "This is the Fith post's content" },
    // { title: 'Fith post', content: "This is the Fith post's content" },
  ];

  private postsSub: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    // this.posts = this.postsService.getPosts();
    this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
