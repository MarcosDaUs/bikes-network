import { Link } from 'react-router-dom';
import { PagesRoutes } from '../../../enums';
import { RootState } from '../../../store';
import { useAppSelector } from '../../../hooks/useAppRedux';
import { GoogleButton } from '../../molecules';

export const StickyNavbar = (): JSX.Element => {
  const isLoggedIn: boolean = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
  return (
    <nav className='bg-primaryBlack text-primaryWhite px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-secondary'>
      <div className='container flex flex-wrap justify-between items-center mx-auto'>
        <a href={PagesRoutes.home} className='flex items-center'>
          <span className='self-center text-xl font-latoBold whitespace-nowrap'>
            BikesNet
          </span>
        </a>
        <div className='flex md:order-2'>
          {isLoggedIn && <GoogleButton className={`w-full`} />}
          <button
            data-collapse-toggle='navbar-sticky'
            type='button'
            className='ml-3 inline-flex items-center p-2 text-sm text-primaryWhite rounded-lg md:hidden hover:bg-secondary focus:outline-none'
            aria-controls='navbar-sticky'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
        </div>
        <div
          className='hidden justify-between items-center w-full md:flex md:w-auto md:order-1'
          id='navbar-sticky'
        >
          <ul className='flex flex-col p-4 mt-4 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:border-0'>
            <li>
              <Link
                to={PagesRoutes.home}
                className='block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0'
              >
                Home
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link
                  to={PagesRoutes.bikes}
                  className='block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0'
                >
                  Bicicletas
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
StickyNavbar.displayName = 'StickyNavbar';

export default StickyNavbar;
