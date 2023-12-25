const initialState = {
  comments: {},
  waiting: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, comments: {}, waiting: true };
    case "comments/load":
      return { ...state, comments: action.payload.comments, waiting: false };
    case "addComment":
      return {
        ...state,
        comments: {
          count: state.comments.count + 1,
          items: [...state.comments.items, action.payload],
        },
      };

    default:
      return state;
  }
}

export default reducer;
