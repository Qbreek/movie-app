import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  constructor(private http: HttpClient) {}

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
              title: watchlistData[key].title,
              plot: watchlistData[key].plot,
              year: watchlistData[key].year,
              runtime: watchlistData[key].runtime,
              genre: watchlistData[key].genre,
              director: watchlistData[key].director,
              actors: watchlistData[key].actors,
              rating: watchlistData[key].rating,
              poster: watchlistData[key].poster,
              fbID: key,
            };
            watchlistArray.push(movie);
          }
          return watchlistArray;
        })
      );
  }
}
