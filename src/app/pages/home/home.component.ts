// import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
// import { UserService } from '../../user.service';
// import { CardComponent } from '../../components/card/card.component';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { CommonModule } from '@angular/common';
// import { Store, select } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { selectSearchId } from '../../state/selectors/user.selectors';
// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CardComponent, MatPaginatorModule, CommonModule],
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
//   providers: [UserService]
// })
// export class HomeComponent implements OnChanges {
//   // @Input() searchId: number = 0;
//   searchId$: Observable<number>;

//   users: any[] = [];
//   totalItems: number = 0;
//   pageSize: number = 6;
//   errorMessage: string = '';
//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   constructor(private userService: UserService, private store: Store) {
//     this.searchId$ = this.store.pipe(select(selectSearchId));

//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['searchId'] && this.searchId > 0) {
//       this.fetchUserById(this.searchId);
//     } else {
//       this.fetchUsers(1);
//     }
//   }

//   fetchUsers(page: number): void {
//     this.errorMessage = ''; // Clear error message when fetching users
//     this.userService.getUsers(page).subscribe((response: any) => {
//       this.users = response.data;
//       this.totalItems = response.total;
//     });
//   }

//   fetchUserById(id: number): void {
//     this.userService.getUser(id).subscribe((response: any) => {
//       console.log("Fetched user data:", response.data);
//       if (response.data) {
//         this.users = [response.data];
//         this.totalItems = 1;
//         this.errorMessage = '';
//       } else {
//         this.users = [];
//         this.totalItems = 0;
//         this.errorMessage = 'User not found';
//       }
//     }, error => {
//       this.users = [];
//       this.totalItems = 0;
//       this.errorMessage = 'User not found'
//     });
//   }

//   onPageChange(event: any): void {
//     this.fetchUsers(event.pageIndex + 1);
//   }
// }
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import { CardComponent } from '../../components/card/card.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSearchId } from '../../state/selectors/user.selectors';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, MatPaginatorModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService],
})
export class HomeComponent implements OnInit {
  searchId$: Observable<number | null>;
  searchId: number = 0;
  isLoading = true;
  users: any[] = [];
  totalItems: number = 0;
  pageSize: number = 6;
  errorMessage: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private store: Store) {
    this.searchId$ = this.store.pipe(select(selectSearchId));
  }

  ngOnInit(): void {
    this.searchId$
      .pipe(
        filter((id): id is number => id !== null), // Filter out null values
        map((id) => id) // Map id to ensure it's a number
      )
      .subscribe((id) => {
        this.searchId = id;
        if (this.searchId > 0) {
          this.fetchUserById(this.searchId);
        } else {
          this.fetchUsers(1);
        }
      });
  }

   // Fetches a list of users for the specified page
   fetchUsers(page: number): void {
    this.errorMessage = ''; // Clear any previous error messages
    this.userService.getUsers(page).subscribe((response: any) => {
      this.users = response.data; // Update users with the fetched data
      this.isLoading = false; // Set loading to false after data is fetched
      this.totalItems = response.total; // Update total items from the response
    });
  }

  // Fetches a user by their ID
  fetchUserById(id: number): void {
    this.isLoading = true; // Set loading to true while fetching data
    this.userService.getUser(id).subscribe(
      (response: any) => {
        console.log('Fetched user data:', response.data);
        if (response.data) {
          this.users = [response.data]; // Store the fetched user in the users array
          this.totalItems = 1; // Set total items to 1 for a single user
          this.errorMessage = ''; // Clear any error messages
        } else {
          // Handle case where user is not found
          this.users = [];
          this.totalItems = 0;
          this.errorMessage = 'User not found';
        }
        this.isLoading = false; // Set loading to false after fetching
      },
      (error) => {
        // Handle error case
        this.users = [];
        this.totalItems = 0;
        this.errorMessage = 'User not found';
        this.isLoading = false; // Set loading to false after error
      }
    );
  }

  // Handles page changes from the paginator
  onPageChange(event: any): void {
    this.fetchUsers(event.pageIndex + 1); // Fetch users for the new page
  }
}
