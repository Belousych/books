
const initialState = {
  books : JSON.parse(localStorage.getItem('books')) || {}
};

export default function userstate(state = initialState) {
  return state;
}
