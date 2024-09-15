import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {  MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { AppServiceService, Workout } from '../app-service.service';
import{MatHeaderRowDef,  MatTableDataSource, MatTableModule} from '@angular/material/table'
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { WorkoutProgressComponent } from "../workout-progress/workout-progress.component";
export interface GroupedWorkout{
  userName:string;
  workoutCount:number;
  totalMinutes:number;
  workoutTypes:string;
}
@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [MatPaginator, MatFormFieldModule, MatLabel, ReactiveFormsModule, MatTableModule, MatInput, MatHeaderRowDef, WorkoutProgressComponent],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})

export class WorkoutListComponent implements OnInit,AfterViewInit{
displayedColumns:string[]=['userName','workoutCount','totalMinutes','workoutTypes'];
workouts:Workout[]=[];
filteredWorkouts=new MatTableDataSource<GroupedWorkout>();
 
@ViewChild(MatPaginator)paginator!:MatPaginator;

usernameFilter = new FormControl('');
workoutTypeFilter = new FormControl('');
constructor(private appservice:AppServiceService){}
ngOnInit():void{
  this.usernameFilter.valueChanges.subscribe(()=>this.applyFilter());
  this.workoutTypeFilter.valueChanges.subscribe(()=>this.applyFilter());
}
ngAfterViewInit():void{
  this.filteredWorkouts.paginator=this.paginator;
  this.applyFilter();
}
applyFilter(): void {
  const usernameValue = this.usernameFilter.value?.trim().toLowerCase() || '';
  const workoutTypeValue = this.workoutTypeFilter.value?.trim().toLowerCase() || '';

  const workouts: Workout[] = this.appservice.getWorkouts();

  const groupedWorkouts = workouts.reduce((acc, workout) => {
    const userName = workout.userName;
    const workoutType = Array.isArray(workout.workoutType) ? workout.workoutType.join(', ') : workout.workoutType;

    if (typeof userName === 'string' && typeof workoutType === 'string') {
      const lowerCaseUsername = userName.toLowerCase();
      const lowerCaseWorkoutType = workoutType.toLowerCase();

      if (
        lowerCaseUsername.includes(usernameValue) &&
        lowerCaseWorkoutType.includes(workoutTypeValue)
      ) {
        if (!acc[lowerCaseUsername]) {
          acc[lowerCaseUsername] = {
            userName: workout.userName,
            workoutCount: 0,
            totalMinutes: 0,
            workoutTypes: new Set<string>(),
          };
        }
        acc[lowerCaseUsername].workoutCount += 1;
        acc[lowerCaseUsername].totalMinutes += Number(workout.duration);
        acc[lowerCaseUsername].workoutTypes.add(workoutType);
      }
    }

    return acc;
  
  }, {} as Record<string, { userName: string; workoutCount: number; totalMinutes: number; workoutTypes: Set<string> }>);


  const finalData = Object.values(groupedWorkouts).map(group => ({
    userName: group.userName,
    workoutCount: group.workoutCount,
    totalMinutes: group.totalMinutes,
    
    workoutTypes: Array.from(group.workoutTypes).join(', ')
  }));
  
  console.log('Final Data:', finalData); 

  this.filteredWorkouts.data = finalData;
  const chartData = finalData.map(group => ({
    name: group.userName,
    value: group.totalMinutes,
  }));
  console.log('emitting chart data',chartData)
  
  this.appservice.setChartData(chartData);


  this.filteredWorkouts.paginator!.length = this.filteredWorkouts.data.length;
}

}
