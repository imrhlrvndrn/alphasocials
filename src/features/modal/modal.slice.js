import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isActive: false,
    state: {},
    modal: null, // React component to be rendered
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        closeModal: (state) => {
            state.isActive = false;
            state.state = {};
            state.modal = null;
        },
        openModal: (state, action) => {
            state.isActive = true;
            state.state = action.payload.state || {};
            state.modal = action.payload.modal;
        },
    },
});

export const { closeModal, openModal } = modalSlice.actions;

export const selectModal = (state) => state.modal;

export default modalSlice.reducer;
