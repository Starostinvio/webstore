const initialState = {
  comments: {},
  waiting: false,
};

function reducer(state = initialState, action) {
  console.log("comments/reducer action", action.payload);
  switch (action.type) {
    case "comments/load-start":
      return { ...state, comments: {}, waiting: true };
    case "comments/load":
      return { ...state, comments: action.payload.comments, waiting: false };

    default:
      return state;
  }
}

export default reducer;
