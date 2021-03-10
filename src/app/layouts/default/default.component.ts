import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less']
})
export class DefaultComponent implements OnInit {

  @Output() toggleNavBody: EventEmitter<boolean> = new EventEmitter();

  isOpen = true;
  constructor(public media: MediaObserver) { }

  ngOnInit(): void {
    if(this.media.isActive('xs')) {
      this.isOpen = false;
    }
  }

  toggleSideNav() {
    this.isOpen = !this.isOpen;
  }

  navToggle($event): void {
    this.isOpen = !this.isOpen;
  }

}
