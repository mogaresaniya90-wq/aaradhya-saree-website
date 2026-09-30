import { useState } from "react";
import { motion } from "framer-motion";
import "./index.css";

import sareeVideo1 from "./assets/saree-woman-1.mp4";
import sareeVideo2 from "./assets/saree-woman-2.mp4";

import saree1 from "./assets/saree1.jpg";
import saree2 from "./assets/saree2.jpg";
import saree3 from "./assets/saree3.jpg";

function App() {
  const videos = [sareeVideo1, sareeVideo2];

  const sarees = [
    {
      id: "01",
      name: "Silk Heritage",
      price: "₹4,999",
      priceValue: 4999,
      image: saree1,
      description:
        "Traditional silk saree with timeless craftsmanship and elegant detailing."
    },
    {
      id: "02",
      name: "Royal Drapes",
      price: "₹6,499",
      priceValue: 6499,
      image: saree2,
      description:
        "Rich green and gold traditional drape inspired by Indian royal heritage."
    },
    {
      id: "03",
      name: "Contemporary",
      price: "₹5,799",
      priceValue: 5799,
      image: saree3,
      description:
        "Elegant floral silk with a modern expression of Indian fashion."
    }
  ];

  const [currentVideo, setCurrentVideo] = useState(0);
  const [opened, setOpened] = useState(false);
  const [selectedSaree, setSelectedSaree] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const handleVideoReady = () => {
    setOpened(true);
  };

  const scrollToCollection = () => {
    document.getElementById("collection")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const addToCart = (saree) => {
    setCartItems((prev) => {
      const alreadyAdded = prev.some(
        (item) => item.id === saree.id
      );

      if (alreadyAdded) {
        return prev;
      }

      return [...prev, saree];
    });

    setSelectedSaree(null);
    setCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.priceValue,
    0
  );

  const openCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const placeOrder = (e) => {
    e.preventDefault();
    setCheckoutOpen(false);
    setOrderPlaced(true);
  };

  const continueShopping = () => {
    setOrderPlaced(false);
    scrollToCollection();
  };

  return (
    <div className={`page ${opened ? "opened" : ""}`}>

      <div className="hero-video">
        <video
          key={videos[currentVideo]}
          src={videos[currentVideo]}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          onCanPlay={handleVideoReady}
        />
      </div>

      <div className="video-overlay"></div>

      <div className="opening-light"></div>

      <div className="curtain curtain-left"></div>
      <div className="curtain curtain-right"></div>

      <nav className="navbar">

        <div className="logo">
          AARADHYA
        </div>

        <div className="nav-links">

          <span className="active">
            HOME
          </span>

          <span onClick={scrollToCollection}>
            COLLECTION
          </span>

          <span>
            ABOUT
          </span>

          <span>
            CONTACT
          </span>

        </div>

        <button
          type="button"
          className="cart"
          onClick={() => setCartOpen(true)}
        >
          CART ({cartItems.length})
        </button>

      </nav>

      <main className="hero-content">

        <motion.div
          initial={{
            opacity: 0,
            x: -60
          }}
          animate={{
            opacity: opened ? 1 : 0,
            x: opened ? 0 : -60
          }}
          transition={{
            delay: 2.2,
            duration: 1.2
          }}
        >

          <p className="eyebrow">
            THE ART OF INDIAN DRAPING
          </p>

          <h1>
            Timeless
            <br />
            <span>Elegance</span>
          </h1>

          <p className="description">
            Discover handcrafted sarees where traditional
            artistry meets contemporary elegance.
          </p>

          <button
            type="button"
            className="explore"
            onClick={scrollToCollection}
          >
            EXPLORE COLLECTION
            <span>→</span>
          </button>

        </motion.div>

      </main>

      <div className="scroll">

        <span>SCROLL</span>
        <span>TO EXPLORE</span>

        <div className="scroll-line"></div>

        <span>↓</span>

      </div>

      <section
        id="collection"
        className="collection-section"
      >

        <p className="collection-eyebrow">
          AARADHYA COLLECTION
        </p>

        <h2>
          Heritage
          <br />
          <span>Reimagined</span>
        </h2>

        <p className="collection-text">
          Discover our curated collection of handcrafted
          Indian sarees, created for timeless elegance.
        </p>

        <div className="collection-grid">

          {sarees.map((saree) => (

            <div
              className="collection-card"
              key={saree.id}
            >

              <div className="card-image">

                <img
                  src={saree.image}
                  alt={saree.name}
                />

              </div>

              <div className="card-content">

                <div className="card-number">
                  {saree.id}
                </div>

                <h3>
                  {saree.name}
                </h3>

                <p>
                  {saree.description}
                </p>

                <div className="product-bottom">

                  <span className="price">
                    {saree.price}
                  </span>

                  <button
                    type="button"
                    className="view-saree"
                    onClick={() => setSelectedSaree(saree)}
                  >
                    VIEW SAREE
                    <span>→</span>
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {selectedSaree && (

        <div className="saree-detail">

          <button
            type="button"
            className="close-detail"
            onClick={() => setSelectedSaree(null)}
          >
            ×
          </button>

          <div className="detail-image">

            <img
              src={selectedSaree.image}
              alt={selectedSaree.name}
            />

          </div>

          <div className="detail-info">

            <p className="detail-label">
              AARADHYA COLLECTION
            </p>

            <h2>
              {selectedSaree.name}
            </h2>

            <p className="detail-description">
              {selectedSaree.description}
            </p>

            <div className="detail-price">
              {selectedSaree.price}
            </div>

            <button
              type="button"
              className="add-cart"
              onClick={() => addToCart(selectedSaree)}
            >
              ADD TO CART
              <span>→</span>
            </button>

          </div>

        </div>

      )}

      {cartOpen && (

        <div
          className="cart-overlay"
          onClick={() => setCartOpen(false)}
        >

          <div
            className="cart-panel"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="cart-close"
              onClick={() => setCartOpen(false)}
            >
              ×
            </button>

            <p className="cart-label">
              AARADHYA
            </p>

            <h2>
              Your Cart
            </h2>

            {cartItems.length === 0 ? (

              <div className="empty-cart">

                <p>
                  Your cart is empty.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setCartOpen(false);
                    scrollToCollection();
                  }}
                >
                  EXPLORE COLLECTION →
                </button>

              </div>

            ) : (

              <>

                <div className="cart-items">

                  {cartItems.map((item) => (

                    <div
                      className="cart-item"
                      key={item.id}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="cart-item-info">

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          {item.price}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                        >
                          REMOVE
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="cart-total">

                  <span>
                    TOTAL
                  </span>

                  <strong>
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </strong>

                </div>

                <button
                  type="button"
                  className="checkout"
                  onClick={openCheckout}
                >
                  PROCEED TO CHECKOUT
                  <span>→</span>
                </button>

              </>

            )}

          </div>

        </div>

      )}

      {checkoutOpen && (

        <div className="checkout-page">

          <button
            type="button"
            className="checkout-close"
            onClick={() => setCheckoutOpen(false)}
          >
            ×
          </button>

          <div className="checkout-box">

            <div className="checkout-content">

              <p className="checkout-label">
                AARADHYA
              </p>

              <h2>
                Complete Your Order
              </h2>

              <form
                className="checkout-form"
                onSubmit={placeOrder}
              >

                <input
                  type="text"
                  placeholder="Full Name"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                />

                <input
                  type="text"
                  placeholder="Delivery Address"
                  required
                />

                <input
                  type="text"
                  placeholder="City"
                  required
                />

                <input
                  type="text"
                  placeholder="Pincode"
                  required
                />

                <select
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Payment Method
                  </option>

                  <option value="cod">
                    Cash on Delivery
                  </option>

                  <option value="upi">
                    UPI
                  </option>

                  <option value="card">
                    Credit / Debit Card
                  </option>

                </select>

                <button
                  type="submit"
                  className="place-order"
                >
                  PLACE ORDER
                  <span>→</span>
                </button>

              </form>

            </div>

            <div className="checkout-summary">

              <p>
                ORDER SUMMARY
              </p>

              {cartItems.map((item) => (

                <div
                  className="summary-item"
                  key={item.id}
                >

                  <span>
                    {item.name}
                  </span>

                  <strong>
                    {item.price}
                  </strong>

                </div>

              ))}

              <div className="summary-total">

                <span>
                  TOTAL
                </span>

                <strong>
                  ₹{totalPrice.toLocaleString("en-IN")}
                </strong>

              </div>

            </div>

          </div>

        </div>

      )}

      {orderPlaced && (

        <div className="order-success">

          <div className="success-box">

            <div className="success-icon">
              ✓
            </div>

            <p className="checkout-label">
              AARADHYA
            </p>

            <h2>
              Order Confirmed
            </h2>

            <p>
              Thank you for choosing AARADHYA.
              Your saree order has been successfully placed.
            </p>

            <div className="order-id">
              ORDER ID: AAR{Date.now().toString().slice(-6)}
            </div>

            <button
              type="button"
              className="continue-shopping"
              onClick={continueShopping}
            >
              CONTINUE SHOPPING
              <span>→</span>
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;