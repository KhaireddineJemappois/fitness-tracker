import { Action } from "@ngrx/store"
import { Exercise } from "./exercise.model"

export const SET_AVAILABLE_TRAININGS ='[TRAINING] Set available trainings'
export const SET_FINISHED_TRAININGS ='[TRAINING] Set fnished trainings'
export const START_TRAINING ='[TRAINING] Start training'
export const STOP_TRAINING ='[TRAINING] Stop training'
export class SetAvailableTrainings implements Action
{
  readonly type=SET_AVAILABLE_TRAININGS;
  /**
   *
   */
  constructor(public payload:Exercise[]) {


  }
}
export class SetFinishedTrainings implements Action
{
  type=SET_FINISHED_TRAININGS;
  constructor(public payload:Exercise[]) {}

}
export class StartTraining implements Action
{
  constructor(public payload:string) {}
  type=START_TRAINING;
}
export class StopTraining implements Action
{
  type=STOP_TRAINING;
  constructor(public payload:Exercise | null) {}
}
export type TrainingActions=SetAvailableTrainings |SetFinishedTrainings |StartTraining |StopTraining
