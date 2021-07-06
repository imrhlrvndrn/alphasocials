import { createSlice } from '@reduxjs/toolkit';

const lightTheme = {
    light_background: '#ffffff',
    dark_background: '#f5f5f5',
    color: '#222222',
    constants: {
        light: '#ffffff',
        dark: '#222222',
        icon: '#222222',
        primary: '#F8D410',
        red: '#e73a23',
        shadow: 'rgba(149, 157, 165, 0.2) 0px 8px 20px',
    },
};

const darkTheme = {
    light_background: '#181818',
    dark_background: '#111111',
    color: '#ffffff',
    constants: {
        light: '#ffffff',
        dark: '#111111',
        icon: '#ffffff',
        primary: '#F8D410',
        red: '#e73a23',
        shadow: 'rgba(0, 0, 0, 0.2) 0px 8px 20px',
    },
};

const initialState = {
    theme: lightTheme,
    status: 'light',
};

const isLightTheme = (status) => status === 'light';

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        enableDarkMode: (state) => {
            state.status = 'dark';
            state.theme = darkTheme;
        },
        disableDarkMode: (state) => {
            state.status = 'light';
            state.theme = lightTheme;
        },
    },
});

export const { enableDarkMode, disableDarkMode } = themeSlice.actions;

export const selectTheme = (state) => state.theme.theme;
export const selectThemeStatus = (state) => state.theme.status;

export default themeSlice.reducer;
