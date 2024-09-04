import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class FileManagerService {
	public downloadByteArray(data: Uint8Array, fileName: string): void {
		const blob = new Blob([data], { type: 'application/octet-stream' });
		const url = window.URL.createObjectURL(blob);
		this.downloadURL(url, fileName);
		setTimeout(() => {
			window.URL.revokeObjectURL(url);
		}, 1000);
	}

	private downloadURL(url: string, fileName: string): void {
		const a = document.createElement('a');
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.style.display = 'none';
		a.click();
		a.remove();
	}

	public readFileAsUint8Array(file: File): Promise<Uint8Array> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				const buffer = event.target?.result as ArrayBuffer;
				if (buffer) {
					resolve(new Uint8Array(buffer));
				}
			};
			reader.onerror = () => reject('Failed to read file');
			reader.readAsArrayBuffer(file);
		});
	}
}
