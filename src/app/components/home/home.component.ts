import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent {
  constructor(private router: Router) { }

  navigateToFlights(): void {
    this.router.navigate(['/flights']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
