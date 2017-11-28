import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

declare let $:any;

import { IBlog } from "../blogs";
import { BlogService } from "../../blog.service";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  id: number;
  blogs: IBlog[] = [];
  specificBlog: IBlog;
  errorMessage: string;
  canEdit: boolean = false;
  editBtn: string = "Edit";

  constructor(private _route: ActivatedRoute,
              private _blogService: BlogService,
              private _router: Router) {}

  ngOnInit() {
    this.id = +this._route.snapshot.paramMap.get('id');

    this._blogService.getBlogs()
      .subscribe(blogs => {
          this.blogs = blogs;
          this.specificBlog = this.blogs.find(x => x.id === this.id);
          this.dropdownInit();
          $('span.caret').addClass('disabled');
          $('input.select-dropdown').attr('disabled', 'disabled');
        },
          error => this.errorMessage = <any>error);

    $( document ).ready(function() {
      // $('select').material_select();
      // $('.dropdown-content li:not(.disabled)>span').css("color", "#1976d2");
      //console.log('doc ready');
    });

  }

  onClick() {
    this.canEdit = !this.canEdit;
    if(this.canEdit) {
      this.editBtn = "Revert";
      $('span.caret').removeClass('disabled');
      $('input.select-dropdown').removeAttr('disabled');
    }
    else {
      this.editBtn = "Edit";
      document.getElementById('heading').innerText = this.specificBlog.title;
      document.getElementById('body').innerText = this.specificBlog.content;
      this.dropdownInit();
      $('span.caret').addClass('disabled');
      $('input.select-dropdown').attr('disabled', 'disabled');
    }
  }

  onUpdate() {
    let title = document.getElementById('heading').innerText;
    let content = document.getElementById('body').innerText;
    let category = <HTMLSelectElement>document.getElementById('category');
    let currentOpt = category.options[category.selectedIndex];

    if(!/\S/.test(title) || !/\S/.test(content) || !/\S/.test(currentOpt.value)) {
      alert('None of Title, Category or Content can be blank');
      return false;
    }
    let blogData: IBlog = {
      title: title,
      author: this.specificBlog.author,
      content: content,
      date: new Date(),
      id: this.id,
      category: +currentOpt.value
    };

    this._blogService.updateBlog(blogData)
      .subscribe(blog => {
          this.specificBlog = blog;
          // this._router.navigate(['/blogs']);
          this.onClick();
        },
        error => this.errorMessage = <any>error);

    return true;
  }

  onDelete() {
    if(confirm('Are you sure you want to delete this blog?') === true) {
      this._blogService.deleteBlog(this.id)
        .subscribe(res => {
          this._router.navigate(['/blogs']);
        },
          error => this.errorMessage = <any>error);
    }
  }

  dropdownInit() {
    $('select').material_select();
    $('.dropdown-content li:not(.disabled)>span').css("color", "#1976d2");
    $('.dropdown-content li').addClass((index) => {
      let id = this.specificBlog.category;
      if (id == 1)
        $('input.select-dropdown').val('Sports');
      else if (id == 2)
        $('input.select-dropdown').val('Technology');
      else
        $('input.select-dropdown').val('Entertainment');
      return (index == id) ? "active" : "";
    });
  }
}
