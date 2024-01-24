import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getChores } from "../../managers/choreManager"
import { Table } from "reactstrap"

export const ChoreList = () => {
    const [chores, setChores] = useState([])

    const navigate = useNavigate()

    const getAndSetChores = () => {
        getChores().then(array => setChores(array))
    }

    useEffect(() => {
        getAndSetChores()
    }, [])

    return (
        <div>
            <h2>Chores</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {chores.map((c) => {
                        return (
                            <tr key={c.id}>
                                <td scope="row">{`${c.id}`}</td>
                                <td>{c?.name}</td>
                                <td>{c?.description}</td>
                                <td>{c?.dueDate.slice(0,10)}</td>
                                <td>{c?.status}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}