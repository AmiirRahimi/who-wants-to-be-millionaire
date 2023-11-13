import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthService } from 'src/app/shared/services/other-services/authorization.service';

export const AuthGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token') as string
    const isValidate = await authService.validateToken(token)
    if (isValidate.status === 200) {
      return true
    }
    router.navigate(['/signIn'])
    return false
};
