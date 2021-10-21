import { combineReducers } from "redux";
import cartReducer from "./CartSlice";

const RootReducer = combineReducers({
    cartReducer : cartReducer
})

export default RootReducer