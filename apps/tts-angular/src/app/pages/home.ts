import { Component, OnInit } from '@angular/core';
import * as meSpeak from 'mespeak';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  ngOnInit(): void {
    console.log("HEllo world");
  }

  play(): void {
    console.log("HEllo world");
  }
}
