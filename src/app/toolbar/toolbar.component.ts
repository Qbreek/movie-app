import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MoviesService } from '../movies/movies.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  constructor(private moviesService: MoviesService) {}
  sub: Subscription;

  ngOnInit(): void {
    this.moviesService.loadDummy();
  }

  onSearchMovie(searchValue: string) {
    if (searchValue.length > 0) {
      this.moviesService.getMovie(searchValue);
    }
  }

  ngOnDestroy(): void {}
}
