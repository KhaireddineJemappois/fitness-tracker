import { NgModule } from '@angular/core';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';
import { TrainingComponent } from './main/training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training.routing.module';
import { StoreModule} from '@ngrx/store';
import { trainingReducer } from './training.reducer';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    StopTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
  ],
  imports: [ReactiveFormsModule,TrainingRoutingModule, SharedModule,

    AngularFirestoreModule,

  StoreModule.forFeature('training',trainingReducer)
  ],
  exports: [],
  entryComponents: [StopTrainingComponent],
})
export class TrainingModule {}
