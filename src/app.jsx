import React, { useState } from 'react';
import { ShoppingCart, Phone, Star, CheckCircle, Menu, X } from 'lucide-react';

// --- DATA ---
const products = [
  { id: 1, name: "Premium Mango Pulp Pouch", price: 200, size: "500g", img: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=400" },
  { id: 2, name: "Artisanal Pulp - Glass Bottle", price: 180, size: "500ml", img: "https://images.unsplash.com/photo-1621506289937-48a4dfbf00f8?q=80&w=400" },
  { id: 3, name: "Family Reserve - Glass Bottle", price: 280, size: "1 Litre", img: "https://images.unsplash.com/photo-1601493700631-2b1644ad4915?q=80&w=400" },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('home'); // 'home', 'products', 'cart'

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const sendWhatsApp = () => {
    const phone = "919326178009";
    const items = cart.map(i => `${i.name} (₹${i.price})`).join(", ");
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    const msg = `Hello ShivPrabha Foods! I want to order: ${items}. Total: ₹${total}. Please confirm my order.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
  };

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-gray-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 bg-white shadow-sm p-4 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold text-orange-600">SHIVPRABHA FOODS</h1>
        <div className="flex gap-4">
          <button onClick={() => setView('home')} className="text-sm font-medium">Home</button>
          <button onClick={() => setView('products')} className="text-sm font-medium">Shop</button>
          <button onClick={() => setView('cart')} className="relative">
            <ShoppingCart size={20} />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{cart.length}</span>}
          </button>
        </div>
      </nav>

      {/* HOME VIEW */}
      {view === 'home' && (
        <main>
          <section className="py-20 px-6 text-center bg-gradient-to-b from-orange-100 to-orange-50">
            <h2 className="text-4xl font-bold mb-4">Pure Premium Mango Pulp</h2>
            <p className="text-gray-600 mb-8">Handpicked organic mangoes. No chemicals. No preservatives. Pure bliss.</p>
            <button onClick={() => setView('products')} className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">Shop Now</button>
          </section>

          <section className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <CheckCircle className="mx-auto text-orange-500 mb-2" />
              <h3 className="font-bold">100% Organic</h3>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <CheckCircle className="mx-auto text-orange-500 mb-2" />
              <h3 className="font-bold">No Chemicals</h3>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <CheckCircle className="mx-auto text-orange-500 mb-2" />
              <h3 className="font-bold">Pure Taste</h3>
            </div>
          </section>
        </main>
      )}

      {/* PRODUCTS VIEW */}
      {view === 'products' && (
        <div className="p-6 grid grid-cols-1 gap-8">
          <h2 className="text-2xl font-bold text-center">Our Products</h2>
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-md">
              <img src={p.img} className="w-full h-48 object-cover" alt={p.name} />
              <div className="p-6">
                <h3 className="font-bold text-lg">{p.name} ({p.size})</h3>
                <p className="text-xl text-orange-600 font-bold mt-2">₹{p.price}</p>
                <button onClick={() => addToCart(p)} className="w-full mt-4 bg-orange-600 text-white py-3 rounded-xl font-bold">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CART VIEW */}
      {view === 'cart' && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
          {cart.length === 0 ? <p>Cart is empty</p> : (
            <>
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between border-b py-4">
                  <span>{item.name}</span>
                  <span className="font-bold">₹{item.price}</span>
                </div>
              ))}
              <div className="mt-6 text-xl font-bold flex justify-between">
                <span>Total:</span>
                <span>₹{cart.reduce((s, i) => s + i.price, 0)}</span>
              </div>
              <button onClick={sendWhatsApp} className="w-full mt-8 bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                <Phone size={20} /> Order via WhatsApp
              </button>
            </>
          )}
        </div>
      )}

      <footer className="bg-white p-10 mt-20 text-center border-t">
        <p className="font-bold">ShivPrabha Foods</p>
        <p className="text-sm text-gray-500">Contact: +919326178009</p>
      </footer>
    </div>
  );
}

