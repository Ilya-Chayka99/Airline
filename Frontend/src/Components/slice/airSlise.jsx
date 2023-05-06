import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    films:[],
    op:false

};
const airSlice = createSlice({
    name: 'air',
    initialState,
    reducers: {
        filmLoadComments: (state,action)=>{

        }

    }
})
    const {actions, reducer} = airSlice;

    export default reducer;


    export const {
        filmLoadComments
    } = actions;