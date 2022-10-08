import { LocalStorageKeys } from '../enums';
import { GoogleUserProfile } from '../types';

export interface LoginData {
  user: GoogleUserProfile | null;
}

export function setLoginData({ user }: LoginData): void {
  localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(user) ?? '');
}

export function clearLoginData(): void {
  localStorage.removeItem(LocalStorageKeys.USER);
}

export function getLoginData(): LoginData | null {
  const userString: string | null = localStorage.getItem(LocalStorageKeys.USER);
  if (userString != null) {
    let userJson: any = null;
    try {
      userJson = JSON.parse(userString);
      if (
        'googleId' in userJson &&
        'imageUrl' in userJson &&
        'email' in userJson &&
        'name' in userJson &&
        'givenName' in userJson &&
        'familyName' in userJson
      ) {
        return {
          user: userJson as GoogleUserProfile,
        };
      }
      localStorage.removeItem(LocalStorageKeys.USER);
    } catch (err) {
      localStorage.removeItem(LocalStorageKeys.USER);
    }
  }
  return null;
}
