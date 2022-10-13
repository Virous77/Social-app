const reducer = (state, action) => {
  if (action.type === "SET-USER") {
    return {
      ...state,
      user: action.payload,
    };
  }
};

export default reducer;
