export const signInAction = (uid) => ({
  type: 'SIGN_IN',
  payload: uid,
});

export const signOutAction = () => ({
  type: 'SIGN_OUT',
});
