import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.sass'],
})
export class MovieItemComponent implements OnInit {
  @Input() movie: Movie;
  movieClicked = false;

  constructor() {}

  ngOnInit(): void {}

  onMovieClicked() {
    this.movieClicked = !this.movieClicked; //switch card to showcase poster or details
  }

  onAddToWatchlist() {}
}
