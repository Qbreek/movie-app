import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass'],
})
export class MovieListComponent implements OnInit {
  movieList = [];
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.movieSearchUpdated.subscribe(() => {
      this.movieList = this.moviesService.getMovieSearch();
      console.log(this.movieList);
    });
  }
}
