import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit,OnDestroy {
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
  availableExercises: Exercise[] = [];
  constructor(private trainingService: TrainingService,private db: AngularFirestore) {}
  ngOnDestroy(): void {
    this.exercisesSub.unsubscribe();
  }
  exercisesSub!:Subscription;
  ngOnInit(): void {
    this.exercisesSub=this.trainingService.exercisesChanged.subscribe(exercises=>
      (this.availableExercises=exercises  as Exercise[]));
    this.trainingService.fetchAvailableExercises()
    // .subscribe(result=>console.log(result))

  }
}
