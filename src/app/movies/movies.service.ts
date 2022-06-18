import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { Movie } from 'src/shared/movie.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  movieSearch = [];
  movieSearchUpdated = new Subject<boolean>();

  //dummy movies for styling
  dummy = [
    'the lighthouse',
    'one flew over',
    'the lord of the rings',
    'fear and loathing in las vegas',
  ];

  constructor(private http: HttpClient) {}

  getMovie(title: string) {
    this.http
      .get<any>(`http://www.omdbapi.com/?apikey=997675d2&t=${title}`)
      .pipe(
        map((movieResponse) => {
          const movie = new Movie(
            movieResponse.Title,
            movieResponse.Plot,
            movieResponse.Year,
            movieResponse.Runtime,
            movieResponse.Genre,
            movieResponse.Director,
            movieResponse.Actors,
            movieResponse.imdbRating,
            movieResponse.Poster
          );
          return movie;
        })
      )
      .subscribe((movieResponse) => {
        this.movieSearch.push(movieResponse);
        this.movieSearchUpdated.next(true);
      });
  }

  getMovieSearch() {
    return this.movieSearch.slice();
  }

  loadDummy() {
    this.dummy.forEach((dummy) => {
      this.getMovie(dummy);
    });
  }
}
