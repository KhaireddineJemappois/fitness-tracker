import { UiService } from 'src/app/shared/ui.service';
import { Exercise } from './exercise.model';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, map, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private fbSubs: Subscription[] = [];
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[] | null>();
  finishedExercisesChanged = new Subject<Exercise[] | null>();
  private _availableExercises: Exercise[] = [];
  private _exercises: Exercise[] = [];
  public get exercises(): Exercise[] {
    return this._exercises.slice();
  }
  private _runningExercise: any;
  public get runningExercise(): any {
    return { ...this._runningExercise };
  }
  public fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
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
            debugger;
            this.uiService.loadingStateChanged.next(false);
            this._availableExercises = exercises;
            this.exercisesChanged.next([...this._availableExercises]);
          },
          error => {
            debugger;
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar('Fetching Exercises failed, please try again later',undefined,3000);
            this.exercisesChanged.next(null);
          }
        )
    );
  }
  public fetchFinishedExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe(
          (exercises) => {
            this.finishedExercisesChanged.next([...(exercises as Exercise[])]);
          }
          //  ,
          //     error=>{}
          //bad practice to only hide errors => unsubscribe
        )
    );
  }
  startExercise(selectedId: string) {
    //     this.db.doc('availableExercises/'+selectedId).update(
    // {lastSelected: new Date()}
    //     );
    this._runningExercise = this._availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged?.next({ ...this.runningExercise });
  }
  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this._runningExercise = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this._runningExercise.duration * (progress / 100),
      calories: this._runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this._runningExercise = null;
    this.exerciseChanged.next(null);
  }

  constructor(private db: AngularFirestore,private uiService:UiService) {}
  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise).then().catch();
  }
  cancelSubs() {
    this.fbSubs.forEach((s) => s.unsubscribe());
  }
}
