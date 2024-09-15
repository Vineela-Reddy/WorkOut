import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-workout-progress',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './workout-progress.component.html',
  styleUrl: './workout-progress.component.css'
})
export class WorkoutProgressComponent {

 chartData: any[]=[];  // Data from parent component
  
constructor(private appservice:AppServiceService){}

ngOnInit(): void {
  this.chartData=this.appservice.getChartData();
  console.log('Received Chart Data:', this.chartData);
}
}
