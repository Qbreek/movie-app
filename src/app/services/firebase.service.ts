import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Movie } from '../shared/movie.model';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private http: HttpClient) {}

  changeOccured = new Subject<boolean>();

  //watchlist methods
  getWatchlist() {
    return this.http
      .get<{ key: string; obj: Movie }>(
        'https://movie-app-8f21c-default-rtdb.europe-west1.firebasedatabase.app/watchlist.json'
      )
      .pipe(
        map((watchlistData) => {
          let watchlistArray: Movie[] = [];
          for (let key in watchlistData) {
            const movie: Movie = {
              ...watchlistData[key],
              fbID: key,
            };
            watchlistArray.push(movie);
          }
          return watchlistArray;
        })
      );
  }

  addToWatchlist(movie: Movie) {
    this.http
      .post<Movie>(
        'https://movie-app-8f21c-default-rtdb.europe-west1.firebasedatabase.app/watchlist.json',
        movie
      )
      .subscribe();
  }

  removeFromWatchlist(firebaseID: string) {
    this.http
      .delete(
        `https://movie-app-8f21c-default-rtdb.europe-west1.firebasedatabase.app/watchlist/${firebaseID}.json`
      )
      .subscribe(() => {
        this.changeOccured.next(true);
      });
  }

  getMovieFromWatchlist(firebaseID: string) {
    return this.http
      .get(
        `https://movie-app-8f21c-default-rtdb.europe-west1.firebasedatabase.app/watchlist/${firebaseID}.json`
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

  //archive methods
  getArchive() {
    return this.http
      .get<{ key: string; obj: Movie }>(
        'https://movie-app-8f21c-default-rtdb.europe-west1.firebasedatabase.app/archive.json'
      )
      .pipe(
        map((archiveData) => {
          let archiveArray: Movie[] = [];
          for (let key in archiveData) {
            const movie: Movie = {
              ...archiveData[key],
              fbID: key,
            };
            archiveArray.push(movie);
          }
          return archiveArray;
        })
      );
  }

  addToArchive(movie: Movie) {
    this.http
      .post<Movie>(
        'https://movie-app-8f21c-default-rtdb.europe-west1.firebasedatabase.app/archive.json',
        movie
      )
      .subscribe();
  }

  removeFromArchive(firebaseID: string) {
    this.http
      .delete(
        `https://movie-app-8f21c-default-rtdb.europe-west1.firebasedatabase.app/archive/${firebaseID}.json`
      )
      .subscribe();
  }

  //combined methods
  moveFromWatchlistToArchive(firebaseID: string) {
    this.getMovieFromWatchlist(firebaseID).subscribe((movie: Movie) => {
      this.addToArchive(movie);
      this.removeFromWatchlist(firebaseID);
    });
  }
}
