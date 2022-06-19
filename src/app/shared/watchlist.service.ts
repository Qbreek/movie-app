import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Movie } from './movie.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  constructor(private http: HttpClient) {}

  //get watchlist from firebase
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
}
