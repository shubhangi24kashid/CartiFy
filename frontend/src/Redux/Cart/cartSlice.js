import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalItemsPrice: 0,
  totalItems: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const item = action.payload;
      console.log("Adding item:", item);

      // ✅ Use "ID" instead of "id"
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.ID === item.ID
      );

      if (existingItem) {
        // Increase quantity
        existingItem.quantity += 1;
      } else {
        // Add new unique item
        state.cartItems.push({ ...item, quantity: 1 });
      }

      // ✅ Recalculate totals
      state.totalQuantity = state.cartItems.reduce(
        (sum, cartItem) => sum + cartItem.quantity,
        0
      );

      state.totalItems = state.cartItems.length; // unique items
      state.totalItemsPrice = state.cartItems.reduce(
        (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
        0
      );
    },
    updateItemQuantity : (state,action)=>{
            let index = action.payload.key;

            if(action.payload.operator==="+"){
                ++state.cartItems[index].quantity;
                state.totalItemsPrice = state.totalItemsPrice + action.payload.item.price
                ++state.totalQuantity;
            }else{
                if(state.cartItems[index].quantity>1){
                    --state.cartItems[index].quantity;
                    state.totalItemsPrice = state.totalItemsPrice - action.payload.item.price
                    --state.totalQuantity;
                }
            }
        },
       deleteCartItem: (state, action) => {
      const id = action.payload.id;

      state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== id);

      // ✅ Recalculate totals after removal
      state.totalQuantity = state.cartItems.reduce(
        (sum, cartItem) => sum + cartItem.quantity,
        0
      );
      state.totalItems = state.cartItems.length;
      state.totalItemsPrice = state.cartItems.reduce(
        (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
        0
      );
    },
  },
});

export const { addCartItem,updateItemQuantity,deleteCartItem } = cartSlice.actions;
export default cartSlice.reducer;
