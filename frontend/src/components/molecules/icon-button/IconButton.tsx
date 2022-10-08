import { IcomoonIcon, Button } from '../../atoms';

interface IconButtonProps {
  icon: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const IconButton = ({
  icon,
  disabled,
  className,
  onClick,
}: IconButtonProps): JSX.Element => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      noHover={true}
      className={`iconButton w-10 h-10 p-0 text-primaryWhite bg-primaryBlack hover:bg-secondary hover:text-primaryBlack ${
        className ?? ''
      }`}
    >
      <IcomoonIcon icon={icon} className='text-base' />
    </Button>
  );
};
IconButton.displayName = 'IconButton';

export default IconButton;
