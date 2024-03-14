import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mainlogin',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatInputModule, MatDividerModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './mainlogin.component.html',
  styleUrls: ['./mainlogin.component.css']
})
export class MainloginComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
}
