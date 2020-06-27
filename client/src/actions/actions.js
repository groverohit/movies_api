export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const SET_USERNAME = "SET_USERNAME";
// export const SET_PASSWORD = "SET_PASSWORD";
// export const SET_EMAIL = "SET_EMAIL";
// export const SET_DOB = "SET_DOB";

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUsername(value) {
  return { type: SET_USERNAME, value };
}

// export function setPassword(value) {
//   return { type: SET_PASSWORD, value };
// }

// export function setEmail(value) {
//   return { type: SET_EMAIL, value };
// }

// export function setDob(value) {
//   return { type: SET_DOB, value };
// }

// export function setFavoritemvovies(value) {
//   return { type: SET_FAV, value };
// }
