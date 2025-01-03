import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  shrink = false;
  menuOpened = false;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      this.menuOpened = false;
    });
  }
}
