import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less']
})
export class DefaultComponent implements OnInit {

  isOpen = true;
  constructor(public media: MediaObserver) { }

  ngOnInit(): void {
    if(this.media.isActive('xs')) {
      this.isOpen = false;
    }
  }

  navToggle($event): void {
    this.isOpen = !this.isOpen;
  }

}
