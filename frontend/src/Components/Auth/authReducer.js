const initialState = {
  userimage: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "userfound":
      return {
        ...state,
        userimage: action.payload,
      };
    case "removeuser":
      return { ...state, userimage: null };
    default:
      return state;
  }
}
