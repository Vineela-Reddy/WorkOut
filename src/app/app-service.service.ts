import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
  export interface Workout {
    userName: string;
    workoutType: string;
    duration: number;
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class AppServiceService {
    workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];
    private workouts: Workout[] = [];
  
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
      // Check if running in the browser
      if (isPlatformBrowser(this.platformId)) {
        this.loadWorkouts();
      }
    }
  
    private loadWorkouts(): void {
      const savedWorkouts = localStorage.getItem('workouts');
      this.workouts = savedWorkouts ? JSON.parse(savedWorkouts) : [];
      console.log(savedWorkouts)
    }
   
  
    addWorkout(workout: Workout): void {
      this.workouts.push(workout);
      this.saveWorkouts();
    }
  
    getWorkouts(): Workout[] {
      return this.workouts;
    }private chartData: any[] = [];

    setChartData(data: any[]): void {
      this.chartData = data;
    }
  
    getChartData(): any[] {
      return this.chartData;
    }
  
    getWorkoutMinutes(): number[] {
      return this.workoutTypes.map(type => {
        return this.workouts
          .filter(workout => workout.workoutType.includes(type))
          .reduce((sum, workout) => sum + workout.duration,0);
          
      });
      
    }

    private saveWorkouts(): void {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('workouts', JSON.stringify(this.workouts));
      }
    }
  }
  
