import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
import {
  GoogleLogin,
  GoogleLogout,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { PagesRoutes } from '../../../enums';
import {
  setUser,
  setOfflineUser,
  setError,
  logoutUser,
  AuthSliceInterface,
} from '../../../store/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppRedux';
import { IcomoonIcon, Button, ButtonProps } from '../../atoms';

interface GoogleButtonProps {
  className?: string;
}

export const GoogleButton = ({ className }: GoogleButtonProps): JSX.Element => {
  const navigate = useNavigate();
  const clientId: string = process.env.REACT_APP_GOOGLE_SIGN_IN_CLIENT_ID ?? '';
  const isLoggedIn: boolean = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  const onSuccess = useCallback(
    (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if ('profileObj' in response) {
        const payLoad: AuthSliceInterface = {
          isLoggedIn: true,
          user: { ...response.profileObj },
        };
        dispatch(setUser(payLoad));
      } else if ('code' in response) {
        dispatch(setOfflineUser());
      }
      navigate(PagesRoutes.bikes);
    },
    [dispatch, navigate]
  );

  const onFailure = useCallback(
    (err: any) => {
      dispatch(setError(err));
      navigate(PagesRoutes.home);
    },
    [dispatch, navigate]
  );

  const logOut = useCallback(() => {
    dispatch(logoutUser());
    navigate(PagesRoutes.home);
  }, [dispatch, navigate]);

  const renderGoogleButton = useCallback((props: ButtonProps): JSX.Element => {
    const { children, ...tempProps }: ButtonProps = { ...props };
    return (
      <Button
        {...tempProps}
        className={`googleButton text-white bg-secondary hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primaryWhite font-latoBlack`}
      >
        <IcomoonIcon icon='google-icon' />
        <span className='pl-2 block'>{children}</span>
      </Button>
    );
  }, []);

  useEffect(() => {
    const initClient = (): void => {
      gapi.client.init({
        clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  }, [clientId]);

  return (
    <div className={`googleButton ${className ?? ''}`}>
      {isLoggedIn ? (
        <GoogleLogout
          clientId={clientId}
          buttonText='Log out'
          onLogoutSuccess={logOut}
          render={(props: ButtonProps) =>
            renderGoogleButton({ ...props, children: 'Cerrar cuenta' })
          }
        />
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText='Sign in with Google'
          onSuccess={onSuccess}
          onFailure={onFailure}
          render={(props: ButtonProps) =>
            renderGoogleButton({ ...props, children: 'Ingresar' })
          }
        />
      )}
    </div>
  );
};
GoogleButton.displayName = 'GoogleButton';

export default GoogleButton;
