const _apiUrl = "/api/userprofile"

export const getUserProfiles = () => {
    return fetch(_apiUrl).then((res) => res.json())
}

export const getUserProfileById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then(res => res.json())
}

export const deleteUser = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE"
    })
}

export const createUser = (userObj) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
    }).then(res => res.json())
}