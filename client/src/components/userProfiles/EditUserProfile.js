import { useEffect, useState } from "react"
import { getUserProfileById, updateUser } from "../../managers/userProfileManager"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./User.css"


export const EditUserProfile = () => {
    const [UserProfile, setUserProfile] = useState({})

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getUserProfileById(id).then((array) => setUserProfile(array))
        console.log(UserProfile)
    }, [id])

    const handleUpdateBtn = (event) => {
        event.preventDefault()

        const userUpdate = {
            id: UserProfile.id,
            firstName: UserProfile.firstName,
            lastName: UserProfile.lastName,
            email: UserProfile.email,
            address: UserProfile.address
        }
        updateUser(userUpdate).then(() => navigate("/userprofiles"))
    }

    return (
        <>
            <h2>Edit User</h2>
            <Form className="form">
                <FormGroup>
                    <Label>First Name:</Label>
                    <Input
                        type="text"
                        name="firstName"
                        value={UserProfile?.firstName}
                        onChange={(event) => {
                            setUserProfile(prevUserProfile => ({
                                ...prevUserProfile,
                                [event.target.name]: event.target.value
                            }))
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Last Name:</Label>
                    <Input
                        type="text"
                        name="lastName"
                        value={UserProfile?.lastName}
                        onChange={(event) => {
                            setUserProfile(prevUserProfile => ({
                                ...prevUserProfile,
                                [event.target.name]: event.target.value
                            }))
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Email:</Label>
                    <Input
                        type="text"
                        name="email"
                        value={UserProfile?.email}
                        onChange={(event) => {
                            setUserProfile(prevUserProfile => ({
                                ...prevUserProfile,
                                [event.target.name]: event.target.value
                            }))
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Address:</Label>
                    <Input
                        type="text"
                        name="address"
                        value={UserProfile?.address}
                        onChange={(event) => {
                            setUserProfile(prevUserProfile => ({
                                ...prevUserProfile,
                                [event.target.name]: event.target.value
                            }))
                        }}
                    />
                </FormGroup>
                <div className="submit-btn-container">
                    <Button type="submit" color="success" onClick={e => handleUpdateBtn(e)}>Submit Edit</Button>
                </div>
            </Form>
        </>
    )
}