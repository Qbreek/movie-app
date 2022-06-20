import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass'],
})
export class NavigationComponent implements OnInit {
  constructor() {}

  links = ['Watchlist', 'Discover', 'Favorites', 'Archive'];
  icons = ['movie', 'explore', 'favorite', 'inventory_2'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  ngOnInit(): void {}
}
