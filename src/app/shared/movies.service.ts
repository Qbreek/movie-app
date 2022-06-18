import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { Movie } from 'src/app/shared/movie.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  movieSearch = [];
  movieSearchUpdated = new Subject<boolean>(); //inform components of updated search list
  movieSearchError = new Subject<boolean>();

  //dummy movies for styling
  dummy = [
    'the lighthouse',
    'one flew over',
    'the lord of the rings',
    'fear and loathing in las vegas',
    'harry potter',
    'the matrix',
  ];

  constructor(private http: HttpClient) {}

  getMovie(title: string) {
    this.http
      .get<any>(`http://www.omdbapi.com/?apikey=997675d2&t=${title}`)
      .pipe(
        map((movieResponse) => {
          const serverResponse = //OMDB api responds to wrong searches with {Response : 'True' or 'False}
            movieResponse.Response === 'True' ? true : false;
          if (serverResponse) {
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
          } else {
            throw new Error('Movie not found');
          }
        })
      )
      .subscribe(
        (movieResponse) => {
          this.movieSearch.unshift(movieResponse);
          this.movieSearchUpdated.next(true);
        },
        (error) => {
          console.log(error);
          this.movieSearchError.next(true);
        },
        () => {
          console.log('completed!');
        }
      );
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
