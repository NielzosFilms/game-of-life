import { Component } from '@angular/core';
import { GameOfLifeService } from '../game-of-life.service';
import { SimulationManagerService } from '../simulation-manager.service';

@Component({
	selector: 'app-game-of-life',
	standalone: true,
	imports: [],
	templateUrl: './game-of-life.component.html',
	styleUrl: './game-of-life.component.scss',
})
export class GameOfLifeComponent {
	public grid: boolean[][] = [];

	constructor(
		private gameOfLifeService: GameOfLifeService,
		private simulationManagerService: SimulationManagerService
	) {
		this.gameOfLifeService.grid$.subscribe((grid) => (this.grid = grid));
	}

	public get generation(): number {
		return this.gameOfLifeService.generation;
	}

	public get population(): number {
		return this.gameOfLifeService.getPopulation();
	}

	public playSimulation(): void {
		this.simulationManagerService.play();
	}

	public pauseSimulation(): void {
		this.simulationManagerService.pause();
	}

	public clearSimulation(): void {
		this.gameOfLifeService.clearGrid();
	}

	public randomizeSimulation(): void {
		this.gameOfLifeService.randomizeGrid();
	}

	public toggleCell(x: number, y: number): void {
		this.gameOfLifeService.toggleCell(x, y);
	}
}
