// Fetch function to handle API requests
const myFetch = (url, method, body = null, token = null) => {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });
}

exports = {
  myFetch,
}