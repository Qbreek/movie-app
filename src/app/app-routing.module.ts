import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveComponent } from './archive/archive.component';
import { DiscoverComponent } from './discover/discover.component';
import { ProfileComponent } from './profile/profile.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/watchlist',
    pathMatch: 'full',
  },
  { path: 'profile', component: ProfileComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'archive', component: ArchiveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
