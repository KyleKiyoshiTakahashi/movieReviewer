import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddMovieComponent } from './add-movie/add-movie.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { AllReviewsComponent } from './all-reviews/all-reviews.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './movie.service'
@NgModule({
  declarations: [
    AppComponent,

    AddMovieComponent,
    AllMoviesComponent,
    AllReviewsComponent,
    AddReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
