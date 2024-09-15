import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavbarComponent } from "./app-navbar/app-navbar.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppNavbarComponent,NgxChartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppComponent {
  title = 'WorkOut';
}
