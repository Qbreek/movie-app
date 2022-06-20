import { Component, Input, OnInit } from '@angular/core';
import { OmdbService } from 'src/app/shared/omdb.service';
import { WatchlistService } from 'src/app/shared/watchlist.service';

@Component({
  selector: 'app-discover-buttons',
  templateUrl: './discover-buttons.component.html',
  styleUrls: ['./discover-buttons.component.sass'],
})
export class DiscoverButtonsComponent implements OnInit {
  @Input() id: string;
  constructor(
    private omdbService: OmdbService,
    private watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {}

  onAddToWatchlist() {
    let movie = this.omdbService.getMovieByImdbID(this.id);
    this.watchlistService.addToWatchlist(movie);
  }
}
