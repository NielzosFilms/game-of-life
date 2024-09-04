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
		// TODO
	}

	public load(buffer: Uint8Array, gridSize: number): boolean[][] {
		// TODO
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
