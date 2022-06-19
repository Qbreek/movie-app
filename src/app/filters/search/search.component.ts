import { Component, OnInit } from '@angular/core';
import { OmdbService } from 'src/app/shared/omdbService.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
  constructor(private omdbService: OmdbService) {}

  ngOnInit(): void {}

  onSearchMovie(searchValue: string) {
    if (searchValue.length > 0) {
      this.omdbService.getMovie(searchValue);
    }
  }
}
