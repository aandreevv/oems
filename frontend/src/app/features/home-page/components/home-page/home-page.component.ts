import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SideBarComponent} from "../../../../core/components/side-bar/side-bar.component";
import {NgClass} from "@angular/common";
import {AppState} from "../../../../core/store/root.reducer";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {filter, take} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, NgClass]
})
export class HomePageComponent {
  sideBarOpen: boolean;

  constructor(private store: Store<AppState>) {
    const sideBar = localStorage.getItem('sideBar') ?? '1';
    this.sideBarOpen = !!+sideBar;

    this.store.select('user').pipe(filter(user => !!user.user), take(1)).subscribe(user => {
      localStorage.setItem('id', user.user!.id)
      localStorage.setItem('userName', user.user!.fullName)
      localStorage.setItem('language', user.user!.language);
    });
  }

  toggleSideBar() {
    this.sideBarOpen = !this.sideBarOpen;
    localStorage.setItem('sideBar', `${this.sideBarOpen ? 1 : 0}`);
  }
}
