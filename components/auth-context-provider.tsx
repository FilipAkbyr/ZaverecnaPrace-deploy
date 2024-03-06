import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { firebase_app } from '../firebase/config';
import { useUserDataLazyQuery } from '../generated/graphql';

enum Role {
  User,
  Admin
}
type MyUser = User & { role?: Role, username?: string };

const auth = getAuth(firebase_app);
type AuthContextType = { user?: MyUser; loading?: boolean };
export const AuthContext = createContext<AuthContextType>({});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = React.useState<MyUser>();
  console.log(user);
  const [getUser, { error, data }] = useUserDataLazyQuery({
    variables: { email: user?.email ?? "" },
    onCompleted: (userData) => {
      console.log(userData);
      setUser({...user, ...userData} as MyUser);
    },
  });
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
        getUser();
      } else {
        setUser(undefined);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [data, getUser]);
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};