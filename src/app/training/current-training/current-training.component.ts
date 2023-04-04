import { MatDialog } from '@angular/material/dialog';

import { StopTrainingComponent } from './stop-training/stop-training.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { TrainingService } from '../training.service';

import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Exercise } from '../exercise.model';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  timer: any;
  @Output() trainingExit = new EventEmitter<void>();
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    // this.currentExercise$ = this.store.select(fromTraining.getActiveTraining)
    this.startOrResumeTimer();
  }
  currentExercise$!: Observable<Exercise | undefined>;
  startOrResumeTimer() {
    this.store.select(fromTraining.getActiveTraining)
    .pipe(take(1))// to subscribe just once
    .subscribe(ex => {
      const step = ((ex as Exercise).duration / 100) * 1000;
      this.timer = setInterval(() => {
        this.progress += 1;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, step);
    });
  }
  onStop() {
    clearInterval(this.timer);
    this.dialog
      .open(StopTrainingComponent, {
        data: {
          progress: this.progress,
        },
      })
      .afterClosed()
      .subscribe((result: any) => {

        if (!result) this.startOrResumeTimer();
        else {
          debugger;
          this.trainingService.cancelExercise(this.progress);
           clearInterval(this.timer);
        }
      });
  }
}
