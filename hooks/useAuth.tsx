import React, {
  useState, useContext, createContext, ReactNode, useEffect,
} from 'react';

import { auth, db } from '../config/firebase';
// Provider hook for handling user state

export interface UserSignUp {
  name: string,
  password: string,
  email: string
}

export interface User {
  uid: string,
  email: string,
  name: string | undefined
}

export interface UserSignIn {
  name: string
  email: string,
  password: string
}

type Context = {
  user: User | null,
  signUp: (user: UserSignUp) => any,
  signIn: (user: UserSignIn) => any,
  signOut: () => void,
  sendPasswordResetEmail: (email: string) => any,
};

const initialState: Context = {
  user: null,
  signUp: () => null,
  signIn: () => null,
  signOut: () => null,
  sendPasswordResetEmail: () => null,
};

const authContext = createContext<Context>(initialState);
const { Provider } = authContext;

const useAuthProvider = () => {
  const [user, setUser] = useState<any | null>(null);

  const createUser = (newUser: User) => db
    .collection('users')
    .doc(newUser.uid)
    .set(newUser)
    .then(() => {
      setUser(newUser);
      return newUser;
    });

  const getUserAdditionalData = (userExtraData: any) => db
    .collection('users')
    .doc(userExtraData.uid)
    .get()
    .then((userData) => {
      if (userData.data()) {
        setUser(userData.data());
      }
    });

  const signUp = ({ name, email, password }: UserSignUp) => auth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      auth.currentUser?.sendEmailVerification();
      return createUser({ uid: response.user!.uid, email, name });
    }).catch((error) => ({ error }));

  const signIn = ({ email, password }: UserSignIn) => auth
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      setUser(response.user);
      getUserAdditionalData(response.user);
      return response.user;
    })
    .catch((error) => ({ error }));

  const signOut = () => auth.signOut().then(() => setUser(false));

  // eslint-disable-next-line max-len
  const sendPasswordResetEmail = (email: string) => auth.sendPasswordResetEmail(email).then((response) => response);

  const handleAuthStateChanged = (a: any) => {
    setUser(a);
    if (a) {
      getUserAdditionalData(a);
    }
  };
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsub();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      // Subscribe to user document on mount
      const unsubscribe = db
        .collection('users')
        .doc(user.uid)
        .onSnapshot((doc) => setUser(doc.data()));
      return () => unsubscribe();
    }
    return user;
  }, []);

  return {
    user, signUp, signIn, signOut, sendPasswordResetEmail,
  };
};

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const authHook = useAuthProvider();
  return <Provider value={authHook}>{props.children}</Provider>;
}
export const useAuth = () => useContext(authContext);
