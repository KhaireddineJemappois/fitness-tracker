import { UiService } from 'src/app/shared/ui.service';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.model';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  isLoading$!: Observable<boolean>;
  constructor(
    private trainingService: TrainingService,
    private store: Store<fromRoot.State>
  ) {}
  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercisesSub = this.trainingService.exercisesChanged.subscribe(
       (exercises) => {

        console.log("this.availableExercises: ",exercises)
        this.availableExercises = exercises as Exercise[];
      }
    )
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
  availableExercises: Exercise[] = [];

  ngOnDestroy(): void {
    this.exercisesSub?.unsubscribe();
  }
  exercisesSub!: Subscription;

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
