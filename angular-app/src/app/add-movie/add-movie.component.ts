import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  newMovie: any;
  nameErrorMessage: any;
  titleErrorMessage: any;
  starsErrorMessage: any;
  reviewErrorMessage: any;
  constructor(private _router: Router,
    private _movieService: MovieService) { }

  ngOnInit() {
    this.newMovie = { title:"", name:"", stars:"", review:"" };
  }
  onNewMovieSubmit(){
    let obs = this._movieService.addMovie(this.newMovie);
    obs.subscribe( data => {
      this.nameErrorMessage = "";
      this.titleErrorMessage = "";
      this.starsErrorMessage = "";
      this.reviewErrorMessage = "";
      if( data['status']){
        console.log("WE DID IT!")
        
      } else {
        console.log("ERROR");
        console.log(data);
        if(data['err']['errors']['name']){
          this.nameErrorMessage = data['err']['errors']['name']['message'];
        }
        if(data['err']['errors']['title']){
          this.titleErrorMessage = data['err']['errors']['title']['message'];
        }
        if(data['err']['errors']['stars']){
          this.starsErrorMessage = data['err']['errors']['stars']['message'];
        }
        if(data['err']['errors']['review']){
          this.reviewErrorMessage = data['err']['errors']['review']['message'];
        }
      }
      console.log("we added a new movie", data);
      
    });
    this.newMovie = { title:"", name:"", stars:"", review:"" };
    
  }
  cancelCreate(){
    this.newMovie = { title:"", name:"", stars:"", review:"" };
    this._router.navigate(['/']);
    
  }
}
