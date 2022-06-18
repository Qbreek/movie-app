import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/shared/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.sass'],
})
export class MovieItemComponent implements OnInit {
  @Input() movie: Movie;
  constructor() {}

  ngOnInit(): void {}
}
