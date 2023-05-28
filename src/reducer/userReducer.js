const initialState = '';

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return action.payload;
    case 'SIGN_OUT':
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
