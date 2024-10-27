import { createSlice } from "@reduxjs/toolkit";

interface TProduct {
    _id: string;
    title: string;
    description: string;
    stock: number;
    price: number;
    quantity: number;
    rating: [];
    imageUrl: string;
    category: TCategory;
    createdAt: string;
    updatedAt: string;
    __v: number;
    purchaseQuantity?: number;
}

interface TCategory {
    _id: string;
    name: string;
    image: string;
    __v: number;
}

export interface TCartInitialState {
    products: TProduct[];
    subtotal: number;
    tax: number;
    shippingCost: number;
    total: number;
}

const initialState: TCartInitialState = {
    products: [],
    subtotal: 0,
    tax: 0,
    shippingCost: 0,
    total: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: <T extends TProduct>(state: TCartInitialState, action: { payload: T }) => {
            const isProductExists = state?.products?.find((product) => product?._id === action?.payload?._id);
            if (!isProductExists) {
                state.products.push({ ...action.payload, purchaseQuantity: 1 });
            } else {
                isProductExists.purchaseQuantity! += 1
            }
        },
        removeAProduct: (state, action) => {
            state.products = state.products.filter((product) => product?._id !== action.payload)
        },
        updateQuantity: (state, action) => {
            state.products.map(product => {
                if (product._id === action.payload.id) {
                    if (action.payload.type === "increment") {
                        product.purchaseQuantity! += 1
                    } else if (action.payload.type === "decrement") {
                        product.purchaseQuantity! -= 1
                    }
                }
                return product;
            });
        },
        clearCart: (state) => {
            state.products = [];
            state.subtotal = 0;
            state.tax = 0;
            state.shippingCost = 0;
            state.total = 0;
        }
    }
});


export const { addCart, clearCart, updateQuantity, removeAProduct } = cartSlice.actions;

export default cartSlice.reducer;