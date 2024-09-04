import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, GameOfLifeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'game-of-life';
}
