import { UiService } from 'src/app/shared/ui.service';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  constructor(
    private trainingService: TrainingService,
    private uiService: UiService
  ) {}
  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading}
    );
    this.exercisesSub = this.trainingService.exercisesChanged.subscribe(
       (exercises) => {

        console.log("this.availableExercises: ",exercises)
        this.availableExercises = exercises as Exercise[];
      }
    )
    this.fetchExercises();
  }
  isLoading: boolean = false;
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
  availableExercises: Exercise[] = [];

  ngOnDestroy(): void {
    this.exercisesSub?.unsubscribe();
    this.loadingSubs?.unsubscribe();
  }
  exercisesSub!: Subscription;
  loadingSubs!: Subscription;

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
