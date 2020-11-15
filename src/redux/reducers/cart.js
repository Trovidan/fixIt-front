import * as ActionTypes from '../actionTypes.js';
const initialCart = {
    amount: 0,
    items: []
}
export const cart = (state =  initialCart,action)=>{
    let newAmount, newItems;
    switch(action.type){
        case ActionTypes.LOGIN_TERMINATE:
            return initialCart;

        case ActionTypes.CART_ADD:
            newAmount = state.amount + action.payload.amount;
            newItems = state.items.concat(action.payload.productID);
            return {amount: newAmount, items: newItems};

        case ActionTypes.CART_REMOVE:
            newAmount = state.amount - action.payload.amount;
            newItems = state.items;
            newItems.splice(action.payload.productIndex,1);
            return { amount: newAmount, items: newItems };

        default:
            return state;
    }
}