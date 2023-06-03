import { configureStore } from "@reduxjs/toolkit";
import { reducer as theme } from "./theme/theme.slice";

export const store = configureStore({
    reducer: {
        theme,
    },
});
