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
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.watchlistSubscription = this.firebaseService
      .getWatchlist()
      .subscribe((response) => {
        this.watchlist = response;
      });

    this.firebaseService.changeOccured.subscribe(() => {
      this.firebaseService.getWatchlist().subscribe((res) => {
        this.watchlist = res;
      });
    });
  }

  ngOnDestroy(): void {
    this.watchlistSubscription.unsubscribe();
  }
}
