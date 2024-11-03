import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnChanges {
  @Input() users: any[] = [];

  // This lifecycle hook is called whenever the input properties change
  ngOnChanges(changes: SimpleChanges): void {
    // Check if the 'users' input property has changed
    if (changes['users']) {
      // Log the new value of the 'users' input property to the console
      console.log('Users input changed:', changes['users'].currentValue);
    }
  }
}
