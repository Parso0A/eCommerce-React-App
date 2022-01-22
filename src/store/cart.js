import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cart",
  initialState: {
    total: 0,
    items: [],
  },
  reducers: {
    itemAdded: (state, action) => {
      state.items.push({ ...action.payload, count: 1 });
      state.total += parseInt(action.payload.price);
    },
    itemUpdated: (state, action) => {
      const index = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        const countBefore = state.items[index].count;
        state.total -= parseInt(state.items[index].price) * countBefore;
        state.items[index].count = parseInt(action.payload.quantity);
        state.total +=
          parseInt(state.items[index].price) * state.items[index].count;
      }
    },
    itemRemoved: (state, action) => {
      const toRemove = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (toRemove) {
        state.total -= toRemove.price * toRemove.count;

        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
      }
    },
  },
});

const { itemAdded, itemUpdated, itemRemoved } = slice.actions;

export default slice.reducer;

//Selectors
export const selectCartItems = createSelector(
  (state) => state.cart.items,
  (items) => items
);

export const selectTotalQuantity = createSelector(
  (state) => state.cart.total,
  (total) => total
);

//Action Creators
export const addItem = createAction(itemAdded.type, (product) => ({
  payload: { ...product },
}));

export const updateItem = createAction(itemUpdated.type, (id, quantity) => ({
  payload: {
    _id: id,
    quantity: quantity,
  },
}));

export const removeItem = createAction(itemRemoved.type, (id) => ({
  payload: {
    _id: id,
  },
}));
