import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import {AuthUtil} from '../../shared/util/auth.util';

interface MenuItems {
  section?: string;
  items: {
    label: string;
    icon: string;
    iconFill: string;
    routerLink: string;
    counter: number;
  }[];
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Output() shrink = new EventEmitter<boolean>();
  shrinkValue = false;
  hovered = false;
  topPosition = 0;
  activeIndex = 0;
  tooltipIndex = 0;
  topTooltip = '';

  menuItems: MenuItems[] = [
    {
      items: [
        {
          label: 'Home',
          icon: 'bx-home',
          iconFill: 'bxs-home',
          routerLink: 'home',
          counter: 0,
        },
        {
          label: 'Regiões',
          icon: 'bx-map-pin',
          iconFill: 'bxs-map-pin',
          routerLink: 'region',
          counter: 1,
        },
      ],
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart || event instanceof NavigationEnd) {
        this.activeIndex = this.menuItems
          .map((section) => section.items)
          .reduce((acc, val) => acc.concat(val), [])
          .findIndex(
            (item) =>
              item.routerLink === this.activatedRoute.snapshot.firstChild?.routeConfig?.path
          );
        this.moveActiveTab();
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => this.moveActiveTab());
  }

  toggleShrink(): void {
    this.shrinkValue = !this.shrinkValue;
    this.shrink.emit(this.shrinkValue);
    setTimeout(() => this.moveActiveTab(), 400);
    this.hovered = true;
    setTimeout(() => (this.hovered = false), 500);
  }

  moveActiveTab(): void {
    if (window.innerWidth < 768) {
      return;
    }
    this.topPosition = this.activeIndex * 50 + 2.5;
    const shortcuts = document.querySelector('.sidebar-links h4');
    if (!shortcuts) {
      return;
    }
    const shortcutsHeight = shortcuts.clientHeight;
    this.topPosition += this.calculateSectionOffsets(shortcutsHeight);
  }


  calculateSectionOffsets(shortcutsHeight: number): number {
    let offset = 0;
    let cumulativeIndex = 0;

    for (const section of this.menuItems) {
      cumulativeIndex += section.items.length;
      if (this.activeIndex < cumulativeIndex) {
        break;
      }
      offset += shortcutsHeight;
    }
    return offset;
  }

  showToolTip(tooltipIndex: number, length: number): void {
    if (window.innerWidth < 768) {
      return;
    }
    this.tooltipIndex = tooltipIndex;
    this.topTooltip = `${(100 / (length * 2)) * (tooltipIndex * 2 + 1)}%`;
  }

  logOut(): void {
    AuthUtil.logOut(this.router);
  }

}
