import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiError, getSecretDetails } from "../../app/apiCalls";
import { RootState } from "../../app/store";
import { LoadingStatus, SecretType } from "../../common/types";

export interface SecretState {
    item: SecretType | null,
    status: LoadingStatus
}

const initialState: SecretState = {
    item: null,
    status: LoadingStatus.Idle
}

export const getSecretByHash = createAsyncThunk(
    'secret/getData',
    async (hash: string) => {
        const response = await getSecretDetails(hash);

        if (response === apiError) {
            throw new Error("Cannot fetch Secret details!");
        }

        if (response === undefined) {
            throw new Error("Secret doesn't exist!");
        }
        return response;
    }
)

export const secretDetailsSlice = createSlice({
    name: 'secretData',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getSecretByHash.pending, (state) => {
                state.status = LoadingStatus.Loading
            })
            .addCase(getSecretByHash.fulfilled, (state, action) => {
                state.status = LoadingStatus.Idle
                state.item = action.payload.data.secretByHash
            })
            .addCase(getSecretByHash.rejected, (state) => {
                state.status = LoadingStatus.Failed
                state.item = null;
            });
    },
});

export const selectSecret = (state: RootState) => state.secret.item;
export const selectStatus = (state: RootState) => state.secret.status;
export default secretDetailsSlice.reducer;