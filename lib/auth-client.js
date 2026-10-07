import { createAuthClient } from "better-auth/react";

// no baseURL here, the client uses the url it is running on
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;
