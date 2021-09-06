import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createSecret, getSecretByHash } from '../secret/secretSlice';

export interface ErrorMessageState {
    value: string | undefined;
}

const initialState: ErrorMessageState = {
    value: undefined
};

export const errorMessageSlice = createSlice({
    name: 'errorMessage',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getSecretByHash.rejected, (state, action) => {
                state.value = action.error.message;
            })
            .addCase(createSecret.rejected, (state, action) => {
                state.value = action.error.message;
            })
    },
});

export const selectErrorMessage = (state: RootState) => state.errorMessage.value;
export default errorMessageSlice.reducer;