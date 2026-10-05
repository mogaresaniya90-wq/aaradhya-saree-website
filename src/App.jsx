import "./index.css";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const API_URL = "http://localhost:5000/api";
import heroVideo1 from "./assets/saree-woman-1.mp4";
import heroVideo2 from "./assets/saree-woman-2.mp4";

const sareeImages = import.meta.glob(
  "./assets/sarees/*/*.jpg",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const getSareeImages = (folder) => {
  return [1, 2, 3, 4, 5, 6].map(
    (number) =>
      sareeImages[
        `./assets/sarees/${folder}/${number}.jpg`
      ]
  );
};

const sarees = [
  {
    id: 1,
    name: "Kanjeevaram Silk Saree",
    category: "Kanjeevaram",
    priceValue: 8999,
    price: "₹8,999",
    stock: 12,
    description:
      "Traditional Kanjeevaram silk saree with rich zari work and elegant South Indian craftsmanship.",
    images: getSareeImages("kanjeevaram"),
  },
  {
    id: 2,
    name: "Banarasi Silk Saree",
    category: "Banarasi",
    priceValue: 7499,
    price: "₹7,499",
    stock: 10,
    description:
      "Luxurious Banarasi silk saree featuring intricate zari patterns and timeless elegance.",
    images: getSareeImages("banarasi"),
  },
  {
    id: 3,
    name: "Mysore Silk Saree",
    category: "Mysore Silk",
    priceValue: 6499,
    price: "₹6,499",
    stock: 8,
    description:
      "Classic Mysore silk saree with a smooth finish, beautiful shine and elegant zari border.",
    images: getSareeImages("mysore-silk"),
  },
  {
    id: 4,
    name: "Chanderi Saree",
    category: "Chanderi",
    priceValue: 4299,
    price: "₹4,299",
    stock: 15,
    description:
      "Lightweight Chanderi saree with delicate patterns, perfect for graceful everyday elegance.",
    images: getSareeImages("chanderi"),
  },
  {
    id: 5,
    name: "Organza Saree",
    category: "Organza",
    priceValue: 3999,
    price: "₹3,999",
    stock: 14,
    description:
      "Elegant organza saree with a lightweight texture and sophisticated contemporary finish.",
    images: getSareeImages("organza"),
  },
  {
    id: 6,
    name: "Chiffon Saree",
    category: "Chiffon",
    priceValue: 2999,
    price: "₹2,999",
    stock: 18,
    description:
      "Soft and lightweight chiffon saree designed for a beautiful flowing drape.",
    images: getSareeImages("chiffon"),
  },
  {
    id: 7,
    name: "Georgette Saree",
    category: "Georgette",
    priceValue: 3499,
    price: "₹3,499",
    stock: 11,
    description:
      "Stylish georgette saree with a soft drape and elegant modern appearance.",
    images: getSareeImages("georgette"),
  },
  {
    id: 8,
    name: "Cotton Saree",
    category: "Cotton",
    priceValue: 1999,
    price: "₹1,999",
    stock: 20,
    description:
      "Comfortable cotton saree with breathable fabric, perfect for daily wear.",
    images: getSareeImages("cotton"),
  },
  {
    id: 9,
    name: "Linen Saree",
    category: "Linen",
    priceValue: 2799,
    price: "₹2,799",
    stock: 13,
    description:
      "Premium linen saree combining natural texture with a refined minimal look.",
    images: getSareeImages("linen"),
  },
  {
    id: 10,
    name: "Designer Saree",
    category: "Designer",
    priceValue: 5999,
    price: "₹5,999",
    stock: 7,
    description:
      "Statement designer saree created for special occasions with a fashionable finish.",
    images: getSareeImages("designer"),
  },
  {
    id: 11,
    name: "Floral Saree",
    category: "Floral",
    priceValue: 3299,
    price: "₹3,299",
    stock: 16,
    description:
      "Beautiful floral saree featuring graceful prints and a fresh feminine appearance.",
    images: getSareeImages("floral"),
  },
  {
    id: 12,
    name: "Embroidered Saree",
    category: "Embroidered",
    priceValue: 4799,
    price: "₹4,799",
    stock: 9,
    description:
      "Elegant embroidered saree with detailed craftsmanship for festive occasions.",
    images: getSareeImages("embroidered"),
  },
];

function App() {
 const [products] = useState(sarees);
const productsLoading = false;
const productsError = "";

  const [currentVideo, setCurrentVideo] = useState(0);
  const [selectedSaree, setSelectedSaree] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("aaradhya-wishlist") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [wishlistOpen, setWishlistOpen] = useState(false);

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("aaradhya-orders") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [ordersOpen, setOrdersOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  /* =========================
     STEP 6 AUTHENTICATION
  ========================= */

 const [authToken, setAuthToken] = useState(() => {
  return localStorage.getItem("aaradhya-token") || "";
}); 

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("aaradhya-current-user") || "null"
      );
    } catch {
      return null;
    }
  });

  const [authPage, setAuthPage] = useState(null);

  const [signupDetails, setSignupDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [authErrors, setAuthErrors] = useState({});

  const [customerDetails, setCustomerDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [upiId, setUpiId] = useState("");

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [selectedBank, setSelectedBank] = useState("");

  const categories = useMemo(() => {
  return [
    "All",
    ...new Set(
      products.map((product) => product.category)
    ),
  ];
}, [products]);

  useEffect(() => {
    localStorage.setItem(
      "aaradhya-wishlist",
      JSON.stringify(wishlistIds)
    );
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem(
      "aaradhya-orders",
      JSON.stringify(orders)
    );
  }, [orders]);


  useEffect(() => {
  if (currentUser) {
    localStorage.setItem(
      "aaradhya-current-user",
      JSON.stringify(currentUser)
    );
  } else {
    localStorage.removeItem(
      "aaradhya-current-user"
    );
  }

  if (authToken) {
    localStorage.setItem(
      "aaradhya-token",
      authToken
    );
  } else {
    localStorage.removeItem(
      "aaradhya-token"
    );
  }
}, [currentUser, authToken]);

  useEffect(() => {
    if (currentUser) {
      setCustomerDetails((prev) => ({
        ...prev,
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
      }));
    }
  }, [currentUser]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideo((prev) =>
        prev === 0 ? 1 : 0
      );
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const apiSarees = useMemo(() => {
    const folders = [
      "kanjeevaram",
      "banarasi",
      "mysore-silk",
      "chanderi",
      "organza",
      "chiffon",
      "georgette",
      "cotton",
      "linen",
      "designer",
      "floral",
      "embroidered",
    ];

    return products.map((product) => {
      const isLocalProduct = !product.product_id;

      const folder = isLocalProduct
        ? folders[product.id - 1]
        : product.product_id;

      return {
        ...product,
        id: product.product_id || product.id,
        databaseId: product.databaseId || product.id,
        productId: folder,
        priceValue: Number(
          product.priceValue ?? product.price
        ),
        price:
          typeof product.price === "string"
            ? product.price
            : `₹${Number(product.price).toLocaleString("en-IN")}`,
        images:
          product.images?.length > 0
            ? product.images
            : getSareeImages(folder),
      };
    });
  }, [products]);

const filteredSarees = useMemo(() => {
  return apiSarees.filter((saree) => {
    const searchMatch =
      saree.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      saree.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const categoryMatch =
      categoryFilter === "All" ||
      saree.category === categoryFilter;

    return searchMatch && categoryMatch;
  });
}, [apiSarees, searchTerm, categoryFilter]);
  const wishlistItems = apiSarees.filter((saree) =>
  wishlistIds.includes(saree.id)
);
  const totalPrice = cartItems.reduce(
  (total, item) =>
    total +
    item.priceValue *
      (item.quantity || 1),
  0
);

const deliveryCharge =
  totalPrice > 0 ? 99 : 0;

const finalTotal =
  totalPrice + deliveryCharge;
  const cartItemCount = cartItems.reduce(
  (total, item) =>
    total + (item.quantity || 1),
  0
);

  /* =========================
     AUTH FUNCTIONS
  ========================= */

  const openSignup = () => {
    setAuthPage("signup");
    setAuthErrors({});
    setLoginDetails({
      email: "",
      password: "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openLogin = () => {
    setAuthPage("login");
    setAuthErrors({});
    setSignupDetails({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeAuth = () => {
    setAuthPage(null);
    setAuthErrors({});
  };

  const handleSignupChange = (
    field,
    value
  ) => {
    setSignupDetails((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (authErrors[field]) {
      setAuthErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleLoginChange = (
    field,
    value
  ) => {
    setLoginDetails((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (authErrors[field]) {
      setAuthErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSignup = async () => {
    const errors = {};

    const fullName = signupDetails.fullName.trim();
    const email = signupDetails.email.trim().toLowerCase();
    const phone = signupDetails.phone.trim();
    const password = signupDetails.password;
    const confirmPassword = signupDetails.confirmPassword;

    if (!fullName) {
      errors.fullName = "Please enter your full name.";
    } else if (fullName.length < 3) {
      errors.fullName = "Name must contain at least 3 characters.";
    }

    if (!email) {
      errors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email.";
    }

    if (!phone) {
      errors.phone = "Please enter your phone number.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      errors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!password) {
      errors.password = "Please create a password.";
    } else if (password.length < 6) {
      errors.password = "Password must contain at least 6 characters.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setAuthErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAuthErrors({
          email: data.message || "Unable to create account.",
        });
        return;
      }

      setAuthToken(data.token);

      setCurrentUser({
        id: data.user.id,
        fullName: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        role: data.user.role,
      });

      setAuthPage(null);
      setAuthErrors({});

      setSignupDetails({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      alert("Account created successfully!");
    } catch (error) {
      console.error(error);

      setAuthErrors({
        email: "Unable to connect to the server.",
      });
    }
  };

  const handleLogin = async () => {
    const errors = {};

    const email = loginDetails.email.trim().toLowerCase();
    const password = loginDetails.password;

    if (!email) {
      errors.email = "Please enter your email.";
    }

    if (!password) {
      errors.password = "Please enter your password.";
    }

    if (Object.keys(errors).length > 0) {
      setAuthErrors(errors);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAuthErrors({
          login: data.message || "Incorrect email or password.",
        });
        return;
      }

      setAuthToken(data.token);

      setCurrentUser({
        id: data.user.id,
        fullName: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        role: data.user.role,
      });

      setAuthPage(null);
      setAuthErrors({});

      setLoginDetails({
        email: "",
        password: "",
      });

      alert(`Welcome back, ${data.user.name}!`);
    } catch (error) {
      console.error(error);

      setAuthErrors({
        login: "Unable to connect to the server.",
      });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthToken("");
    setAuthPage(null);
    setOrdersOpen(false);
    setSelectedOrder(null);

    localStorage.removeItem("aaradhya-current-user");
    localStorage.removeItem("aaradhya-token");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openAccount = () => {
  if (!currentUser) {
    openLogin();
    return;
  }

  setOrdersOpen(false);
  setSelectedOrder(null);
  setSelectedSaree(null);
  setCheckoutOpen(false);
  setOrderPlaced(false);
  setCartOpen(false);
  setWishlistOpen(false);
  setAuthPage("account");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
  /* =========================
     PRODUCT FUNCTIONS
  ========================= */

  const openSaree = (saree) => {
    setSelectedSaree(saree);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeSaree = () => {
    setSelectedSaree(null);
  };

  const addToCart = (saree) => {
  if (saree.stock <= 0) {
    return;
  }

  setCartItems((prev) => {
    const alreadyInCart = prev.find(
      (item) => item.id === saree.id
    );

    if (alreadyInCart) {
      return prev.map((item) =>
        item.id === saree.id
          ? {
              ...item,
              quantity: Math.min(
                (item.quantity || 1) + 1,
                item.stock
              ),
            }
          : item
      );
    }

    return [
      ...prev,
      {
        ...saree,
        quantity: 1,
      },
    ];
  });

  setSelectedSaree(null);
  setWishlistOpen(false);
  setCartOpen(true);
};

  const removeFromCart = (id) => {
  setCartItems((prev) =>
    prev.filter(
      (item) => item.id !== id
    )
  );
};

const increaseCartQuantity = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.min(
              (item.quantity || 1) + 1,
              item.stock
            ),
          }
        : item
    )
  );
};

const decreaseCartQuantity = (id) => {
  setCartItems((prev) =>
    prev
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                (item.quantity || 1) - 1,
            }
          : item
      )
      .filter(
        (item) =>
          (item.quantity || 1) > 0
      )
  );
};
  

  const toggleWishlist = (id) => {
    setWishlistIds((prev) =>
      prev.includes(id)
        ? prev.filter(
            (itemId) =>
              itemId !== id
          )
        : [...prev, id]
    );
  };

  /* =========================
     CHECKOUT
  ========================= */

  const startCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }

    if (!currentUser) {
      setCartOpen(false);
      openLogin();
      alert(
        "Please login or create an account before checkout."
      );
      return;
    }

    setCartOpen(false);
    setCheckoutOpen(true);
    setFormErrors({});
  };

  const handleCustomerChange = (
    field,
    value
  ) => {
    setCustomerDetails((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateCheckout = () => {
    const errors = {};

    const name =
      customerDetails.fullName.trim();

    const email =
      customerDetails.email.trim();

    const phone =
      customerDetails.phone.trim();

    const address =
      customerDetails.address.trim();

    const city =
      customerDetails.city.trim();

    const state =
      customerDetails.state.trim();

    const pincode =
      customerDetails.pincode.trim();

    if (!name) {
      errors.fullName =
        "Please enter your full name.";
    } else if (name.length < 3) {
      errors.fullName =
        "Please enter a valid name.";
    }

    if (!email) {
      errors.email =
        "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      errors.email =
        "Please enter a valid email address.";
    }

    if (!phone) {
      errors.phone =
        "Please enter your phone number.";
    } else if (
      !/^[6-9]\d{9}$/.test(phone)
    ) {
      errors.phone =
        "Please enter a valid 10-digit Indian phone number.";
    }

    if (!address) {
      errors.address =
        "Please enter your full address.";
    } else if (address.length < 10) {
      errors.address =
        "Please enter a complete address.";
    }

    if (!city) {
      errors.city =
        "Please enter your city.";
    }

    if (!state) {
      errors.state =
        "Please enter your state.";
    }

    if (!pincode) {
      errors.pincode =
        "Please enter your pincode.";
    } else if (
      !/^\d{6}$/.test(pincode)
    ) {
      errors.pincode =
        "Please enter a valid 6-digit pincode.";
    }

    if (paymentMethod === "UPI") {
      if (!upiId.trim()) {
        errors.upiId =
          "Please enter your UPI ID.";
      } else if (
        !/^[\w.-]+@[\w.-]+$/.test(
          upiId.trim()
        )
      ) {
        errors.upiId =
          "Please enter a valid UPI ID.";
      }
    }

    if (paymentMethod === "CARD") {
      const cardNumber =
        cardDetails.cardNumber.replace(
          /\s/g,
          ""
        );

      if (
        !cardDetails.cardName.trim()
      ) {
        errors.cardName =
          "Please enter cardholder name.";
      }

      if (!cardNumber) {
        errors.cardNumber =
          "Please enter card number.";
      } else if (
        !/^\d{13,19}$/.test(
          cardNumber
        )
      ) {
        errors.cardNumber =
          "Please enter a valid card number.";
      }

      if (!cardDetails.expiry.trim()) {
        errors.expiry =
          "Please enter expiry date.";
      } else if (
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(
          cardDetails.expiry.trim()
        )
      ) {
        errors.expiry =
          "Use MM/YY format.";
      }

      if (!cardDetails.cvv.trim()) {
        errors.cvv =
          "Please enter CVV.";
      } else if (
        !/^\d{3}$/.test(
          cardDetails.cvv.trim()
        )
      ) {
        errors.cvv =
          "CVV must contain 3 digits.";
      }
    }

    if (
      paymentMethod ===
      "NETBANKING"
    ) {
      if (!selectedBank) {
        errors.bank =
          "Please select your bank.";
      }
    }

    setFormErrors(errors);

    return (
      Object.keys(errors).length === 0
    );
  };

  const getPaymentMethodName = () => {
    if (paymentMethod === "UPI") {
      return "UPI";
    }

    if (paymentMethod === "COD") {
      return "Cash on Delivery";
    }

    if (paymentMethod === "CARD") {
      return "Credit / Debit Card";
    }

    if (
      paymentMethod ===
      "NETBANKING"
    ) {
      return "Net Banking";
    }

    return "Cash on Delivery";
  };

  const placeOrder = () => {
    if (!currentUser) {
      openLogin();
      return;
    }

    const isValid =
      validateCheckout();

    if (!isValid) {
      return;
    }

    const generatedId =
      `AAR-${Date.now()
        .toString(36)
        .toUpperCase()}-${Math.random()
        .toString(36)
        .slice(2, 6)
        .toUpperCase()}`;

    const newOrder = {
      id: generatedId,

      date: new Date().toISOString(),

      status: "Order Placed",

      userId: currentUser.id,

      customer: {
        ...customerDetails,
      },

      paymentMethod:
        getPaymentMethodName(),

      items: cartItems.map(
  (item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    priceValue:
      item.priceValue,
    quantity:
      item.quantity || 1,
    image: item.images[0],
  })
),

      subtotal: totalPrice,

      delivery: deliveryCharge,

      total: finalTotal,
    };

    setOrders((prev) => [
      newOrder,
      ...prev,
    ]);

    setOrderId(generatedId);

    setCheckoutOpen(false);

    setOrderPlaced(true);

    setCartItems([]);

    setSelectedOrder(newOrder);
  };

  /* =========================
     ORDERS
  ========================= */

  const openOrderHistory = () => {
  if (!currentUser) {
    openLogin();
    return;
  }

  setAuthPage(null);
  setOrdersOpen(true);
  setSelectedOrder(null);
  setOrderPlaced(false);
  setCheckoutOpen(false);
  setSelectedSaree(null);
  setCartOpen(false);
  setWishlistOpen(false);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  const closeOrderHistory = () => {
    setOrdersOpen(false);
    setSelectedOrder(null);
  };

  const openOrderDetails = (
    order
  ) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  /* =========================
     HOME
  ========================= */

  const goHome = () => {
    setSelectedSaree(null);
    setCheckoutOpen(false);
    setOrderPlaced(false);
    setOrdersOpen(false);
    setSelectedOrder(null);
    setAuthPage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const accountOrders = currentUser
    ? orders.filter(
        (order) =>
          order.userId ===
          currentUser.id
      )
    : [];

  return (
    <div className="app">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="navbar">
        <div
          className="logo"
          onClick={goHome}
        >
          AARADHYA
        </div>

        <div className="nav-links">
          <button onClick={goHome}>
            HOME
          </button>

          <button
            onClick={() =>
              document
                .getElementById(
                  "collection"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            COLLECTION
          </button>

          <button
            onClick={() =>
              document
                .getElementById(
                  "about"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            ABOUT
          </button>

          <button
            onClick={() =>
              document
                .getElementById(
                  "contact"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            CONTACT
          </button>

          <button
            onClick={
              openOrderHistory
            }
          >
            ORDERS
          </button>
        </div>

        <div className="nav-actions">

          <button
            className="wishlist-nav-button"
            onClick={() =>
              setWishlistOpen(true)
            }
          >
            ♡

            {wishlistIds.length >
              0 && (
              <span>
                {wishlistIds.length}
              </span>
            )}
          </button>

          <button
            className="cart-button"
            onClick={() =>
              setCartOpen(true)
            }
          >
            CART (
{cartItemCount})
          </button>

          <button
            className="cart-button"
            onClick={openAccount}
          >
            {currentUser
              ? `ACCOUNT`
              : "LOGIN"}
          </button>
        </div>
      </nav>

      {/* =========================
          HERO
      ========================= */}

      {!selectedSaree &&
        !checkoutOpen &&
        !orderPlaced &&
        !ordersOpen &&
        !authPage && (
          <section className="hero">

            <video
              key={currentVideo}
              autoPlay
              muted
              playsInline
              loop
              className="hero-video"
            >
              <source
                src={
                  currentVideo === 0
                    ? heroVideo1
                    : heroVideo2
                }
                type="video/mp4"
              />
            </video>

            <div className="hero-overlay"></div>

            <div className="hero-content">

              <p className="hero-small">
                THE ART OF DRAPING
              </p>

              <h1>
                AARADHYA
              </h1>

              <p className="hero-subtitle">
                Timeless sarees. Modern elegance.
              </p>

              <button
                className="explore-button"
                onClick={() =>
                  document
                    .getElementById(
                      "collection"
                    )
                    ?.scrollIntoView({
                      behavior:
                        "smooth",
                    })
                }
              >
                EXPLORE COLLECTION
              </button>

            </div>

            <div className="scroll-text">
              SCROLL TO EXPLORE
            </div>

          </section>
        )}

      {/* =========================
          COLLECTION
      ========================= */}

      {!selectedSaree &&
        !checkoutOpen &&
        !orderPlaced &&
        !ordersOpen &&
        !authPage && (
          <section
            className="collection-section"
            id="collection"
          >

            <div className="collection-heading">

              <p>
                THE COLLECTION
              </p>

              <h2>
                Curated Elegance
              </h2>

              <span>
                {filteredSarees.length} SAREES
              </span>

            </div>

            <div className="product-controls">

              <input
                type="text"
                placeholder="Search sarees..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
              />

              <select
                value={
                  categoryFilter
                }
                onChange={(e) =>
                  setCategoryFilter(
                    e.target.value
                  )
                }
              >
                {categories.map(
                  (category) => (
                    <option
                      value={category}
                      key={category}
                    >
                      {category}
                    </option>
                  )
                )}
              </select>

              <button
                className="wishlist-filter-button"
                onClick={() =>
                  setWishlistOpen(
                    true
                  )
                }
              >
                WISHLIST (
                {wishlistIds.length})
              </button>

            </div>

            
             {productsLoading && (
  <div className="no-products">
    <p>Loading sarees...</p>
  </div>
)}

{productsError && (
  <div className="no-products">
    <p>{productsError}</p>
  </div>
)}

<div className="product-grid">
  {filteredSarees.map(
                (saree) => {

                  const isWishlisted =
                    wishlistIds.includes(
                      saree.id
                    );

                  return (
                    <motion.article
                      className="product-card"
                      key={saree.id}
                      initial={{
                        opacity: 0,
                        y: 25,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                    >

                      <div className="product-image">

                        <img
                          src={
                            saree.images[0]
                          }
                          alt={
                            saree.name
                          }
                        />

                        <button
                          className="wishlist-button"
                          onClick={() =>
                            toggleWishlist(
                              saree.id
                            )
                          }
                        >
                          {isWishlisted
                            ? "♥"
                            : "♡"}
                        </button>

                        <span className="featured-badge">
                          {
                            saree.category
                          }
                        </span>

                        <span className="stock-badge">
                          {saree.stock >
                          0
                            ? `${saree.stock} in stock`
                            : "Out of stock"}
                        </span>

                      </div>

                      <div className="product-card-content">

                        <div className="product-meta">

                          <span>
                            {
                              saree.category
                            }
                          </span>

                          <strong>
                            {
                              saree.price
                            }
                          </strong>

                        </div>

                        <h3>
                          {saree.name}
                        </h3>

                        <p>
                          {
                            saree.description
                          }
                        </p>

                        <button
                          className="view-button"
                          onClick={() =>
                            openSaree(
                              saree
                            )
                          }
                        >
                          VIEW SAREE
                        </button>

                      </div>

                    </motion.article>
                  );
                }
              )}

            </div>

            {!productsLoading &&
  !productsError &&
  filteredSarees.length === 0 && (
    <div className="no-products">
      No sarees found.
    </div>
  )}
          </section>
        )}

      {/* =========================
          ABOUT
      ========================= */}

      {!selectedSaree &&
        !checkoutOpen &&
        !orderPlaced &&
        !ordersOpen &&
        !authPage && (
          <section
            className="about-section"
            id="about"
          >

            <div>

              <p>
                ABOUT AARADHYA
              </p>

              <h2>
                Tradition woven into every thread.
              </h2>

            </div>

            <p>
              Aaradhya celebrates the
              beauty of Indian sarees
              by bringing together
              traditional craftsmanship
              and contemporary elegance.
            </p>

          </section>
        )}

      {/* =========================
          CONTACT
      ========================= */}

      {!selectedSaree &&
        !checkoutOpen &&
        !orderPlaced &&
        !ordersOpen &&
        !authPage && (
          <section
  className="contact-section"
  id="contact"
>
  <div className="contact-heading">
    <p>CONTACT AARADHYA</p>

    <h2>
      We would love to hear from you.
    </h2>

    <span>
      Have a question about our sarees,
      orders or styling? Get in touch with us.
    </span>
  </div>

  <div className="contact-container">

    <div className="contact-info">

      <div className="contact-info-item">
        <span className="contact-icon">
          ✦
        </span>

        <div>
          <p>EMAIL</p>

          <h3>
            hello@aaradhya.com
          </h3>

          <span>
            We usually respond within 24 hours.
          </span>
        </div>
      </div>

      <div className="contact-info-item">
        <span className="contact-icon">
          ✦
        </span>

        <div>
          <p>PHONE</p>

          <h3>
            +91 98765 43210
          </h3>

          <span>
            Monday – Saturday, 10 AM – 6 PM
          </span>
        </div>
      </div>

      <div className="contact-info-item">
        <span className="contact-icon">
          ✦
        </span>

        <div>
          <p>LOCATION</p>

          <h3>
            Bengaluru, Karnataka
          </h3>

          <span>
            India
          </span>
        </div>
      </div>

      <div className="contact-info-item">
        <span className="contact-icon">
          ✦
        </span>

        <div>
          <p>BUSINESS HOURS</p>

          <h3>
            Monday – Saturday
          </h3>

          <span>
            10:00 AM – 6:00 PM
          </span>
        </div>
      </div>

    </div>

    <div className="contact-form">

      <div className="contact-form-heading">
        <p>SEND US A MESSAGE</p>

        <h3>
          Let's start a conversation.
        </h3>
      </div>

      <div className="contact-form-row">

        <input
          type="text"
          placeholder="Your Name"
        />

        <input
          type="email"
          placeholder="Email Address"
        />

      </div>

      <div className="contact-form-row">

        <input
          type="tel"
          placeholder="Phone Number"
        />

        <input
          type="text"
          placeholder="Subject"
        />

      </div>

      <textarea
        placeholder="Write your message..."
        rows="6"
      ></textarea>

      <button
        className="contact-submit-button"
        onClick={() =>
          alert(
            "Thank you for contacting Aaradhya. We will get back to you soon."
          )
        }
      >
        SEND MESSAGE
      </button>

    </div>

  </div>

  <div className="contact-footer">

    <span>
      AARADHYA
    </span>

    <p>
      Timeless sarees. Modern elegance.
    </p>

  </div>

</section>
        )}

      {/* =========================
          SAREE DETAIL
      ========================= */}

      <AnimatePresence>

        {selectedSaree && (
          <motion.section
            className="saree-detail-v2"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 30,
            }}
          >

            <button
              className="detail-close-button"
              onClick={
                closeSaree
              }
            >
              ×
            </button>

            <div className="detail-page-heading">

              <span>
                {
                  selectedSaree.category
                }
              </span>

              <h1>
                {
                  selectedSaree.name
                }
              </h1>

              <p>
                Explore all six views of this saree collection.
              </p>

            </div>

            <div className="detail-image-grid">

              {selectedSaree.images.map(
                (image, index) => (
                  <motion.article
                    className="detail-image-card"
                    key={`${selectedSaree.id}-${index}`}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.06,
                    }}
                  >

                    <div className="detail-image-wrap">

                      <img
                        src={image}
                        alt={`${selectedSaree.name} view ${
                          index + 1
                        }`}
                      />

                      <span className="detail-image-number">
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                    </div>

                    <div className="detail-image-info">

                      <span className="detail-category">
                        {
                          selectedSaree.category
                        }
                      </span>

                      <h2>
                        {
                          selectedSaree.name
                        }
                      </h2>

                      <div className="detail-price">
                        {
                          selectedSaree.price
                        }
                      </div>

                      <div className="detail-stock">
                        {selectedSaree.stock >
                        0
                          ? `Available • ${selectedSaree.stock} pieces`
                          : "Currently out of stock"}
                      </div>

                      <p className="detail-description">
                        {
                          selectedSaree.description
                        }
                      </p>

                      <button
                        className="detail-add-cart"
                        disabled={
                          selectedSaree.stock <=
                          0
                        }
                        onClick={() =>
                          addToCart(
                            selectedSaree
                          )
                        }
                      >
                        {selectedSaree.stock >
                        0
                          ? "ADD TO CART"
                          : "OUT OF STOCK"}
                      </button>

                    </div>

                  </motion.article>
                )
              )}

            </div>

          </motion.section>
        )}

      </AnimatePresence>

      {/* =========================
          SIGNUP / LOGIN / ACCOUNT
      ========================= */}

      {authPage && (
        <section className="checkout-page">

          <div
            className="checkout-content"
            style={{
              maxWidth:
                authPage ===
                "account"
                  ? "900px"
                  : "600px",
            }}
          >

            <button
              className="back-button"
              onClick={() => {
                if (
                  authPage ===
                  "account"
                ) {
                  goHome();
                } else {
                  closeAuth();
                }
              }}
            >
              ← BACK
            </button>

            {/* SIGNUP */}

            {authPage ===
              "signup" && (
              <div className="checkout-form">

                <h1>
                  CREATE ACCOUNT
                </h1>

                <p>
                  Join Aaradhya and make
                  your shopping experience
                  easier.
                </p>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={
                    signupDetails.fullName
                  }
                  onChange={(e) =>
                    handleSignupChange(
                      "fullName",
                      e.target.value
                    )
                  }
                />

                {authErrors.fullName && (
                  <span className="checkout-error">
                    {
                      authErrors.fullName
                    }
                  </span>
                )}

                <input
                  type="email"
                  placeholder="Email Address"
                  value={
                    signupDetails.email
                  }
                  onChange={(e) =>
                    handleSignupChange(
                      "email",
                      e.target.value
                    )
                  }
                />

                {authErrors.email && (
                  <span className="checkout-error">
                    {
                      authErrors.email
                    }
                  </span>
                )}

                <input
                  type="tel"
                  placeholder="Phone Number"
                  maxLength="10"
                  value={
                    signupDetails.phone
                  }
                  onChange={(e) =>
                    handleSignupChange(
                      "phone",
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />

                {authErrors.phone && (
                  <span className="checkout-error">
                    {
                      authErrors.phone
                    }
                  </span>
                )}

                <input
                  type="password"
                  placeholder="Password"
                  value={
                    signupDetails.password
                  }
                  onChange={(e) =>
                    handleSignupChange(
                      "password",
                      e.target.value
                    )
                  }
                />

                {authErrors.password && (
                  <span className="checkout-error">
                    {
                      authErrors.password
                    }
                  </span>
                )}

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={
                    signupDetails.confirmPassword
                  }
                  onChange={(e) =>
                    handleSignupChange(
                      "confirmPassword",
                      e.target.value
                    )
                  }
                />

                {authErrors.confirmPassword && (
                  <span className="checkout-error">
                    {
                      authErrors.confirmPassword
                    }
                  </span>
                )}

                <button
                  className="place-order-button"
                  onClick={
                    handleSignup
                  }
                >
                  CREATE ACCOUNT
                </button>

                <p
                  style={{
                    marginTop:
                      "20px",
                    textAlign:
                      "center",
                  }}
                >
                  Already have an
                  account?
                </p>

                <button
                  className="view-button"
                  onClick={
                    openLogin
                  }
                >
                  LOGIN
                </button>

              </div>
            )}

            {/* LOGIN */}

            {authPage ===
              "login" && (
              <div className="checkout-form">

                <h1>
                  WELCOME BACK
                </h1>

                <p>
                  Login to your
                  Aaradhya account.
                </p>

                {authErrors.login && (
                  <span
                    className="checkout-error"
                    style={{
                      display:
                        "block",
                      marginBottom:
                        "15px",
                    }}
                  >
                    {
                      authErrors.login
                    }
                  </span>
                )}

                <input
                  type="email"
                  placeholder="Email Address"
                  value={
                    loginDetails.email
                  }
                  onChange={(e) =>
                    handleLoginChange(
                      "email",
                      e.target.value
                    )
                  }
                />

                {authErrors.email && (
                  <span className="checkout-error">
                    {
                      authErrors.email
                    }
                  </span>
                )}

                <input
                  type="password"
                  placeholder="Password"
                  value={
                    loginDetails.password
                  }
                  onChange={(e) =>
                    handleLoginChange(
                      "password",
                      e.target.value
                    )
                  }
                />

                {authErrors.password && (
                  <span className="checkout-error">
                    {
                      authErrors.password
                    }
                  </span>
                )}

                <button
                  className="place-order-button"
                  onClick={
                    handleLogin
                  }
                >
                  LOGIN
                </button>

                <p
                  style={{
                    marginTop:
                      "20px",
                    textAlign:
                      "center",
                  }}
                >
                  Don't have an
                  account?
                </p>

                <button
                  className="view-button"
                  onClick={
                    openSignup
                  }
                >
                  CREATE ACCOUNT
                </button>

              </div>
            )}

            {/* ACCOUNT */}

            {authPage ===
              "account" &&
              currentUser && (
                <div>

                  <h1>
                    MY ACCOUNT
                  </h1>

                  <p>
                    Welcome back,{" "}
                    <strong>
                      {
                        currentUser.fullName
                      }
                    </strong>
                  </p>

                  <div
                    className="checkout-grid"
                    style={{
                      marginTop:
                        "30px",
                    }}
                  >

                    <div className="checkout-form">

                      <h2>
                        Profile
                      </h2>

                      <div className="checkout-line">
                        <span>
                          Full Name
                        </span>

                        <strong>
                          {
                            currentUser.fullName
                          }
                        </strong>
                      </div>

                      <div className="checkout-line">
                        <span>
                          Email
                        </span>

                        <strong>
                          {
                            currentUser.email
                          }
                        </strong>
                      </div>

                      <div className="checkout-line">
                        <span>
                          Phone
                        </span>

                        <strong>
                          {
                            currentUser.phone
                          }
                        </strong>
                      </div>

                      <button
                        className="place-order-button"
                        onClick={
                          handleLogout
                        }
                        style={{
                          marginTop:
                            "25px",
                        }}
                      >
                        LOGOUT
                      </button>

                    </div>

                    <div className="checkout-summary">

                      <h2>
                        My Orders
                      </h2>

                      <div className="checkout-line">
                        <span>
                          Total Orders
                        </span>

                        <strong>
                          {
                            accountOrders.length
                          }
                        </strong>
                      </div>

                      <button
                        className="view-button"
                        onClick={
                          openOrderHistory
                        }
                      >
                        VIEW ORDER HISTORY
                      </button>

                    </div>

                  </div>

                </div>
              )}

          </div>

        </section>
      )}

      {/* =========================
          WISHLIST
      ========================= */}

      <AnimatePresence>

        {wishlistOpen && (
          <>
            <motion.div
              className="cart-overlay"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setWishlistOpen(
                  false
                )
              }
            />

            <motion.aside
              className="cart-panel"
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
            >

              <div className="cart-header">

                <h2>
                  WISHLIST
                </h2>

                <button
                  onClick={() =>
                    setWishlistOpen(
                      false
                    )
                  }
                >
                  ×
                </button>

              </div>

              {wishlistItems.length ===
              0 ? (
                <div className="empty-cart">
                  <p>
                    Your wishlist is
                    empty.
                  </p>
                </div>
              ) : (
                <div className="cart-items">

                  {wishlistItems.map(
                    (saree) => (
                      <div
                        className="cart-item"
                        key={
                          saree.id
                        }
                      >

                        <img
                          src={
                            saree.images[0]
                          }
                          alt={
                            saree.name
                          }
                        />

                        <div>

                          <h3>
                            {
                              saree.name
                            }
                          </h3>

                          <p>
                            {
                              saree.price
                            }
                          </p>

                          <button
                            onClick={() =>
                              addToCart(
                                saree
                              )
                            }
                          >
                            ADD TO CART
                          </button>

                          <button
                            onClick={() =>
                              toggleWishlist(
                                saree.id
                              )
                            }
                          >
                            REMOVE
                          </button>

                        </div>

                      </div>
                    )
                  )}

                </div>
              )}

            </motion.aside>
          </>
        )}

      </AnimatePresence>

      {/* =========================
          CART
      ========================= */}

      <AnimatePresence>

        {cartOpen && (
          <>
            <motion.div
              className="cart-overlay"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setCartOpen(false)
              }
            />

            <motion.aside
              className="cart-panel"
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
            >

              <div className="cart-header">

                <h2>
                  YOUR CART
                </h2>

                <button
                  onClick={() =>
                    setCartOpen(
                      false
                    )
                  }
                >
                  ×
                </button>

              </div>

              {cartItems.length ===
              0 ? (
                <div className="empty-cart">
                  <p>
                    Your cart is
                    empty.
                  </p>
                </div>
              ) : (
                <>
                  <div className="cart-items">

  {cartItems.map(
    (item) => (
      <div
        className="cart-item"
        key={item.id}
      >

        <img
          src={item.images[0]}
          alt={item.name}
        />

        <div>

          <h3>
            {item.name}
          </h3>

          <p>
            {item.price}
          </p>

          <div className="cart-quantity">

            <button
              onClick={() =>
                decreaseCartQuantity(
                  item.id
                )
              }
            >
              −
            </button>

            <span>
              {item.quantity || 1}
            </span>

            <button
              onClick={() =>
                increaseCartQuantity(
                  item.id
                )
              }
              disabled={
                (item.quantity || 1) >=
                item.stock
              }
            >
              +
            </button>

          </div>

          <p className="cart-item-total">
            ₹
            {(
              item.priceValue *
              (item.quantity || 1)
            ).toLocaleString("en-IN")}
          </p>

          <button
            onClick={() =>
              removeFromCart(
                item.id
              )
            }
          >
            REMOVE
          </button>

        </div>

      </div>
    )
  )}

</div>
                  <div className="cart-summary">

                    <div>
                      <span>
                        Subtotal
                      </span>

                      <strong>
                        ₹
                        {totalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Delivery
                      </span>

                      <strong>
                        ₹
                        {deliveryCharge.toLocaleString(
                          "en-IN"
                        )}
                      </strong>
                    </div>

                    <div className="cart-total">

                      <span>
                        Total
                      </span>

                      <strong>
                        ₹
                        {finalTotal.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>

                    <button
                      className="checkout-button"
                      onClick={
                        startCheckout
                      }
                    >
                      PROCEED TO CHECKOUT
                    </button>

                  </div>
                </>
              )}

            </motion.aside>
          </>
        )}

      </AnimatePresence>

      {/* =========================
          CHECKOUT
      ========================= */}

      {checkoutOpen && (
        <section className="checkout-page">

          <div className="checkout-content">

            <button
  className="back-button"
  onClick={() => {
    setCheckoutOpen(false);
    setCartOpen(true);
  }}
>
  ← BACK TO CART
</button>

            <h1>
              CHECKOUT
            </h1>

            <div className="checkout-grid">

              <div className="checkout-form">

                <h2>
                  Customer Details
                </h2>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={
                    customerDetails.fullName
                  }
                  onChange={(e) =>
                    handleCustomerChange(
                      "fullName",
                      e.target.value
                    )
                  }
                />

                {formErrors.fullName && (
                  <span className="checkout-error">
                    {
                      formErrors.fullName
                    }
                  </span>
                )}

                <input
                  type="email"
                  placeholder="Email Address"
                  value={
                    customerDetails.email
                  }
                  onChange={(e) =>
                    handleCustomerChange(
                      "email",
                      e.target.value
                    )
                  }
                />

                {formErrors.email && (
                  <span className="checkout-error">
                    {
                      formErrors.email
                    }
                  </span>
                )}

                <input
                  type="tel"
                  placeholder="Phone Number"
                  maxLength="10"
                  value={
                    customerDetails.phone
                  }
                  onChange={(e) =>
                    handleCustomerChange(
                      "phone",
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />

                {formErrors.phone && (
                  <span className="checkout-error">
                    {
                      formErrors.phone
                    }
                  </span>
                )}

                <textarea
                  placeholder="Full Address"
                  rows="4"
                  value={
                    customerDetails.address
                  }
                  onChange={(e) =>
                    handleCustomerChange(
                      "address",
                      e.target.value
                    )
                  }
                ></textarea>

                {formErrors.address && (
                  <span className="checkout-error">
                    {
                      formErrors.address
                    }
                  </span>
                )}

                <input
                  type="text"
                  placeholder="City"
                  value={
                    customerDetails.city
                  }
                  onChange={(e) =>
                    handleCustomerChange(
                      "city",
                      e.target.value
                    )
                  }
                />

                {formErrors.city && (
                  <span className="checkout-error">
                    {
                      formErrors.city
                    }
                  </span>
                )}

                <input
                  type="text"
                  placeholder="State"
                  value={
                    customerDetails.state
                  }
                  onChange={(e) =>
                    handleCustomerChange(
                      "state",
                      e.target.value
                    )
                  }
                />

                {formErrors.state && (
                  <span className="checkout-error">
                    {
                      formErrors.state
                    }
                  </span>
                )}

                <input
                  type="text"
                  placeholder="Pincode"
                  maxLength="6"
                  value={
                    customerDetails.pincode
                  }
                  onChange={(e) =>
                    handleCustomerChange(
                      "pincode",
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />

                {formErrors.pincode && (
                  <span className="checkout-error">
                    {
                      formErrors.pincode
                    }
                  </span>
                )}

                <div className="payment-section">

                  <h2>
                    Payment Method
                  </h2>

                  <div className="payment-options">

                    <label className="payment-option">

                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI"
                        checked={
                          paymentMethod ===
                          "UPI"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <span>
                        <strong>
                          UPI
                        </strong>

                        <small>
                          Pay using
                          Google Pay,
                          PhonePe,
                          Paytm or any
                          UPI app.
                        </small>
                      </span>

                    </label>

                    <label className="payment-option">

                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={
                          paymentMethod ===
                          "COD"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <span>
                        <strong>
                          Cash on Delivery
                        </strong>

                        <small>
                          Pay when
                          your saree
                          is delivered.
                        </small>
                      </span>

                    </label>

                    <label className="payment-option">

                      <input
                        type="radio"
                        name="paymentMethod"
                        value="CARD"
                        checked={
                          paymentMethod ===
                          "CARD"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <span>
                        <strong>
                          Credit / Debit Card
                        </strong>

                        <small>
                          Pay securely
                          using your
                          card.
                        </small>
                      </span>

                    </label>

                    <label className="payment-option">

                      <input
                        type="radio"
                        name="paymentMethod"
                        value="NETBANKING"
                        checked={
                          paymentMethod ===
                          "NETBANKING"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <span>
                        <strong>
                          Net Banking
                        </strong>

                        <small>
                          Pay directly
                          through your
                          bank.
                        </small>
                      </span>

                    </label>

                  </div>

                  {paymentMethod ===
                    "UPI" && (
                    <div className="payment-details">

                      <input
                        type="text"
                        placeholder="Enter UPI ID"
                        value={
                          upiId
                        }
                        onChange={(e) => {
                          setUpiId(
                            e.target.value
                          );

                          if (
                            formErrors.upiId
                          ) {
                            setFormErrors(
                              (
                                prev
                              ) => ({
                                ...prev,
                                upiId:
                                  "",
                              })
                            );
                          }
                        }}
                      />

                      {formErrors.upiId && (
                        <span className="checkout-error">
                          {
                            formErrors.upiId
                          }
                        </span>
                      )}

                      <p>
                        Example:
                        yourname@upi
                      </p>

                    </div>
                  )}

                  {paymentMethod ===
                    "CARD" && (
                    <div className="payment-details">

                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        value={
                          cardDetails.cardName
                        }
                        onChange={(e) => {
                          setCardDetails(
                            {
                              ...cardDetails,
                              cardName:
                                e.target
                                  .value,
                            }
                          );
                        }}
                      />

                      {formErrors.cardName && (
                        <span className="checkout-error">
                          {
                            formErrors.cardName
                          }
                        </span>
                      )}

                      <input
                        type="text"
                        placeholder="Card Number"
                        maxLength="19"
                        value={
                          cardDetails.cardNumber
                        }
                        onChange={(e) => {
                          setCardDetails(
                            {
                              ...cardDetails,
                              cardNumber:
                                e.target.value.replace(
                                  /[^\d\s]/g,
                                  ""
                                ),
                            }
                          );
                        }}
                      />

                      {formErrors.cardNumber && (
                        <span className="checkout-error">
                          {
                            formErrors.cardNumber
                          }
                        </span>
                      )}

                      <div className="payment-row">

                        <div>

                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength="5"
                            value={
                              cardDetails.expiry
                            }
                            onChange={(e) => {
                              let value =
                                e.target.value.replace(
                                  /\D/g,
                                  ""
                                );

                              if (
                                value.length >
                                2
                              ) {
                                value =
                                  value.slice(
                                    0,
                                    2
                                  ) +
                                  "/" +
                                  value.slice(
                                    2,
                                    4
                                  );
                              }

                              setCardDetails(
                                {
                                  ...cardDetails,
                                  expiry:
                                    value,
                                }
                              );
                            }}
                          />

                          {formErrors.expiry && (
                            <span className="checkout-error">
                              {
                                formErrors.expiry
                              }
                            </span>
                          )}

                        </div>

                        <div>

                          <input
                            type="password"
                            placeholder="CVV"
                            maxLength="3"
                            value={
                              cardDetails.cvv
                            }
                            onChange={(e) =>
                              setCardDetails(
                                {
                                  ...cardDetails,
                                  cvv: e.target.value.replace(
                                    /\D/g,
                                    ""
                                  ),
                                }
                              )
                            }
                          />

                          {formErrors.cvv && (
                            <span className="checkout-error">
                              {
                                formErrors.cvv
                              }
                            </span>
                          )}

                        </div>

                      </div>

                      <p>
                        Your card details
                        are only for this
                        frontend demo.
                      </p>

                    </div>
                  )}

                  {paymentMethod ===
                    "NETBANKING" && (
                    <div className="payment-details">

                      <select
                        value={
                          selectedBank
                        }
                        onChange={(e) =>
                          setSelectedBank(
                            e.target.value
                          )
                        }
                      >

                        <option value="">
                          Select your bank
                        </option>

                        <option value="SBI">
                          State Bank of India
                        </option>

                        <option value="HDFC">
                          HDFC Bank
                        </option>

                        <option value="ICICI">
                          ICICI Bank
                        </option>

                        <option value="AXIS">
                          Axis Bank
                        </option>

                        <option value="KOTAK">
                          Kotak Mahindra Bank
                        </option>

                        <option value="CANARA">
                          Canara Bank
                        </option>

                        <option value="OTHER">
                          Other Bank
                        </option>

                      </select>

                      {formErrors.bank && (
                        <span className="checkout-error">
                          {
                            formErrors.bank
                          }
                        </span>
                      )}

                    </div>
                  )}

                  {paymentMethod ===
                    "COD" && (
                    <div className="payment-details cod-message">

                      <p>
                        You can pay in
                        cash when your
                        Aaradhya saree is
                        delivered to your
                        address.
                      </p>

                    </div>
                  )}

                </div>

              </div>

              <div className="checkout-summary">

                <h2>
                  Order Summary
                </h2>

               {cartItems.map(
  (item) => (
    <div
      className="checkout-item"
      key={item.id}
    >

      <span>
        {item.name}
        {" × "}
        {item.quantity || 1}
      </span>

      <strong>
        ₹
        {(
          item.priceValue *
          (item.quantity || 1)
        ).toLocaleString("en-IN")}
      </strong>

    </div>
  )
)}

                <div className="checkout-line">

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ₹
                    {totalPrice.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

                <div className="checkout-line">

                  <span>
                    Delivery
                  </span>

                  <strong>
                    ₹
                    {deliveryCharge.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

                <div className="checkout-final">

                  <span>
                    Total
                  </span>

                  <strong>
                    ₹
                    {finalTotal.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

                <div className="selected-payment-summary">

                  <span>
                    Payment Method
                  </span>

                  <strong>
                    {
                      getPaymentMethodName()
                    }
                  </strong>

                </div>

                <button
                  className="place-order-button"
                  onClick={
                    placeOrder
                  }
                >
                  PLACE ORDER
                </button>

              </div>

            </div>

          </div>

        </section>
      )}

      {/* =========================
          ORDER HISTORY
      ========================= */}

      {ordersOpen && (
        <section className="checkout-page">

          <div className="checkout-content">

            <button
              className="back-button"
              onClick={
                closeOrderHistory
              }
            >
              ← BACK TO SHOP
            </button>

            <h1>
              ORDER HISTORY
            </h1>

            {accountOrders.length ===
            0 ? (
              <div className="empty-cart">

                <h2>
                  No orders yet
                </h2>

                <p>
                  Your placed orders
                  will appear here.
                </p>

                <button
                  className="explore-button"
                  onClick={
                    goHome
                  }
                >
                  START SHOPPING
                </button>

              </div>
            ) : (
              <div className="checkout-grid">

                <div className="checkout-form">

                  <h2>
                    Your Orders (
                    {
                      accountOrders.length
                    }
                    )
                  </h2>

                  {accountOrders.map(
                    (order) => (
                      <div
                        key={
                          order.id
                        }
                        className="checkout-item"
                        style={{
                          display:
                            "block",
                          padding:
                            "18px",
                          marginBottom:
                            "15px",
                          border:
                            "1px solid rgba(80, 50, 30, 0.15)",
                        }}
                      >

                        <div
                          style={{
                            display:
                              "flex",
                            justifyContent:
                              "space-between",
                            gap:
                              "15px",
                            marginBottom:
                              "10px",
                          }}
                        >

                          <strong>
                            {
                              order.id
                            }
                          </strong>

                          <span>
                            {
                              order.status
                            }
                          </span>

                        </div>

                        <p>
                          {new Date(
                            order.date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month:
                                "long",
                              year:
                                "numeric",
                            }
                          )}
                        </p>

                        <p>
  {order.items.reduce(
    (total, item) =>
      total + (item.quantity || 1),
    0
  )}{" "}
  item
  {order.items.reduce(
    (total, item) =>
      total + (item.quantity || 1),
    0
  ) !== 1
    ? "s"
    : ""}
</p>

                        <strong>
                          ₹
                          {order.total.toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                        <br />

                        <button
                          className="view-button"
                          style={{
                            marginTop:
                              "15px",
                          }}
                          onClick={() =>
                            openOrderDetails(
                              order
                            )
                          }
                        >
                          VIEW ORDER DETAILS
                        </button>

                      </div>
                    )
                  )}

                </div>

                <div className="checkout-summary">

                  {selectedOrder ? (
                    <>

                      <h2>
                        Order Details
                      </h2>

                      <div className="order-number">

                        ORDER ID

                        <strong>
                          {
                            selectedOrder.id
                          }
                        </strong>

                      </div>

                      <div className="checkout-line">

                        <span>
                          Status
                        </span>

                        <strong>
                          {
                            selectedOrder.status
                          }
                        </strong>

                      </div>

                      <div className="checkout-line">

                        <span>
                          Date
                        </span>

                        <strong>
                          {new Date(
                            selectedOrder.date
                          ).toLocaleDateString(
                            "en-IN"
                          )}
                        </strong>

                      </div>

                      <div className="checkout-line">

                        <span>
                          Payment
                        </span>

                        <strong>
                          {
                            selectedOrder.paymentMethod
                          }
                        </strong>

                      </div>

                      <h3
                        style={{
                          marginTop:
                            "25px",
                        }}
                      >
                        Customer Details
                      </h3>

                      <p>
                        <strong>
                          Name:
                        </strong>{" "}
                        {
                          selectedOrder
                            .customer
                            .fullName
                        }
                      </p>

                      <p>
                        <strong>
                          Email:
                        </strong>{" "}
                        {
                          selectedOrder
                            .customer
                            .email
                        }
                      </p>

                      <p>
                        <strong>
                          Phone:
                        </strong>{" "}
                        {
                          selectedOrder
                            .customer
                            .phone
                        }
                      </p>

                      <p>
                        <strong>
                          Address:
                        </strong>{" "}
                        {
                          selectedOrder
                            .customer
                            .address
                        }
                      </p>

                      <p>
                        {
                          selectedOrder
                            .customer
                            .city
                        }
                        ,{" "}
                        {
                          selectedOrder
                            .customer
                            .state
                        }{" "}
                        -{" "}
                        {
                          selectedOrder
                            .customer
                            .pincode
                        }
                      </p>

                      <h3
                        style={{
                          marginTop:
                            "25px",
                        }}
                      >
                        Ordered Sarees
                      </h3>

                      {selectedOrder.items.map(
                        (item) => (
                          <div
                            className="checkout-item"
                            key={
                              item.id
                            }
                          >

                            <span>
  {item.name} × {item.quantity || 1}
</span>

<strong>
  ₹
  {(
    item.priceValue *
    (item.quantity || 1)
  ).toLocaleString("en-IN")}
</strong>

                          </div>
                        )
                      )}

                      <div className="checkout-line">

                        <span>
                          Subtotal
                        </span>

                        <strong>
                          ₹
                          {selectedOrder.subtotal.toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>

                      <div className="checkout-line">

                        <span>
                          Delivery
                        </span>

                        <strong>
                          ₹
                          {selectedOrder.delivery.toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>

                      <div className="checkout-final">

                        <span>
                          Total
                        </span>

                        <strong>
                          ₹
                          {selectedOrder.total.toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>

                      <button
                        className="place-order-button"
                        onClick={
                          closeOrderDetails
                        }
                      >
                        CLOSE DETAILS
                      </button>

                    </>
                  ) : (
                    <div className="empty-cart">

                      <h2>
                        Select an order
                      </h2>

                      <p>
                        Click "View Order
                        Details" to see
                        the complete order.
                      </p>

                    </div>
                  )}

                </div>

              </div>
            )}

          </div>

        </section>
      )}

      {/* =========================
          ORDER CONFIRMATION
      ========================= */}

      {orderPlaced && (
        <section className="order-confirmation">

          <div className="order-confirmation-content">

            <span className="success-icon">
              ✓
            </span>

            <p>
              ORDER CONFIRMED
            </p>

            <h1>
              Thank you for choosing Aaradhya.
            </h1>

            <p>
              Your order has been
              successfully placed.
            </p>

            <div className="order-number">

              ORDER ID

              <strong>
                {orderId}
              </strong>

            </div>

            <div className="order-payment-method">

              <span>
                PAYMENT METHOD
              </span>

              <strong>
                {
                  selectedOrder?.paymentMethod ||
                  getPaymentMethodName()
                }
              </strong>

            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent:
                  "center",
                flexWrap:
                  "wrap",
              }}
            >

              <button
                className="explore-button"
                onClick={
                  goHome
                }
              >
                CONTINUE SHOPPING
              </button>

              <button
                className="explore-button"
                onClick={
                  openOrderHistory
                }
              >
                VIEW ORDER HISTORY
              </button>

            </div>

          </div>

        </section>
      )}

    </div>
  );
}

export default App;