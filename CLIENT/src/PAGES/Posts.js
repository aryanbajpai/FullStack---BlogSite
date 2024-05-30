import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../Helpers/AuthContext';

export const Posts = () => {

    let { id } = useParams();
    const [postObj, setPostObj] = useState({});
    const [comments, setComments] = useState([]);
    const [newComm, setNewComm] = useState("");

    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3003/post/byId/${id}`).then((response) => {
            setPostObj(response.data)
        });

        axios.get(`http://localhost:3003/comments/${id}`).then((response) => {
            setComments(response.data)
        });
    }, [id]);

    const addComment = () => {

        //Pass HEADER here for MIddleware
        axios.post("http://localhost:3003/comments",
            {
                commentBody: newComm, PostId: id
            },
            {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                }, //Pass the Token from session strg
            }
        ).then((response) => {
            if (response.data.error) {
                console.log("ERROR FROM SERVER: ", response.data.error)
            } else {
                const comToAdd = { commentBody: newComm, username: response.data.username };
                setComments([...comments, comToAdd]);
                setNewComm("");
            }
            console.log("Comment Added")
        }).catch((error) => {
            console.error("Axios request failed:", error);
        });
    };

    const deleteComment = (id) => {
        axios.delete(`http://localhost:3003/comments/${id}`,
            {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                }, //Pass the Token from session strg
            }
        ).then(() => {
            setComments(comments.filter((value) => {
                //check 
                return value.id !== id; //keep Comments with ID not = commentID
            }))
        })
    };

    const dltPost = (id) => {
        axios.delete(`http://localhost:3003/post/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then(() => {
            navigate('/')
        })
    };

    const editPost = (option) => {
        if (option === 'title') {
            let newTitle = prompt("Edit your TITLE...");
            axios.put('http://localhost:3003/post/title', { newTitle: newTitle, id: id}, {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            })
            setPostObj({...postObj, title: newTitle});
        } else {
            let newPostText = prompt("Edit your POST...");
            axios.put('http://localhost:3003/post/postText', { newText: newPostText, id: id}, {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            })
            setPostObj({...postObj, postText: newPostText});
        }
    }

    return (
        <div className='postPage'>
            <div className='leftSide'>
                <div className='post' id='individual'>
                    <div
                        className='title'
                        onClick={() => { if (authState.username === postObj.username) { editPost("title") } }}>
                        {postObj.title}
                    </div>
                    <div
                        className='body'
                        onClick={() => { if (authState.username === postObj.username) { editPost("body") } }}>
                        {postObj.postText}
                    </div>
                    <div className='footer'>
                        <div>{postObj.username}</div>
                        {authState.username === postObj.username && (
                            <div onClick={() => { dltPost(postObj.id) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dltPost">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <div className='rightSide'>
                <div className='addCommentContainer'>
                    <input type='text' placeholder='Write Comments' value={newComm} autoComplete='off' onChange={(e) => { setNewComm(e.target.value) }} />
                    <button onClick={addComment}>Post Comment</button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className='comment'>
                                <label><i> By: @ <b>{comment.username}</b></i></label> <br />
                                <div className='displayedComment'>
                                    <div>{comment.commentBody}</div>
                                    {authState.username === comment.username && (
                                        <div onClick={() => { deleteComment(comment.id) }} className='dltCmnt'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="icon">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </div>)}
                                </div>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
}
