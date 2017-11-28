import { Component, OnInit } from '@angular/core';
import { IBlog } from "./blogs";
import { BlogService } from "../blog.service";
import { DatePipe } from "@angular/common";

declare let $:any;

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  errorMessage: string;
  category: number = 0;
  blogs: IBlog[] = [];
  filteredBlogs: IBlog[] = [];

  constructor(private _blogService: BlogService) {}

  ngOnInit(): void {
    this._blogService.getBlogs()
      .subscribe(blogs => {
                        this.blogs = blogs;
                        // console.log(this.blogs[0].date < this.blogs[1].date ? 'yesss':'nooo');
                        this.categorize(0);
                    },
                 error => this.errorMessage = <any>error);
    $(document).ready(function() {
      $('ul.tabs').tabs();
    });
  }

  categoryFilter(): void {
    this.filteredBlogs = this.blogs.filter(blog => blog.category == this.category);
  }

  categorize(categoryID) {
    //alert(typeof categoryID);
    if(categoryID == 0) {
      this.category = 0;
      this.filteredBlogs = this.blogs;
    }
    else {
      this.category = categoryID;
      this.categoryFilter();
    }
  }
}
