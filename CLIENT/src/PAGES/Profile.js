import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../Helpers/AuthContext';


export const Profile = () => {

  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [listOfAllPost, setListOfAllPost] = useState([]);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3003/auth/info/${id}`).then((resp) => {
      setUsername(resp.data.username)
    });

    axios.get(`http://localhost:3003/post/byuserid/${id}`).then((response) => {
      setListOfAllPost(response.data);
    });

  }, []);

  return (
    <div className='profilePageContainer'>
      <div className='basicInfo'>
        <h1 className='profileHead'>Username: {username}</h1>
        {authState.username === username && (
          <svg onClick={() => {navigate('/changePswd')}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="editIcon">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        )}

      </div>
      <div className='listOfPost'>
        {listOfAllPost.map((value, key) => {
          return (
            <div key={key} className='post'>
              <div className='title'> {value.title} </div>
              <div className='body' onClick={() => navigate(`/post/${value.id}`)}> {value.postText} </div>
              <div className='footer'>
                <div className='leftFooter'>@{value.username}</div>
                <div className='rightFooter'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="profileLike">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                  </svg>
                  {/* onClick={() => { likePost(value.id) }} */}
                  {/* className={likw.includes(value.id) ? 'likeIcon' : 'unlikeIcon'} */}
                  <label className='countLike'> {value.Likes.length} </label>
                </div>
              </div>
            </div>)
        })}
      </div>
    </div>
  )
}
