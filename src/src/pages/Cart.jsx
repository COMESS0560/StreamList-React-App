import { Link } from 'react-router-dom';
import { formatPrice, isSubscription, useCart } from '../cart/CartContext.jsx';

export default function Cart() {
  const { items, cartCount, total, notice, setNotice, setQuantity, removeItem, clearCart } = useCart();
  return (
    <section className="shop-page">
      <div className="shop-intro">
        <span className="eyebrow">STREAMLIST • SHOPPING CART</span>
        <h1>Your <span className="gradient-text">cart.</span></h1>
        <p>Review your products and update quantities. All changes save locally in this browser.</p>
      </div>
      {notice && <div className="shop-alert" role="status">{notice}<button type="button" aria-label="Dismiss message" onClick={() => setNotice('')}>×</button></div>}
      {items.length === 0 ? (
        <div className="shop-empty"><div aria-hidden="true">🛒</div><h2>Your cart is empty</h2><p>Browse available subscriptions and EZ Tech accessories to get started.</p><Link className="shop-cart-link" to="/shop">Explore products →</Link></div>
      ) : (
        <div className="shop-cart-layout">
          <div className="shop-cart-items">
            {items.map((product) => (
              <article className="shop-cart-row" key={product.id}>
                <div className="shop-cart-row-main"><span aria-hidden="true">{isSubscription(product) ? '✦' : '✳'}</span><div><h3>{product.service}</h3><p>{product.serviceInfo}</p><button className="shop-remove" type="button" onClick={() => removeItem(product)}>Remove</button></div></div>
                <div className="shop-cart-row-side">
                  {isSubscription(product) ? <small>Quantity: 1 (subscription limit)</small> : (
                    <div className="shop-stepper">
                      <button type="button" onClick={() => setQuantity(product, product.quantity - 1)} aria-label={`Decrease ${product.service} quantity`}>−</button>
                      <span>{product.quantity}</span>
                      <button type="button" disabled={product.quantity >= 99} onClick={() => setQuantity(product, product.quantity + 1)} aria-label={`Increase ${product.service} quantity`}>+</button>
                    </div>
                  )}
                  <strong>{formatPrice(product.price * product.quantity)}</strong>
                </div>
              </article>
            ))}
          </div>
          <aside className="shop-order-summary">
            <h2>Order summary</h2>
            <div><span>Total items</span><strong>{cartCount}</strong></div>
            <div className="shop-grand-total"><span>Estimated total</span><strong>{formatPrice(total)}</strong></div>
            <p>Classroom demo only. No real orders or payments are collected.</p>
            <Link className="shop-cart-link" to="/shop">Continue shopping →</Link>
            <button type="button" className="shop-clear" onClick={clearCart}>Clear cart</button>
          </aside>
        </div>
      )}
    </section>
  );
}
