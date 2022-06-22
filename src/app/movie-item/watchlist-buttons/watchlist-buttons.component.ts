import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-watchlist-buttons',
  templateUrl: './watchlist-buttons.component.html',
  styleUrls: ['./watchlist-buttons.component.sass'],
})
export class WatchlistButtonsComponent implements OnInit {
  @Input() firebaseID: string;
  @Input() imdbID: string;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {}

  onRemoveFromWatchlist(): void {
    this.firebaseService.deleteMovie(this.firebaseID, 'watchlist');
  }

  onAddToArchive(): void {
    this.firebaseService.moveFromWatchlistToArchive(this.firebaseID);
  }
}
