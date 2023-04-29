import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    films:[]

};
const airSlice = createSlice({
    name: 'films',
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