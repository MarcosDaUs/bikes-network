import { StickyNavbar } from '../../organisms';
interface MainLayoutProps {
  children?: JSX.Element;
}

const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
  return (
    <div className='mainLayout flex flex-col w-full pt-20'>
      <StickyNavbar />
      <main className='w-full flex-grow flex px-14 pt-5'>{children}</main>
    </div>
  );
};
MainLayout.displayName = 'MainLayout';

export default MainLayout;
