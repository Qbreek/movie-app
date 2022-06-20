import { Component, Input, OnInit } from '@angular/core';
import { WatchlistService } from 'src/app/shared/watchlist.service';

@Component({
  selector: 'app-watchlist-buttons',
  templateUrl: './watchlist-buttons.component.html',
  styleUrls: ['./watchlist-buttons.component.sass'],
})
export class WatchlistButtonsComponent implements OnInit {
  @Input() id: string;
  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {}

  onRemoveFromWatchlistBtnClicked() {
    console.log(this.id);
    this.watchlistService.removeFromWatchlist(this.id);
  }
}
