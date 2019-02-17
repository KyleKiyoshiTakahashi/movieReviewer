import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private _http: HttpClient) {

   }
   getMovies(){
     return this._http.get('/movies')
   }
   addMovie(movie){
     return this._http.post('/new', movie)
   }
   getAMovie(id){
     return this._http.get('/movie/'+id)
   }
   deleteAMovie(id){
     return this._http.delete('/movie/'+id)
   }
   addAReviewByID(id, data){
     return this._http.put('/review/'+id, data)
   }
}
