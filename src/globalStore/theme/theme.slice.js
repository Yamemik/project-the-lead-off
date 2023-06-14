import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice(
    {
        name: "theme",
        initialState: localStorage.getItem("theme"),
        reducers: {
            // state - текущее значение, payload - принимаемое значение
            changeTheme: (state, { payload: newTheme }) => {
                return (state = newTheme);
            },
        },
    },
);

export const { actions, reducer } = themeSlice;
