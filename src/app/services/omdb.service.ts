import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, map } from 'rxjs';
import { Movie } from 'src/app/shared/movie.model';

@Injectable({ providedIn: 'root' })
export class OmdbService {
  private movieSearch: Movie[] = [];
  movieSearchSuccessfullyCompleted = new Subject<boolean>(); // inform components of updated search list

  constructor(private http: HttpClient) {}

  // get movie by title from OMDBapi
  getMovie(title: string) {
    this.http
      .get<any>(`http://www.omdbapi.com/?apikey=997675d2&t=${title}`)
      .pipe(
        map((omdbResponse) => {
          const responseOK = omdbResponse.Response === 'True' ? true : false; // OMDB api responds to wrong searches with {Response : 'True' or 'False}
          if (responseOK) {
            const movie = new Movie(
              omdbResponse.Title,
              omdbResponse.Plot,
              omdbResponse.Year,
              omdbResponse.Runtime.replace('min', ''),
              omdbResponse.Genre,
              omdbResponse.Director,
              omdbResponse.Actors,
              omdbResponse.imdbRating,
              omdbResponse.Poster,
              omdbResponse.imdbID
            );
            return movie;
          } else {
            throw new Error('Movie not found');
          }
        })
      )
      .subscribe({
        next: (movieObject) => {
          this.movieSearch.unshift(movieObject);
        },
        error: (error) => {
          console.log(error);
          this.movieSearchSuccessfullyCompleted.next(false);
        },
        complete: () => {
          this.movieSearchSuccessfullyCompleted.next(true);
        },
      });
  }

  getMovieSearch() {
    return this.movieSearch.slice();
  }

  getMovieByImdbID(id: string) {
    return this.movieSearch.slice().find((movie) => movie.imbdbID === id);
  }
}
