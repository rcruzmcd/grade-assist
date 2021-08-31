export const menu = [
  {
    icon: 'home',
    route: '/',
    label: 'Home',
    privilege: ['*'],
  },
  {
    icon: 'admin_panel_settings',
    route: '/admin',
    label: 'Admin',
    privilege: ['admin'],
  },
  {
    icon: 'class',
    route: '/classes',
    label: 'Classes',
    privilege: ['*'],
  },
  {
    icon: 'school',
    route: '/students',
    label: 'Students',
    privilege: ['*'],
  },
  {
    icon: 'groups',
    route: '/teachers',
    label: 'Teachers',
    privilege: ['admin', 'teacher'],
  },
  {
    icon: 'assignment_turned_in',
    route: '/assignments',
    label: 'Assignments',
    privilege: ['admin'],
  },
];
