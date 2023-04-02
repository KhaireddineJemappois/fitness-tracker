import { Subscription } from 'rxjs';
import { TrainingService } from '../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  constructor(private trainingService: TrainingService) {}
  ngOnDestroy(): void {
    this.exerciseSubs?.unsubscribe();
  }
  exerciseSubs!: Subscription;
  ngOnInit(): void {
    this.exerciseSubs = this.trainingService.exerciseChanged?.subscribe(
      (exercise) => {
        if (exercise) this.ongoingTraining = true;
        else this.ongoingTraining = false;
      }
    );
  }
}
