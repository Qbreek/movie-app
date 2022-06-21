import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Movie } from 'src/app/shared/movie.model';

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
    this.firebaseService.removeFromWatchlist(this.firebaseID);
  }

  onAddToArchive(): void {
    this.firebaseService.moveFromWatchlistToArchive(this.firebaseID);
  }
}
