interface IcomoonIconProps {
  icon: string;
  className?: string;
}

export const IcomoonIcon = ({
  icon,
  className = 'text-[20px] font-black',
}: IcomoonIconProps): JSX.Element => {
  return (
    <span className={`icomoonIcon ${icon} inline-block ${className ?? ''}`} />
  );
};
IcomoonIcon.displayName = 'IcomoonIcon';

export default IcomoonIcon;
