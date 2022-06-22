import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Movie } from '../shared/movie.model';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private http: HttpClient) {}

  changeOccured = new Subject<boolean>();
  sortOccured = new Subject<string>();

  // send get request to firebase
  getMovies(path: string): Observable<Movie[]> {
    return this.http
      .get<{ key: string; obj: Movie }>(
        `https://movie-app-8f21c-default-rtdb.europe-west1.firebasedatabase.app/${path}.json`
      )
      .pipe(
        map((firebaseData) => {
          let movieArray: Movie[] = [];
          for (let key in firebaseData) {
            const movie: Movie = {
              ...firebaseData[key],
              fbID: key,
            };
            movieArray.push(movie);
          }
          return movieArray; // create array to use in components
        })
      );
  }

  postMovie(movie: Movie, path: string) {
    this.http
      .post<Movie>(
        `https://movie-app-8f21c-default-rtdb.europe-west1.firebasedatabase.app/${path}.json`,
        movie
      )
      .subscribe();
  }

  getMovie(firebaseID: string, path: string) {
    return this.http
      .get(
        `https://movie-app-8f21c-default-rtdb.europe-west1.firebasedatabase.app/${path}/${firebaseID}.json`
      )
      .pipe(
        map((movieData: Movie) => {
          let movie: Movie = new Movie(
            movieData.title,
            movieData.plot,
            movieData.year,
            movieData.runtime,
            movieData.genre,
            movieData.director,
            movieData.actors,
            movieData.rating,
            movieData.poster,
            movieData.imbdbID
          );
          return movie;
        })
      );
  }

  deleteMovie(firebaseID: string, path: string) {
    this.http
      .delete(
        `https://movie-app-8f21c-default-rtdb.europe-west1.firebasedatabase.app/${path}/${firebaseID}.json`
      )
      .subscribe({
        complete: () => {
          this.changeOccured.next(true);
        },
      });
  }

  // sort movies dynamically
  sortMovies(filter: string, path: string) {
    return this.getMovies(path).pipe(
      map((movieArray) => {
        return movieArray.sort((a, b) => {
          if (a.hasOwnProperty(filter) && b.hasOwnProperty(filter)) {
            if (a[filter] < b[filter]) {
              return 1;
            } else if (a[filter] > b[filter]) {
              return -1;
            }
            return 0;
          }
        });
      })
    );
  }

  // TODO : replace with firebase function
  moveFromWatchlistToArchive(firebaseID: string) {
    this.getMovie(firebaseID, 'watchlist').subscribe((movie: Movie) => {
      this.postMovie(movie, 'archive');
      this.deleteMovie(firebaseID, 'watchlist');
    });
  }
}
