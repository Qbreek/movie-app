import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.sass'],
})
export class FiltersComponent implements OnInit {
  appliedFilter: string = '';
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {}

  byRating() {
    this.firebaseService.sortOccured.next('rating');
    this.appliedFilter = 'Rating';
  }

  byRelease() {
    this.firebaseService.sortOccured.next('year');
    this.appliedFilter = 'Release Date';
  }

  byRuntime() {
    this.firebaseService.sortOccured.next('runtime');
    this.appliedFilter = 'Runtime';
  }
}
