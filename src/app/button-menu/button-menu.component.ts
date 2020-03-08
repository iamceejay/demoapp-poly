import { Component, OnInit } from '@angular/core';
import { buttonMenuAnimations } from './button-menu.animations';

@Component({
  selector: 'app-button-menu',
  templateUrl: './button-menu.component.html',
  styleUrls: ['./button-menu.component.scss'],
  animations: buttonMenuAnimations
})
export class ButtonMenuComponent implements OnInit {

  fabButtons = [
    {
      icon: 'add',
      tooltip: 'Add user',
      link: '/user/add'
    },
    {
      icon: 'visibility',
      tooltip: 'View users',
      link: '/'
    }
  ];
  buttons = [];
  fabTogglerState = 'inactive';

  constructor() {}

  ngOnInit(): void {}

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

}
