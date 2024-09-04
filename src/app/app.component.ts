import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CellComponent } from './cell/cell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'game-of-life';
}
