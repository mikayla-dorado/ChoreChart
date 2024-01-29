import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getChoreById, updateChore } from "../../managers/choreManager"
import { Button, Form, FormGroup, Input, Label } from "reactstrap";


export const EditChore = () => {
    const [chores, setChores] = useState()

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getChoreById(id).then(array => setChores(array))
        console.log(chores)
    }, [id])


    const handleUpdateBtn = (event) => {
        event.preventDefault()

        const choreUpdate = {
            id: chores?.id,
            name: chores?.name,
            description: chores?.description,
            dueDate: chores?.dueDate,
            status: chores?.status
        }
        updateChore(choreUpdate).then(() => navigate("/chores"))
    }

    return (
        <>
            <h2>Edit Chore</h2>
            <Form>
                <FormGroup>
                    <Label>Name:</Label>
                    <Input
                        type="text"
                        name="name"
                        value={chores?.name}
                        onChange={(event) => {
                            setChores(prevChore => ({
                                ...prevChore,
                                [event.target.name]: event.target.value
                            }))
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Desciption:</Label>
                    <Input
                    type="text"
                    name="description"
                    value={chores?.description}
                    onChange={(event) => {
                        setChores(prevChore => ({
                            ...prevChore,
                            [event.target.name]: event.target.value
                        }))
                    }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Due Date:</Label>
                    <Input
                    type="datetime-local"
                    name="dueDate"
                    value={chores?.dueDate}
                    onChange={(event) => {
                        setChores(prevChore => ({
                            ...prevChore,
                            [event.target.name]: event.target.value
                        }))
                    }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Status:</Label>
                    <Input
                    type="text"
                    name="status"
                    value={chores?.status}
                    onChange={(event) => {
                        setChores(prevChore => ({
                            ...prevChore,
                            [event.target.name]: event.target.value
                        }))
                    }}
                    />
                </FormGroup>
            </Form>
            <div className="submit-btn-container">
        <Button type="submit" color="success" onClick={e => handleUpdateBtn(e)}>Submit Edit</Button>
      </div>
        </>
    )

}