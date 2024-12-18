import { atom } from 'jotai';

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const userAtom = atom(getUserFromLocalStorage());