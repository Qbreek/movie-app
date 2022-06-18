import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies/movies.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
})
export class ToolbarComponent implements OnInit {
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.loadDummy();
  }

  onSearchMovie(searchValue: string) {
    if (searchValue.length > 0) {
      this.moviesService.getMovie(searchValue);
    }
  }
}
