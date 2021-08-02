import { Component } from '@angular/core';

@Component({
  selector: 'grade-assist-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Grade Assist';

  menu = [
    {
      icon: 'home',
      route: '/',
      label: 'Home',
    },
    {
      icon: 'admin_panel_settings',
      route: '/admin',
      label: 'Admin',
    },
    {
      icon: 'class',
      route: '/classess',
      label: 'Classes',
    },
    {
      icon: 'school',
      route: '/students',
      label: 'Students',
    },
    {
      icon: 'groups',
      route: '/teachers',
      label: 'Teachers',
    },
  ];
}
