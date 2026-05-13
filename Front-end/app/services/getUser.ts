import { api } from "../../lib/api"

export async function GetUser(){
  try {
    const response = await api('/users/me', {
      method: 'GET',
    })
    
    return response
    
  } catch (error) {
    console.log("Error retrieving user data.", error)
    return error
  }

}