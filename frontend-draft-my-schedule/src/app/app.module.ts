import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllCoursesItemComponent } from './components/all-courses-item/all-courses-item.component';
import { AllCoursesSearchComponent } from './components/all-courses-search/all-courses-search.component';
import { CourseCodeSearchComponent } from './components/course-code-search/course-code-search.component';
import { ComponentSearchComponent } from './components/component-search/component-search.component';

@NgModule({
  declarations: [
    AppComponent,
    AllCoursesItemComponent,
    AllCoursesSearchComponent,
    CourseCodeSearchComponent,
    ComponentSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
