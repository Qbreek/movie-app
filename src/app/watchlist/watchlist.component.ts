import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../shared/movie.model';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.sass'],
})
export class WatchlistComponent implements OnInit, OnDestroy {
  watchlist: Movie[] = [];
  watchlistSubscription: Subscription;
  getSortedSub: Subscription;
  changeOccuredSub: Subscription;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.watchlistSubscription = this.firebaseService
      .getMovies('watchlist')
      .subscribe((firebaseWatchlist) => {
        this.watchlist = firebaseWatchlist;
      });

    this.changeOccuredSub = this.firebaseService.changeOccured.subscribe(() => {
      this.firebaseService
        .getMovies('watchlist')
        .subscribe((firebaseWatchlist) => {
          this.watchlist = firebaseWatchlist;
        });
    });

    this.getSortedSub = this.firebaseService.sortOccured.subscribe((filter) => {
      this.firebaseService
        .sortMovies(filter, 'watchlist')
        .subscribe((movieArray) => {
          this.watchlist = movieArray;
        });
    });
  }

  ngOnDestroy(): void {
    this.watchlistSubscription.unsubscribe();
    this.changeOccuredSub.unsubscribe();
    this.getSortedSub.unsubscribe();
  }
}
