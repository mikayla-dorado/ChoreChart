const _apiUrl = "/api/room"

export const getRooms = () => {
    return fetch(_apiUrl).then((res) => res.json())
}

export const getRoomsById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then(res => res.json())
}