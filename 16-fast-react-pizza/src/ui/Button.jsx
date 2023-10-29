import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type }) {
  const base =
    'bg-yellow-400 inline-block text-sm uppercase font-semibold text-stone-800 tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ';
  const styles = {
    small: base + ' px-4 py-2 sm:px-5 sm:py-2.5 text-xs',
    primary: base + ' px-4 py-3 sm:px-6 sm:py-4',
    secondary:
      'border-2 border-stone-300 px-4 py-2 sm:px-6 sm:py-3.5 uppercase font-semibold text-stone-400 tracking-wide rounded-full hover:text-stone-800 hover:bg-stone-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-200 focus:text-stone-800 focus:bg-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed ',
  };
  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
