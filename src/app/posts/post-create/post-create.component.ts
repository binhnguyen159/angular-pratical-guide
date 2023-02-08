import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PostsService } from '../post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enterdTitle: string = '';
  enterdContent: string = '';
  post: Post;
  isLoading: boolean = false;
  private mode = 'create';
  private postId: string = '';

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        //
        this.postsService.getPost(this.postId).subscribe((postData) => {
          //
          this.post = { ...postData.post, id: postData.post._id };
        });
        console.log('this.post', this.post);
      } else {
        this.mode = 'create';
        this.postId = '';
        this.post = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    console.log({ form });
    if (form.invalid) return;
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else if (this.mode === 'edit') {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
