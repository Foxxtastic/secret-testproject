import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiError, createSecretFetch, getSecretDetails } from "../../app/apiCalls";
import { RootState } from "../../app/store";
import { SecretInputType } from "../../app/types";
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

export const createSecret = createAsyncThunk(
    'secret/createData',
    async (secret: SecretInputType) => {
        const response = await createSecretFetch(secret);

        if (response === apiError) {
            throw new Error("Secret can't be created!");
        }
        return response;
    }
)

export const secretSlice = createSlice({
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
            })
            .addCase(createSecret.pending, (state) => {
                state.status = LoadingStatus.Loading
            })
            .addCase(createSecret.fulfilled, (state, action) => {
                state.status = LoadingStatus.Idle
                state.item = action.payload.data.create_secret
            })
            .addCase(createSecret.rejected, (state) => {
                state.status = LoadingStatus.Failed
            })
    },
});

export const selectSecret = (state: RootState) => state.secret.item;
export const selectStatus = (state: RootState) => state.secret.status;
export default secretSlice.reducer;