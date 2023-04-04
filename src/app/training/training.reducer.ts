import { Exercise } from './exercise.model';
import {
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
  TrainingActions,
} from './training.actions';
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise | null;
  isTrainingOngoing: boolean;
}
export interface State extends fromRoot.State {
  training: TrainingState;
}
const inialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null,
  isTrainingOngoing: false,
};
export function trainingReducer(state = inialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return { ...state, availableExercises: action.payload };
    case SET_FINISHED_TRAININGS:
      return { ...state, finishedExercises: action.payload };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: state.availableExercises.find(
          (ex) => ex.id == action.payload
        ),
      };
    case STOP_TRAINING:
      return { ...state, activeTraining: null };
    default:
      return state;
  }
}

export const getTrainingState =
  createFeatureSelector<TrainingState>('training');
export const getAvailableTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);
export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercises
);
export const getActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
);
export const getIsTrainingOngoing = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining != null
);
