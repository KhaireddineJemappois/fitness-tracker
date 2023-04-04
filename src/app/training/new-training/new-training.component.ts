import { getIsLoading } from './../../shared/ui.reducer';
import { UiService } from 'src/app/shared/ui.service';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  availableExercises$!: Observable<Exercise[]>;
  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}
  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.availableExercises$ = this.store.select(
      fromTraining.getAvailableTraining
    );

    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
