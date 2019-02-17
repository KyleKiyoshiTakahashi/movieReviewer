import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { AllReviewsComponent } from './all-reviews/all-reviews.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AddReviewComponent } from './add-review/add-review.component';

const routes: Routes = [
  { path: '', component: AllMoviesComponent },
  { path: 'movie/:id', component: AllReviewsComponent },
  { path: 'new', component: AddMovieComponent },
  { path: 'review/:id', component: AddReviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
