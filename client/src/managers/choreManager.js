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