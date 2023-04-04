import { Store } from '@ngrx/store';
import * as UI from '../shared/ui.actions';
import * as TRAINING from '../training/training.actions';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subscription, take } from 'rxjs';
import { UiService } from '../shared/ui.service';

import * as fromTraining from '../training/training.reducer';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private fbSubs: Subscription[] = [];
  public fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArray) =>
            docArray.map((doc) => {
              const data = doc.payload.doc.data() as Exercise;
              const id = doc.payload.doc.id;
              return { ...data, id: id } as Exercise;
            })
          )
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new TRAINING.SetAvailableTrainings(exercises));
          },
          (error) => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackBar(
              'Fetching Exercises failed, please try again later',
              undefined,
              3000
            );
          }
        )
    );
  }
  public fetchFinishedExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises) => {
          this.store.dispatch(
            new TRAINING.SetFinishedTrainings(exercises as Exercise[])
          );
        })
    );
  }
  startExercise(selectedId: string) {
    this.store.dispatch(new TRAINING.StartTraining(selectedId));
  }
  completeExercise() {
    this.store
    .select(fromTraining.getActiveTraining)
    .pipe(take(1))
    .subscribe((runningExercise) =>{
    this.addDataToDatabase({
      ...(runningExercise as Exercise),
      date: new Date(),
      state: 'completed',
    })
  });


    this.store.dispatch(new TRAINING.StopTraining(null));
  }
  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((runningExercise) => {
        this.addDataToDatabase({
          ...(runningExercise as Exercise),
          duration: (runningExercise as Exercise).duration * (progress / 100),
          calories: (runningExercise as Exercise).calories * (progress / 100),
          date: new Date(),
          state: 'cancelled',
        });
      });

    this.store.dispatch(new TRAINING.StopTraining(null));
  }

  constructor(
    private db: AngularFirestore,
    private store: Store<fromTraining.State>,

    private uiService: UiService
  ) {}
  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise).then().catch();
  }
  cancelSubs() {
    this.fbSubs.forEach((s) => s.unsubscribe());
  }
}
