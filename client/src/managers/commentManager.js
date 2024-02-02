const _apiUrl = "/api/chore/comment"

export const createComment = (choreId, chore) => {
    return fetch(`${_apiUrl}/${choreId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(chore)
    })
}

export const getCommentsByChoreId = (id) => {
    return fetch(`${_apiUrl}/${id}`).then(res => res.json())
}