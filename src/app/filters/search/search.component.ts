import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OmdbService } from 'src/app/services/omdb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
  searchMode: string = '';
  constructor(private omdbService: OmdbService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case '/discover':
            this.searchMode = 'discover';
            break;
          case '/watchlist':
            this.searchMode = 'watchlist';
            break;
        }
      }
    });
  }

  onSearchMovie(searchValue: string) {
    switch (this.searchMode) {
      case 'discover':
        if (searchValue.length > 0) {
          this.omdbService.getMovie(searchValue);
        }
        break;
      case 'watchlist':
        console.log('sir this is burger king');
    }
  }
}
