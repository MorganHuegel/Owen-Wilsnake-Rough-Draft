import { SERVER_BASE_URL } from './config'
import DeviceInfo from 'react-native-device-info';


export function fetchLogin (username, password, phoneId=null) {
  if (!username) {
    phoneId = DeviceInfo.getUniqueID()
  }
  return fetch(`${SERVER_BASE_URL}/users/login`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username, 
      password,
      phoneId
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