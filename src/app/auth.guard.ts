import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check if a login token is present in local storage
  const isLoggedIn = !!localStorage.getItem('loginToken');
  console.log('AuthGuard Check:', { isLoggedIn, returnUrl: state.url });

  if (isLoggedIn) {
    return true; // Allow access if logged in
  } else {
    console.log('Redirecting to login...');
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // Redirect to login if not logged in
    return false; // Block access if not authenticated
  }
};
