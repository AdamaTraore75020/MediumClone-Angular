import { Action, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.interface";
import { registerAction, registerFailedAction, registerSuccessAction } from "./actions/register.actions";

const initialState: AuthStateInterface = {
    isSubmitting: false, 
    currentUser: null,
    isLoggedIn: null,
    validationErrors: null
}

const authReducer = createReducer(
    initialState,
    on(registerAction, (state: AuthStateInterface) => (
        {
            ...state,
            isSubmitting: true,
            validationErrors: null
        })
    ),
    on(registerSuccessAction, (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        isLoggedIn: true,
        currentUser: action.currentUser
    })),
    on(registerFailedAction, (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors
    }))
);

export function reducers(state: AuthStateInterface | undefined, action: Action) {
    return authReducer(state, action);
}