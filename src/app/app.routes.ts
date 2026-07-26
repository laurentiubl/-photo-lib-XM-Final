import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/photos/pages/photo-list/photo-list')
        .then((m) => m.PhotoList),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/pages/favorites-list/favorites-list')
        .then((m) => m.FavoritesList),
  },
  {
    path: 'photos/:id',
    loadComponent: () =>
      import('./features/photos/pages/photo-details/photo-details')
        .then((m) => m.PhotoDetails),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
