import { Component, OnInit } from '@angular/core';
import {BlogService} from "../blog.service";
import {IBlog} from "../blogs/blogs";
import {Router} from "@angular/router";

declare let $:any;

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  errorMessage: string;

  constructor(private _blogService: BlogService,
              private _router: Router) { }

  ngOnInit() {
    $( document ).ready(function() {
      // console.log("jQuery is ready");
      $('select').material_select();
      $('.dropdown-content li:not(.disabled)>span').css("color", "#1976d2");
      //$('.dropdown-content li.disabled>span').css("color", "#0000004d");
    });
  }

  onCreate() {
    let title = document.getElementById('heading').innerText;
    let content = document.getElementById('body').innerText;
    let category = <HTMLSelectElement>document.getElementById('category');
    let currentOpt = category.options[category.selectedIndex];
    //console.log(currentOpt.text);
    if(!/\S/.test(title) || !/\S/.test(content) || !/\S/.test(currentOpt.value)) {
      alert('None of Title, Category or Content can be blank');
      return false;
    }

    let blogData: IBlog = {
      title: title,
      author: "Guest Author",
      content: content,
      date: new Date(),
      category: +currentOpt.value
      //formattedDate: ""
    };

    this._blogService.createBlog(blogData)
      .subscribe(blog => {
          // this.specificBlog = blog;
          alert('Blog successfully added');
          this._router.navigate(['/blogs']);
          // this.onClick();
        },
        error => this.errorMessage = <any>error);

    return true;
  }
}
