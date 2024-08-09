import { createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
import { auth, db } from '../../firebase/Config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  cartTotalPrice: 0,
  previousUserId: null, 
  cartDiscount:0,
  priceDiscount: 0,
  isPromoValid: false,
  promoCode: '',
  shippingAddress : {
    recipietient : "",
    address1 : "",
    address2: "",
    city : "",
    state : "",
    postal : "",
    country :"",
    phone: "",
   }
};


const calculateDiscount = (totalPrice, isPromoValid) => {
    if (isPromoValid) {
      return totalPrice * 0.10; // خصم 10%
    }
    return 0;
  };

//   const saveCartToFirestore = async (cartItems, cartTotalPrice, shippingInfo) => {
//     const user = auth.currentUser;
//     if (!user) return;
  
//     const cartRef = doc(db, "carts", user.uid);
//     await setDoc(cartRef, {
//         cartItems,
//         cartTotalPrice,
//         shippingInfo
//     }, { merge: true });
// };


const saveCartToFirestore = async (cartItems, cartTotalPrice, shipping) => {
    const user = auth.currentUser;
    if (!user) return;
  
    // حساب السعر الأساسي بعد الخصم
    const priceAfterDiscount = cartTotalPrice;
  
    const cartRef = doc(db, "carts", user.uid);
    await setDoc(cartRef, { cartItems, cartTotalPrice: priceAfterDiscount , shipping  }, { merge: true });
  };


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      ADD_TO_CART(state, action) {
      
        const user = auth.currentUser;
        if (!user) return;

        const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
        if (productIndex >= 0) {
       const quantity =    state.cartItems[productIndex].cartTotalQuantity += 1;
        const totalAmount =  state.cartItems[productIndex].cartTotalAmount =  quantity * action.payload.price
      
        
        
          toast.success(`${action.payload.name} increased by one` , {position : "top-left"});
        } else {
          const tempProduct = { ...action.payload, cartTotalQuantity: 1 , cartTotalAmount :  action.payload.price * action.payload.cartTotalQuantity ? action.payload.price * action.payload.cartTotalQuantity : action.payload.price };
          state.cartItems.push(tempProduct);
          toast.success(`${action.payload.name} added to cart` , {position : "top-left"});
        }
         
        state.cartTotalPrice = state.cartItems.reduce((total, item) => total + item.cartTotalAmount, 0);
       

         // تحديث `priceDiscount`
         state.cartDiscount = calculateDiscount(state.cartTotalPrice, state.isPromoValid);
         state.priceDiscount = state.cartTotalPrice - state.cartDiscount;

        // Save to local storage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  
        // Save to Firestore
        const cartRef = doc(db, "carts", user.uid);
        // setDoc(cartRef, { cartItems: state.cartItems }, { merge: true });
        saveCartToFirestore(state.cartItems, state.priceDiscount , state.shippingAddress);
      },
     
      // Load cart items from Firestore
      LOAD_CART_FROM_FIRESTORE(state, action) {
        state.cartItems = action.payload.cartItems;
        state.previousUserId = action.payload.userId;
  
        state.cartTotalPrice = action.payload.cartTotalPrice || state.cartItems.reduce((total, item) => total + item.cartTotalAmount, 0);
        state.cartDiscount = calculateDiscount(state.cartTotalPrice, state.isPromoValid);
        state.priceDiscount = state.cartTotalPrice - state.cartDiscount;
        state.shippingAddress = action.payload.shippingAddress || initialState.shippingAddress;
        saveCartToFirestore(state.cartItems, state.priceDiscount, state.shippingAddress);
      },
      ADD_SHIPPING(state, action) {
        state.shippingAddress = action.payload;
  
        // Save to Firestore
        const user = auth.currentUser;
        if (user) {
          saveCartToFirestore(state.cartItems, state.priceDiscount, state.shippingAddress);
        }
      },
      DELETE_FROM_CART(state,action) {
        const user = auth.currentUser;
      if (!user) return;

      const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
      state.cartItems = updatedCartItems;

      state.cartTotalPrice = state.cartItems.reduce((total, item) => total + item.cartTotalAmount, 0);
      state.priceDiscount = state.cartTotalPrice - state.cartDiscount;
      state.cartDiscount = calculateDiscount(state.cartTotalPrice, state.isPromoValid);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      saveCartToFirestore(state.cartItems, state.priceDiscount, state.shippingAddress);

    //   const cartRef = doc(db, "carts", user.uid);
    //   setDoc(cartRef, { cartItems: state.cartItems }, { merge: true });

      toast.success(`${action.payload.name} removed from cart`, {position : "top-left"});
      },
      DECREASE_QUANTITY(state, action) {
        const user = auth.currentUser;
        if (!user) return;
  
        const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
        if (productIndex >= 0) {
          if (state.cartItems[productIndex].cartTotalQuantity > 1) {
            const quantity = state.cartItems[productIndex].cartTotalQuantity -= 1;
            const totalAmount = state.cartItems[productIndex].cartTotalAmount = quantity * action.payload.price;
            toast.success(`${action.payload.name} quantity decreased by one`, {position : "top-left"});
            
            state.cartTotalPrice = state.cartItems.reduce((total, item) => total + item.cartTotalAmount, 0);
       

         // تحديث `priceDiscount`
         state.cartDiscount = calculateDiscount(state.cartTotalPrice, state.isPromoValid);
         state.priceDiscount = state.cartTotalPrice - state.cartDiscount;

            
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            
            const cartRef = doc(db, "carts", user.uid);
            setDoc(cartRef, { cartItems: state.cartItems }, { merge: true });
          } else {
            // If quantity is 1, removing the item from the cart
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
  
            state.cartTotalPrice = state.cartItems.reduce((total, item) => total + item.cartTotalAmount, 0);
            state.priceDiscount = state.cartDiscount > 0 ? state.cartTotalPrice - state.cartDiscount : state.cartTotalPrice;
  
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  
            // const cartRef = doc(db, "carts", user.uid);
            // setDoc(cartRef, { cartItems: state.cartItems }, { merge: true });
            saveCartToFirestore(state.cartItems, state.priceDiscount, state.shippingAddress);
  
            toast.success(`${action.payload.name} removed from cart` , {position : "top-left"});
          }
        }
      },
      APPLY_PROMO_CODE(state, action) {
        state.promoCode = action.payload;
        state.isPromoValid = state.promoCode === 'FREEGHAZA';
        state.cartDiscount = calculateDiscount(state.cartTotalPrice, state.isPromoValid);
        state.priceDiscount = state.cartTotalPrice - state.cartDiscount;
  
        saveCartToFirestore(state.cartItems, state.priceDiscount, state.shippingAddress); // حفظ السعر بعد الخصم في قاعدة البيانات
      },
      DELETE_ALL(state, action) {
        // مسح جميع العناصر من السلة
        state.cartItems = [];
        state.cartTotalPrice = 0;
        state.cartDiscount = 0;
        state.priceDiscount = 0;
      
        // حفظ التحديثات في الـ localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      
        // حفظ التحديثات في Firestore
        const user = auth.currentUser;
        if (user) {
          saveCartToFirestore(state.cartItems, state.priceDiscount, state.shippingAddress);
        }
      },
      CALCULATE_SUBTOTAL(state, action) {
        const array = [];
        state.cartItems.map((item) => {
          const { price, cartQuantity } = item;
          const cartItemAmount = price * cartQuantity;
          return array.push(cartItemAmount);
        });
        const totalAmount = array.reduce((a, b) => {
          return a + b;
        }, 0);
        state.cartTotalAmount = totalAmount;
      },
      CALCULATE_TOTAL_QUANTITY(state, action) {
        const array = [];
        state.cartItems.map((item) => {
          const { cartQuantity } = item;
          const quantity = cartQuantity;
          return array.push(quantity);
        });
        const totalQuantity = array.reduce((a, b) => {
          return a + b;
        }, 0);
        state.cartTotalQuantity = totalQuantity;
      },
    },
  });
  
  export const {CALCULATE_SUBTOTAL , CALCULATE_TOTAL_QUANTITY, DELETE_ALL , ADD_TO_CART, LOAD_CART_FROM_FIRESTORE , ADD_SHIPPING , DELETE_FROM_CART , DECREASE_QUANTITY , APPLY_PROMO_CODE } = cartSlice.actions;
  
  export const selectCartItems = (state) => state.cart.cartItems;
  export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
  export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
  export const selectCartTotalPrice = (state) => state.cart.cartTotalPrice;
  export const selectCartDiscount= (state) => state.cart.cartDiscount;
  export const selectPriceDiscount= (state) => state.cart.priceDiscount;
  export const selectShipping= (state) => state.cart.shippingAddress
 
  export const selectPreviousUserId = (state) => state.cart.previousUserId;
  
  export const loadCartFromFirestore = () => async (dispatch, getState) => {
    const user = auth.currentUser;
    if (!user) return;
  
    const previousUserId = selectPreviousUserId(getState());
  
    // تحميل سلة جديدة إذا كان المستخدم الحالي مختلفًا عن المستخدم السابق
    if (user.uid !== previousUserId) {
      const cartRef = doc(db, "carts", user.uid);
      const cartDoc = await getDoc(cartRef);
      if (cartDoc.exists()) {
        const data = cartDoc.data();
        dispatch(LOAD_CART_FROM_FIRESTORE({
          cartItems: data.cartItems || [],
          userId: user.uid,
          cartTotalPrice: data.cartTotalPrice || 0,
          cartDiscount: data.cartDiscount || 0,
          priceDiscount: data.priceDiscount || 0,
          shippingAddress: data.shippingAddress || initialState.shippingAddress
        }));
      } else {
        // إنشاء سلة جديدة إذا لم تكن موجودة
        dispatch(LOAD_CART_FROM_FIRESTORE({ cartItems: [], userId: user.uid }));
      }
    }
  };
  
  export default cartSlice.reducer;
  
