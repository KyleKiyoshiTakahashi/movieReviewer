import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from '../movie.service'
@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  movieID;
  movie;
  nameErrorMessage: any;
  starsErrorMessage: any;
  reviewErrorMessage: any;
  constructor(private _route: ActivatedRoute,
    private _movieService: MovieService,
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
            this.movie = data['results']
          } 
          
      });
      (err)=>{ console.log(err); } 



    });
  }
  addReviewSubmit(){
    this._movieService.addAReviewByID(this.movieID, this.movie).subscribe(
      (response) => {
      this.nameErrorMessage = "";
      this.starsErrorMessage = "";
      this.reviewErrorMessage = "";
      if(response['status']){
        console.log('WE DID IT!')
      } else {
        console.log("error")
        console.log(response)
        if(response['err']['errors']['name']){
          this.nameErrorMessage = response['err']['errors']['name']['message'];
        }
        if(response['err']['errors']['stars']){
          this.starsErrorMessage = response['err']['errors']['stars']['message'];
        }
        if(response['err']['errors']['review']){
          this.reviewErrorMessage = response['err']['errors']['review']['message'];
        }
      }
      })
      this.movie = { name:"", stars:"", review:"" };
  }
  cancelCreate(){
    
    this._router.navigate(['/']);
    
  }
}
