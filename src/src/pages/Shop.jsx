import { Link } from 'react-router-dom';
import { isSubscription, formatPrice, useCart } from '../cart/CartContext.jsx';

function ProductCard({ product }) {
  const { quantities, addItem } = useCart();
  const subscription = isSubscription(product);
  const inCart = Boolean(quantities[product.id]);
  return (
    <article className="shop-product">
      <div className="shop-product-icon" aria-hidden="true">{subscription ? '✦' : '✳'}</div>
      <span className="shop-tag">{subscription ? 'SUBSCRIPTION' : 'ACCESSORY'}</span>
      <h3>{product.service}</h3>
      <p>{product.serviceInfo}</p>
      <div className="shop-product-bottom">
        <strong>{formatPrice(product.price)}</strong>
        <button type="button" onClick={() => addItem(product)}>{subscription && inCart ? 'Added ✓' : '+ Add to cart'}</button>
      </div>
    </article>
  );
}

export default function Shop() {
  const { products, notice, setNotice, cartCount } = useCart();
  return (
    <section className="shop-page">
      <div className="shop-intro">
        <span className="eyebrow">EZ TECH • WEEK 3</span>
        <h1>Subscriptions & <span className="gradient-text">gear.</span></h1>
        <p>Choose a plan or some EZ Tech accessories. Your cart saves automatically in this browser.</p>
        <Link className="shop-cart-link" to="/cart">View cart ({cartCount}) →</Link>
      </div>
      {notice && <div className="shop-alert" role="status">{notice}<button type="button" aria-label="Dismiss message" onClick={() => setNotice('')}>×</button></div>}
      <div className="shop-section-title"><h2>Subscriptions</h2><p>Only one of each subscription can be added to the cart.</p></div>
      <div className="shop-grid">{products.filter(isSubscription).map((product) => <ProductCard key={product.id} product={product} />)}</div>
      <div className="shop-section-title"><h2>EZ Tech Accessories</h2><p>Accessories can be added more than once. Change quantities in your cart.</p></div>
      <div className="shop-grid">{products.filter((p) => !isSubscription(p)).map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </section>
  );
}
