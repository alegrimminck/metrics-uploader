export function reducer(prevState, action) {
  switch (action.type) {
    case "RESTORE_USER":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        isLoading: false,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
    case "UPDATE_TODAY":
      return {
        ...prevState,
        today: action.today,
      };
    case "UPDATE_FIFO":
      return {
        ...prevState,
        fifo: action.fifo,
      };
  }
}
