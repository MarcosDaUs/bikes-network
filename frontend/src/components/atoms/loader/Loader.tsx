import styles from './Loader.module.scss';

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps): JSX.Element => {
  return (
    <span
      className={`loader w-10 h-10 border-4 border-solid border-secondary border-b-transparent rounded-[50%] inline-block box-border ${
        styles.loader
      } ${className ?? ''}`}
    />
  );
};
Loader.displayName = 'Loader';

export default Loader;
