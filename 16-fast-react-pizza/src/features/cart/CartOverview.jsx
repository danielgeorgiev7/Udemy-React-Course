import { Link } from 'react-router-dom';
import { getTotalCartQuantity, getTotalCartPrice } from './cartSlice';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalPrice = useSelector(getTotalCartPrice);
  return (
    <div
      className="bg-stone-800 text-stone-200 uppercase p-4 
    sm:px-6 text-sm md:text-base flex items-center justify-between"
    >
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <button>
          {totalCartQuantity} {totalCartQuantity === 1 ? 'pizza' : 'pizzas'}
        </button>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
