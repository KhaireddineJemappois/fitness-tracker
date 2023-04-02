import { TrainingService } from './../training.service';
import { Exercise } from './../exercise.model';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription, filter } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit,AfterViewInit,OnDestroy{


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator! :MatPaginator;
  constructor(private trainingService:TrainingService) { }
  ngOnDestroy(): void {
    this.finishedExercisesSub.unsubscribe();
  }
  ngAfterViewInit(): void {

    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }
  displayedColumns=['date','name','duration','calories','state'];
  dataSource = new MatTableDataSource<Exercise>();
  finishedExercisesSub!:Subscription;
  ngOnInit(): void {
    this.finishedExercisesSub=this.trainingService.finishedExercisesChanged.subscribe((exercises)=>{
     ;
      this.dataSource.data=exercises as Exercise[]
    }
    );
    this.trainingService.fetchFinishedExercises();
  }
  doFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
    //Filtering can be overridden
  }

}
