import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    films:[],
    selectOutput:{id:0, name:"Город вылета"},
    selectInput:{id:0,name:"Город прилета"},
    dateOutput:null,
    dateInput:null

};
const airSlice = createSlice({
    name: 'air',
    initialState,
    reducers: {
        selectLoadForm: (state,action)=>{
            state.selectOutput=action.payload.selectOutput;
            state.selectInput=action.payload.selectInput;
            state.dateInput=action.payload.dateInput;
            state.dateOutput=action.payload.dateOutput;
        },



    }
})
    const {actions, reducer} = airSlice;

    export default reducer;


    export const {
        selectLoadForm
    } = actions;