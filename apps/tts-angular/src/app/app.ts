import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { Home } from './pages/home';

@Component({
  imports: [NxWelcome, RouterModule, Home],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',

})
export class App {
  protected title = 'tts-angular';
}
