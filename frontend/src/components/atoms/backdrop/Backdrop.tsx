interface BackdropProps {
  show: boolean;
  zIndex?: number;
  className?: string;
  onClick?: () => void;
}

export const Backdrop = ({
  show,
  zIndex = 10,
  className,
  onClick,
}: BackdropProps): JSX.Element | null =>
  show ? (
    <div
      className={`backdrop overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 md:inset-0 h-modal md:h-full bg-primaryBlack opacity-50 ${
        className ?? ''
      }`}
      onClick={onClick}
      style={{ zIndex }}
    />
  ) : null;
Backdrop.displayName = 'Backdrop';

export default Backdrop;
