const _apiUrl = "/api/room"

export const getRooms = () => {
    return fetch(_apiUrl).then((res) => res.json())
}