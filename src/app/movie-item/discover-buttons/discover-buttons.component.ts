import { Component, Input, OnInit } from '@angular/core';
import { OmdbService } from 'src/app/services/omdb.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-discover-buttons',
  templateUrl: './discover-buttons.component.html',
  styleUrls: ['./discover-buttons.component.sass'],
})
export class DiscoverButtonsComponent implements OnInit {
  @Input() id: string;
  constructor(
    private omdbService: OmdbService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {}

  onAddToWatchlist() {
    const movie = this.omdbService.getMovieByImdbID(this.id);
    this.firebaseService.postMovie(movie, 'watchlist');
  }
}
