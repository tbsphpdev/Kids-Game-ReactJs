import { post } from "../../Helper/Api"
import { isAuthenticated } from "../../Helper/Util"


export const joinByGameCode = (data) => {
 return post("game/join-game",
JSON.stringify(data),
{
  'Content-Type':'application/json'
}
).then((res) =>{
  return res
  }).catch((err) => {
    console.log("1 ",err.response)
    return err.response.data
  })
}


export const startGame = (data) =>{
  return post("game/start-game",
  JSON.stringify(data),
  {
    'Authorization': isAuthenticated().token,
    'Content-Type':'application/json'
  }
  ).then((res) =>{
    return res
    }).catch((err) => {
      return err.response.data
    })
}

export const getLobbyDetails = (data) =>{
  return post("game/get-lobbydetails",
  JSON.stringify(data),
  {
    'Content-Type':'application/json'
  }
  ).then((res) =>{
    return res
    }).catch((err) => {
      return err
    })
}

export const closeGame = (data) =>{
  return post("game/finish-game",
  JSON.stringify(data),
  {
    'Authorization': isAuthenticated().token,
    'Content-Type':'application/json'
  }
  ).then((res) =>{
    return res
    }).catch((err) => {
      return err.response.data
    })
}



