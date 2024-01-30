const _apiUrl = "/api/chore"

export const getChores = () => {
    return fetch(_apiUrl).then((res) => res.json())
}

export const getChoreById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then(res => res.json())
}

export const getUserChores = () => {
  return fetch(_apiUrl).then((res) => res.json())
}

export const getUserChoresById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then(res => res.json())
}

export const deleteChore = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
      method: "DELETE"
    })
  }

  export const createChore = (choreObj, userProfileId, roomId) => {
    return fetch(`${_apiUrl}/${userProfileId}/${roomId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(choreObj),
    })
  }

  export const updateChore = (chore, userProfileId, roomId) => {
    return fetch(`${_apiUrl}/${chore.id}/${userProfileId}/${roomId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chore)
    })
  }