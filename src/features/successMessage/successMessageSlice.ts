import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createSecret, getSecretByHash } from '../secret/secretSlice';

export interface SuccessMessageState {
    value: string | undefined;
}

const initialState: SuccessMessageState = {
    value: undefined
};

export const successMessageSlice = createSlice({
    name: 'successMessage',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(createSecret.fulfilled, (state) => {
                state.value = "Secret was created successfully";
            })
    },
});

export const selectSuccessMessage = (state: RootState) => state.successMessage.value;
export default successMessageSlice.reducer;