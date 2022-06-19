//Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//Material UI imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

//Component imports
import { AppComponent } from './app.component';
import { DiscoverComponent } from './discover/discover.component';
import { ProfileComponent } from './profile/profile.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { NavigationComponent } from './toolbar/navigation/navigation.component';
import { SearchComponent } from './filters/search/search.component';
import { FiltersComponent } from './filters/filters.component';

//Pipes
import { TrimOver20CharPipe } from './shared/trim-over20-char.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DiscoverComponent,
    ProfileComponent,
    WatchlistComponent,
    MovieItemComponent,
    ToolbarComponent,
    TrimOver20CharPipe,
    MovieDisplayComponent,
    NavigationComponent,
    SearchComponent,
    FiltersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
