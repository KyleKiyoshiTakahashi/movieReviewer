import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit {
  movies: any;
  constructor( 
    private _movieService: MovieService,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getMoviesFromService();
  }
  getMoviesFromService(){
    let obs = this._movieService.getMovies();
    obs.subscribe(data => {
      console.log("+++++We GOT OUR MOVIES FROM SERVICE++++++", data)
      this.movies = data
    })
  }
}
