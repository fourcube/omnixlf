import { Component, OnInit } from '@angular/core';
const shell = (window as any).require('electron').shell;

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openLink($event, url) {
    $event.preventDefault();
    shell.openExternal(url);
  }
}
