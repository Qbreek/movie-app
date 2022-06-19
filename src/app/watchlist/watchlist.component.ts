import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../shared/movie.model';
import { WatchlistService } from '../shared/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.sass'],
})
export class WatchlistComponent implements OnInit, OnDestroy {
  watchlist: Movie[] = [];
  watchlistSubscription: Subscription;
  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {
    this.watchlistSubscription = this.watchlistService
      .getWatchlist()
      .subscribe((response) => {
        this.watchlist = response;
      });
  }

  ngOnDestroy(): void {
    this.watchlistSubscription.unsubscribe();
  }
}
