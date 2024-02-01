// import { useEffect, useState } from "react"
// import { getChoreById } from "../../managers/choreManager"
// import { useParams } from "react-router-dom"
// import { getUserProfiles } from "../../managers/userProfileManager"


// export const CreateComments = () => {
//     const [chore, setChore] = useState({})
//     const [users, setUsers] = useState([])
//     const [comments, setComments] = useState("")
//     const [choreComments, setChoreComments] = useState([])

//     const { id } = useParams()

//     useEffect(() => {
//         getChoreById(id).then(array => setChore(array))
//     }, [id])

//     useEffect(() => {
//         getUserProfiles().then(array => setUsers(array))
//     }, [])


// }






// import { useEffect, useState } from "react";
// import { getChoreById } from "../../managers/choreManager";
// import { useParams } from "react-router-dom";
// import { getUserProfiles } from "../../managers/userProfileManager";
// import { Button, Label } from "reactstrap"
// import { createComment, getCommentsByChoreId } from "../../managers/commentManager"

// export const CreateComments = ( {loggedInUser} ) => {
//   const [chore, setChore] = useState({});
//   const [users, setUsers] = useState([]);
//   const [comments, setComments] = useState("");
//   const [choreComments, setChoreComments] = useState([]);

//   const { id } = useParams();

//   useEffect(() => {
//     // getChoreById(id).then((choreData) => setChore(choreData));
//     getCommentsByChoreId(id).then((commentsData) => setChoreComments(commentsData));
//   }, [id]);

//   useEffect(() => {
//     getUserProfiles().then((userData) => setUsers(userData));
//   }, []);

//   const handleCommentSubmit = (event) => {
//     event.preventDefault();
//     // You may need to adjust this based on your actual data structure and API
//     const newComment = {
//       userId: loggedInUser.id, // Replace with actual user ID
//       choreId: id,
//       text: comments,
//     };

//     createComment(newComment).then(() => {
//       // After creating the comment, refresh the comments for the current chore
//       getCommentsByChoreId(id).then((commentsData) => setChoreComments(commentsData));
//       // Clear the input field
//       setComments("");
//     });
//   };

//   return (
//     <div>
//       <h3 className="chores">Create a Comment</h3>
//       <ul>
//         {choreComments.map((comment) => (
//           <li key={comment.id}>
//             <strong>{comment.user.firstName}:</strong> {comment.text}
//           </li>
//         ))}
//       </ul>
//       {/* Form for adding a new comment */}
//       <form onSubmit={handleCommentSubmit}>
//         <Label>
//           Add a Comment:
//           <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
//         </Label>
//         <Button type="submit">Submit Comment</Button>
//       </form>
//     </div>
//   );
// };





// //?chats suggestion
import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { createComment, getCommentsByChoreId } from "../../managers/commentManager";
import "./Chore.css";
import { getChoreById } from "../../managers/choreManager";
import { useNavigate, useParams } from "react-router-dom";

export const CreateComments = ({ choreId, onCommentAdded }) => {
    const [comment, setComment] = useState("");
    const [chore, setChore] = useState({})
    const [errors, setErrors] = useState([]);
    const [selectedComment, setSelectedComment] = useState(null);
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        getChoreById(id).then(array => setChore(array))
        console.log(chore)
    }, [id])


    const handleSubmitBtn = (event) => {
        event.preventDefault();
        console.log("clicked");

        const commentCreated = {
            choreId: id,
            comment: comment
        };

        createComment(chore.id, commentCreated).then((res) => {
                navigate("/chores");   
        });
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <Form onSubmit={handleSubmitBtn}>
            <FormGroup>
                <h2 className="chores">Add A Comment</h2>
                <Input
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={handleCommentChange}
                />
            </FormGroup>
            <Button type="submit" color="secondary">
                Add Comment
            </Button>
        </Form>
    );
};

