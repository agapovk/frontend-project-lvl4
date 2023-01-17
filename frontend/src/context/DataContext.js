import {
  createContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState(undefined);
  const [signupError, setSignupError] = useState(undefined);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [editChannel, setEditChannel] = useState({});

  const setUserToLocalStorage = (u) => {
    localStorage.setItem('user', JSON.stringify(u));
  };

  const getUserFromLocalStorgae = () => JSON.parse(localStorage.getItem('user'));

  // useMemo
  const value = useMemo(
    () => ({
      user,
      setUser,
      authError,
      setAuthError,
      signupError,
      setSignupError,
      showAddModal,
      setShowAddModal,
      showDeleteModal,
      setShowDeleteModal,
      editChannel,
      setEditChannel,
      showRenameModal,
      setShowRenameModal,
    }),
    [
      authError,
      editChannel,
      showAddModal,
      showDeleteModal,
      showRenameModal,
      signupError,
      user,
    ],
  );

  // Check local storage, and get user
  useEffect(() => {
    const localUser = getUserFromLocalStorgae();
    if (localUser !== null) setUser(localUser);
  }, []);

  // Set user to local storage
  useEffect(() => {
    if (Object.keys(user).length) setUserToLocalStorage(user);
  }, [user]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext;
