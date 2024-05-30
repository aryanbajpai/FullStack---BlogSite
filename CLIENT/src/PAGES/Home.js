import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Helpers/AuthContext';

export const Home = () => {

    // To display all post 
    const [listOfPost, setListOfPosts] = useState([]);
    const [likedPost, setLikedPost] = useState([])
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);


    useEffect(() => {

        if (!localStorage.getItem('accessToken')) {
            navigate('/login')
        } else {
            //Logic for making REQUEST
            axios.get('http://localhost:3003/post', {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            }).then((response) => {
                setListOfPosts(response.data.listOfPosts);

                //will contain ID of Each post liked by current Logged USER
                setLikedPost(response.data.likedPosts.map((like) => {
                    return like.PostId;
                }));
            });
        }

    }, [])

    const likePost = (postId) => {
        axios.post('http://localhost:3003/likes', { PostId: postId }, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            //make changes in list and not all elements are changed
            setListOfPosts(listOfPost.map((post) => {
                if (post.id === postId) {
                    if (response.data.liked) {
                        //Modify the post we Like => Set Post obj same as it is and modify Like Field
                        // In Likes field we are keeping the same Array but increasing an Element so that length can Increment by ONE
                        return { ...post, Likes: [...post.Likes, 0] }
                    } else {
                        //POP the last Element
                        const likeArr = post.Likes;
                        likeArr.pop();
                        return { ...post, Likes: likeArr }
                    }

                } else {
                    return post;
                }
            }));

            //Logic for changing color
            if (likedPost.includes(postId)) {
                setLikedPost(likedPost.filter((id) => {
                    return id != postId;
                }))
            } else {
                setLikedPost([...likedPost, postId]);
            }
        })
    }

    return (
        <div>
            {listOfPost.map((value, key) => {
                return (
                    <div key={key} className='post'>
                        <div className='title'> {value.title} </div>
                        <div className='body' onClick={() => navigate(`/post/${value.id}`)}> {value.postText} </div>
                        <div className='footer'>
                            <div className='leftFooter'>
                                <Link to={`/profile/${value.UserId}`} className="link-no-underline">@{value.username}</Link>
                            </div>
                            <div className='rightFooter'>
                                <svg onClick={() => { likePost(value.id) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={likedPost.includes(value.id) ? 'likeIcon' : 'unlikeIcon'}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                </svg>

                                <label className='countLike'> {value.Likes.length} </label>
                            </div>
                        </div>
                    </div>)
            })}
        </div>
    )
}
