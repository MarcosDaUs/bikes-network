import { RootState } from '../../store/index';
import { useAppSelector } from '../../hooks/useAppRedux';
import MainLayout from '../../components/templates/main-layout/MainLayout';
import { Map, GoogleButton } from '../../components/molecules';
import { Login } from '../../components/organisms';
import styles from './HomePage.module.scss';

const HomePage = (): JSX.Element => {
  const isLoggedIn: boolean = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
  const descriptionElement: JSX.Element = (
    <>
      <h1 className='text-5xl font-latoBold'>Bienvenido</h1>
      <p className='text-xl'>
        Ven a divertirte, pasea a tu propio ritmo en bicicleta
      </p>
    </>
  );
  return (
    <MainLayout>
      <section
        className={`homePage w-full flex flex-col lg:flex-row items-center ${styles.homePage}`}
      >
        <div className={`text-primaryBlack lg:hidden pb-5`}>
          {descriptionElement}
        </div>
        {!isLoggedIn && (
          <Login
            formElement={
              <GoogleButton
                className={`w-full ${styles.homePage__googleButton}`}
              />
            }
            className='max-h-[300px]'
          />
        )}
        <div
          className={`flex-grow flex ${
            isLoggedIn ? 'flex-row' : 'flex-col pl-14'
          }`}
        >
          <div
            className={`text-primaryBlack hidden lg:block ${
              isLoggedIn ? 'flex-grow' : 'pb-5'
            }`}
          >
            {descriptionElement}
          </div>
          <Map
            style={{
              minHeight: '300px',
              maxHeight: '600px',
              width: isLoggedIn ? '60%' : '100%',
            }}
          />
        </div>
      </section>
    </MainLayout>
  );
};
HomePage.displayName = 'HomePage';

export default HomePage;
