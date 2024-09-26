import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
//@ts-ignore
import { decentralized_backend } from 'declarations/decentralized_backend';

interface CurrentUser {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  principal: string | null;
  currentUser: CurrentUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  principal: null,
  currentUser: null,
  status: "idle",
  error: null,
};

export const signIn = createAsyncThunk<
  { principal: string; currentUserData: CurrentUser },
  void,
  { rejectValue: string }
>("auth/signIn", async (_, { dispatch, rejectWithValue }) => {
  try {
    const authClient = await AuthClient.create();
    const internetIdentityUrl =
      process.env.NODE_ENV === "production"
        ? undefined
        : `http://localhost:4943/?canisterId=${process.env.CANISTER_ID}`;

    await new Promise((resolve) => {
      authClient.login({
        identityProvider: internetIdentityUrl,
        onSuccess: () => resolve(undefined),
      });
    });

    const identity = authClient.getIdentity();
    const principal = identity.getPrincipal().toText();

    dispatch(setPrincipal(principal));

    //@ts-ignore
    const agent = new HttpAgent({ identity });
    //@ts-ignore
    const actor = Actor.createActor(decentralized_backend, { agent });

    const currentUserData: CurrentUser = await decentralized_backend.getCurrentUser(principal);

    dispatch(setCurrentUser(currentUserData));

    return { principal, currentUserData };
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to sign in");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPrincipal: (state, action: PayloadAction<string>) => {
      state.principal = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload;
    },
    signOut: (state) => {
      state.isLoggedIn = false;
      state.principal = null;
      state.currentUser = null;
      decentralized_backend.setActor(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<{ principal: string; currentUserData: CurrentUser }>) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.principal = action.payload.principal;
        state.currentUser = action.payload.currentUserData;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to sign in";
      });
  },
});

export const { setPrincipal, setCurrentUser, signOut } = authSlice.actions;

export default authSlice.reducer;
