import { Routes } from '@angular/router';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutProgressComponent } from './workout-progress/workout-progress.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';

export const routes: Routes = [
    { path: 'app-workout-form', component: WorkoutFormComponent },
    { path: 'app-workout-list', component: WorkoutListComponent },
    { path: 'app-workout-progress', component: WorkoutProgressComponent },
    { path: '', redirectTo: '/app-workout-form', pathMatch: 'full' },
];
