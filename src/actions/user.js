export const signInAction = (uid, role) => ({
  type: 'SIGN_IN',
  payload: { uid, role },
});

export const signOutAction = () => ({
  type: 'SIGN_OUT',
});
