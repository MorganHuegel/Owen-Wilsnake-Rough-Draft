import { SERVER_BASE_URL } from './config'

export function fetchLogin (username, password) {
  return fetch(`${SERVER_BASE_URL}/users/login`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username, 
      password
    })
  })
  .then(res => res.json())
  .then(response => {
    if (response.webToken) {
      return Promise.resolve(response.webToken)
    } else if (response.error) {
      return Promise.reject(response.error)
    } else {
      return Promise.reject('An error occurred :(')
    }
  })
  .catch(error => {
    return Promise.reject(error)
  })
}