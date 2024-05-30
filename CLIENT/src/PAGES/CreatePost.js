import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Helpers/AuthContext';

export const CreatePost = () => {

    const navigate = useNavigate();
    const {authState} = useContext(AuthContext);

    const initialValues = {
        title: "",
        postText:""
    }

    useEffect( () => {
        if(!localStorage.getItem('accessToken')){
            navigate('/login')
        }
    }, [])

    //Specify what fields needs to be VALIDATE
    const validationSchema = Yup.object().shape({
        //logic to define fields
        title: Yup.string().required("Title is required!"),
        postText: Yup.string().required("Post field can not be empty!"),
    })

    const onSubmit = (data) => {
        //Add USERNAME from Logged User in data object  

        //runs req                          finalize req    grabs resp
        axios.post('http://localhost:3003/post', data, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then(() => {
            navigate('/')
        });
    }

  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label>Title: </label>
                <ErrorMessage name='title' component='span' />
                <Field autoComplete='off' id="inputCreatePost" name="title" placeholder='(Ex: Title...)' />

                <label>Posts: </label>
                <ErrorMessage name='postText' component='span' />
                <Field autoComplete='off' id="inputCreatePost" name="postText" placeholder='(Ex: Post...)' />

                <button type='submit'>Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}
