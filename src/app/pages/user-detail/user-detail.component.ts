import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { delay, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RouterModule, MatIconModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  userId!: number;
  user: any; 
  userDetail: any;
  errorMessage: string = '';
  isLoading = true; // Flag to indicate loading state

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    // Subscribe to route parameters to get the user ID
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!; // Convert the user ID to a number
      this.fetchUser(); // Fetch the user data based on the ID
    });
  }

  // Fetch user data from the service
  fetchUser(): void {
    this.isLoading = true; // Set loading to true while fetching data
    this.userService.getUser(this.userId).pipe(
      delay(2000), // Introduce a delay of 2000 milliseconds (2 seconds) for demonstration purposes
      catchError(error => {
        // Handle error case where user is not found
        this.errorMessage = 'User not found'; 
        this.isLoading = false; 
        console.log(error); 
        return of(null); // Return an observable with a null value
      })
    ).subscribe(
      (response: any) => {
        if (response) {
          this.user = response.data; // Assign the fetched user data
          this.userDetail = response.support; // Assign any additional user detail
          this.errorMessage = ''; 
        }
        this.isLoading = false; // Set loading to false after fetching
        console.log(this.user, this.userDetail); 
      }
    );
  }
}
