import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grade-assist-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    console.log('here');
  }
}
