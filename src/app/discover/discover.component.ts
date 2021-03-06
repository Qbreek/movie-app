import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Movie } from '../shared/movie.model';
import { OmdbService } from '../services/omdb.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.sass'],
})
export class DiscoverComponent implements OnInit, OnDestroy {
  searchList: Movie[] = [];
  movieSearchSubscription: Subscription;

  constructor(private omdbService: OmdbService) {}

  ngOnInit(): void {
    this.searchList = this.omdbService.getMovieSearch(); // get session stored movie search querry
    this.movieSearchSubscription = // subscribe to changes on movie search in order to refresh page
      this.omdbService.movieSearchSuccessfullyCompleted.subscribe(() => {
        this.searchList = this.omdbService.getMovieSearch(); // new movie search querry
      });
  }

  ngOnDestroy(): void {
    this.movieSearchSubscription.unsubscribe();
  }
}
