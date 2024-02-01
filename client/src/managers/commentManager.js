const _apiUrl = "/api/comment"

export const createComment = (choreId, commentObj) => {
    return fetch(`${_apiUrl}/${choreId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentObj)
    })
}

export  const getCommentsByChoreId = (id) => {
    return fetch(_apiUrl).then(res => res.json())
}