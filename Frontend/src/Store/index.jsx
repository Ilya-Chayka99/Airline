import {configureStore} from "@reduxjs/toolkit";
import air from "../Components/slice/airSlise.jsx"

const stringMiddleware = () => (next) => (action) =>{
    if(typeof action ==='string'){
        return next({
            type:action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: {air},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;