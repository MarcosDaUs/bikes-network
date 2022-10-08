interface LoginProps {
  className?: string;
  formElement: JSX.Element;
}

export const Login = ({ className, formElement }: LoginProps): JSX.Element => {
  return (
    <div
      className={`login w-full bg-primaryBlack text-primaryWhite rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ${
        className ?? ''
      }`}
    >
      <div className='p-8 space-y-4'>
        <h2 className='text-xl font-latoBold leading-tight tracking-tight md:text-2xl'>
          Ingresa a tu cuenta
        </h2>
        <p>¡Renta una bicicleta aquí!</p>
        <div className='space-y-2 md:space-y-4'>{formElement}</div>
        <div className='flex items-center justify-between'>
          <div className='flex items-start'>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                type='checkbox'
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300'
              />
            </div>
            <div className='ml-3 text-sm'>
              <label htmlFor='remember' className='text-gray-500'>
                Recordarme
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Login.displayName = 'Login';

export default Login;
