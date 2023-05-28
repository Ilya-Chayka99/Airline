import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    selectOutput: {id: 0, name: "Город вылета"},
    selectInput: {id: 0, name: "Город прилета"},
    dateOutput: null,
    dateInput: null,
    byTicket: null,
    formByInfo: null,
    auth:false,
    phone:'',
    count:0,
    numberTicket:null

};
const airSlice = createSlice({
    name: 'air',
    initialState,
    reducers: {
        selectLoadForm: (state, action) => {
            state.selectOutput = action.payload.selectOutput;
            state.selectInput = action.payload.selectInput;
            state.dateInput = action.payload.dateInput;
            state.dateOutput = action.payload.dateOutput;
        },
        selectByTicket: (state, action) => {
            state.byTicket = action.payload;
        },
        selectFormByInfo: (state, action) => {
            state.formByInfo = action.payload;
        },
        selectAuth: (state, action) => {
            state.auth = action.payload;
        },
        selectPhone: (state, action) => {
            state.phone = action.payload;
        },
        selectCount:(state, action) => {
            state.count = state.count +1;
        },
        selectNumberTicket:(state, action) => {
            state.numberTicket = action.payload;
        }


    }
})
const {actions, reducer} = airSlice;

export default reducer;


export const {
    selectLoadForm,
    selectByTicket,
    selectFormByInfo,
    selectAuth,
    selectPhone,
    selectCount,
    selectNumberTicket
} = actions;