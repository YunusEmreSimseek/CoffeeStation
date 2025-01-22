import { CanActivateFn } from '@angular/router';
import { StorageService } from '../Services/Storage/storage.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  let _storageService = inject(StorageService);
    const role = _storageService.getUserRole();
    if (role === 'User') {
      return true;
    } else {
      console.log('User is not user');
      return false;
    }
};
