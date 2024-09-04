import { Injectable } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SimulationManagerService {
	static readonly STEP_INTERVAL_MS = 100;

	private intervalSubscription: Subscription | null = null;

	private stepSubject = new Subject<void>();
	public stepObservable$ = this.stepSubject.asObservable();

	private doStep(): void {
		this.stepSubject.next();
	}

	public play(): void {
		if (this.intervalSubscription) {
			return;
		}
		this.intervalSubscription = interval(
			SimulationManagerService.STEP_INTERVAL_MS
		).subscribe(() => this.doStep());
	}

	public pause(): void {
		if (!this.intervalSubscription) {
			return;
		}
		this.intervalSubscription.unsubscribe();
		this.intervalSubscription = null;
	}
}
