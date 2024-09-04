import { Injectable } from '@angular/core';
import { SimulationManagerService } from './simulation-manager.service';
import { BehaviorSubject } from 'rxjs';
import { PersistenceManagerService } from './persistence-manager.service';
import { FileManagerService } from './file-manager.service';

@Injectable({
	providedIn: 'root',
})
export class GameOfLifeService {
	// prettier-ignore
	private readonly DIRECTIONS = [
		[-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
		[1, -1],  [1, 0],  [1, 1],
	];

	private grid: boolean[][];
	private rows: number;
	private cols: number;

	public generation: number = 0;

	public grid$ = new BehaviorSubject<boolean[][]>([]);

	constructor(
		private simulationManagerService: SimulationManagerService,
		private persistenceManagerService: PersistenceManagerService,
		private fileManagerService: FileManagerService
	) {
		this.rows = 40;
		this.cols = 40;
		this.grid = this.initializeGrid();
		this.simulationManagerService.stepObservable$.subscribe(() =>
			this.doSimulationStep()
		);
		this.grid$.next(this.grid);
	}

	private doSimulationStep(): void {
		this.grid = this.grid.map((row, y) =>
			row.map((cell, x) => {
				const aliveNeighbours = this.countAliveNeighbours(
					this.grid,
					x,
					y
				);

				if (cell && (aliveNeighbours < 2 || aliveNeighbours > 3)) {
					return false;
				}
				if (!cell && aliveNeighbours === 3) {
					return true;
				}
				return cell;
			})
		);
		this.generation++;
		this.grid$.next(this.grid);
	}

	private countAliveNeighbours(
		grid: boolean[][],
		x: number,
		y: number
	): number {
		let aliveNeighbours = 0;
		for (const [dx, dy] of this.DIRECTIONS) {
			const newX = x + dx;
			const newY = y + dy;
			if (this.isInBounds(newX, newY, grid)) {
				aliveNeighbours += grid[newY][newX] ? 1 : 0;
			}
		}
		return aliveNeighbours;
	}

	private initializeGrid(): boolean[][] {
		this.generation = 0;
		return Array.from({ length: this.rows }, () =>
			Array.from({ length: this.cols }, () => false)
		);
	}

	public randomizeGrid(): void {
		this.simulationManagerService.pause();
		this.grid = this.initializeGrid();
		this.grid = this.grid.map((row) => row.map(() => Math.random() > 0.7));
		this.grid$.next(this.grid);
	}

	public clearGrid(): void {
		this.simulationManagerService.pause();
		this.grid = this.initializeGrid();
		this.grid$.next(this.grid);
	}

	private isInBounds(x: number, y: number, grid: boolean[][]): boolean {
		return y > 0 && y < grid.length && x > 0 && x < grid[y].length;
	}

	public getPopulation(): number {
		return this.grid.flat().filter(Boolean).length;
	}

	public toggleCell(x: number, y: number): void {
		this.grid[y][x] = !this.grid[y][x];
		this.grid$.next(this.grid);
	}

	public async loadGridFromFile(file: File): Promise<void> {
		this.grid = this.persistenceManagerService.load(
			await this.fileManagerService.readFileAsUint8Array(file),
			40
		);
		this.grid$.next(this.grid);
	}
}
