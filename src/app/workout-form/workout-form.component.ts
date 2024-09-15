import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, FormsModule, ReactiveFormsModule],
  templateUrl: './workout-form.component.html',
  styleUrl: './workout-form.component.css',

})


export class WorkoutFormComponent {
  toppingList: string[] = ['Cycling', 'Running', 'Yoga', 'Swimming', 'Exercise', 'Meditation'];

    userName: string = '';
    workoutType: string = '';
    
    duration: number | null = null;
  snackBar: any;
constructor(private appservice:AppServiceService,private _snackBar:MatSnackBar){}
 
  addworkout() {
    this._snackBar.open("Workout Successfully added!",'close',{duration:3000,});
    if(this.userName && this.duration && this.workoutType!==null){
    this.appservice.addWorkout({
    duration:this.duration,
    workoutType:this.workoutType,
    userName:this.userName,
    });
    this.userName='';
    this.duration=null;
    this.workoutType='';
    }else{
      alert("please fill in all the details")
    }
 
  }
}

