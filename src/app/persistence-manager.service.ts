import { Injectable } from '@angular/core';
import { FileManagerService } from './file-manager.service';

/**
 * Bitwise operators
 *
 * << Left shift
 * | Bitwise OR
 * & Bitwise AND
 * ~ Bitwise NOT
 * >>> Unsigned right shift, fills with 0's
 */

@Injectable({
	providedIn: 'root',
})
export class PersistenceManagerService {
	constructor(private fileManagerService: FileManagerService) {}

	public save(grid: boolean[][]) {
		if (grid.length === 0) {
			throw new Error('Failed to save grid, as grid length is 0');
		}
		const bufferSize = Math.ceil(grid.flat().length / 8);
		let buffer = new Uint8Array(bufferSize);
		grid.forEach((row, y) =>
			row.forEach((cell, x) => {
				if (!cell) {
					return;
				}
				const bitIdx = y * row.length + x;
				const bufferPos = Math.floor(bitIdx / 8);
				const bitPos = bitIdx % 8;
				if (cell) {
					buffer[bufferPos] |= 1 << bitPos;
				}
			})
		);

		this.logByteArray(buffer);

		this.fileManagerService.downloadByteArray(buffer, 'game-of-life.bin');
	}

	public load(buffer: Uint8Array, gridSize: number): boolean[][] {
		let grid: boolean[][] = Array.from({ length: gridSize }, () =>
			Array.from({ length: gridSize }, () => false)
		);

		grid = grid.map((row, y) =>
			row.map((cell, x) => {
				const bitIdx = y * row.length + x;
				const bufferPos = Math.floor(bitIdx / 8);
				const bitPos = bitIdx % 8;
				const bitValue = (buffer[bufferPos] & (1 << bitPos)) >>> bitPos;
				if (bitValue === 1) {
					return true;
				}
				return cell;
			})
		);
		return grid;
	}

	/**
	 * Logs a byte array to a binary string like the following
	 * 00000000 00000000 00000000 00000000
	 */
	private logByteArray(buffer: Uint8Array): void {
		console.log(
			Array.from(buffer)
				.map((byte) => byte.toString(2).padStart(8, '0'))
				.join(' ')
		);
	}
}
