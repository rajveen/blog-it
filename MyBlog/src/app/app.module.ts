import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogsComponent } from './blogs/blogs.component';
import {BlogService} from "./blog.service";
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { WelcomeComponent } from './welcome/welcome.component';

const appRoutes = [
  {path: "", redirectTo: 'blogs', pathMatch: 'full'},
  {path: "blogs", component: BlogsComponent},
  {path: "blogs/:id", component: BlogDetailComponent},
  {path: "create-blog", component: BlogCreateComponent},
  {path: "welcome", component: WelcomeComponent},
  {path: "**", component: WelcomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogsComponent,
    BlogDetailComponent,
    BlogCreateComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
