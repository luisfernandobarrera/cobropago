export const token = localStorage.getItem('token');
export const origin = window.location.origin;
export const apiHome = origin + '/api/v1';
export const apiMe = apiHome + '/users/me';

