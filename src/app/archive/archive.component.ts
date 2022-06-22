import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { Movie } from '../shared/movie.model';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.sass'],
})
export class ArchiveComponent implements OnInit, OnDestroy {
  archive: Movie[] = [];
  getMoviesSub: Subscription;
  getSortedSub: Subscription;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getMoviesSub = this.firebaseService
      .getMovies('archive')
      .subscribe((firebaseArchive) => {
        this.archive = firebaseArchive;
      });

    this.getSortedSub = this.firebaseService.sortOccured.subscribe((filter) => {
      this.firebaseService
        .sortMovies(filter, 'archive')
        .subscribe((movieArray) => {
          this.archive = movieArray;
        });
    });
  }

  ngOnDestroy(): void {
    this.getMoviesSub.unsubscribe();
    this.getSortedSub.unsubscribe();
  }
}
