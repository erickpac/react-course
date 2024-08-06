export function CartItem({ thumbnail, title, price, quantity, addToCart }) {
  return (
    <li>
      <img src="https://placehold.co/300x200" alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}
