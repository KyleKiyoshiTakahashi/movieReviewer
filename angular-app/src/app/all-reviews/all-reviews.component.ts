import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-all-reviews',
  templateUrl: './all-reviews.component.html',
  styleUrls: ['./all-reviews.component.css']
})
export class AllReviewsComponent implements OnInit {
  reviews;
  movie;
  movieID: any;
  constructor( 
    private _movieService: MovieService,
    private _route: ActivatedRoute,
    private _router: Router) { }
  
  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("this is the paramsID", params['id'])
      this.movieID = params['id']
      let obs = this._movieService.getAMovie(this.movieID);
      obs.subscribe(
        (data) => {
          if(data['status']){
            console.log("+++++ WE FOUND A Movie and it's reviews +++++", data)
            this.movie= data['results']
            this.reviews = data['results']['reviews']
          } 
          
      });
      (err)=>{ console.log(err); } 



    });
  }
  deleteMovie(movieID){
    let temp = this._movieService.deleteAMovie(movieID);
    temp.subscribe( data => {
      this._router.navigate(['/']);
    })
  }
  
}
