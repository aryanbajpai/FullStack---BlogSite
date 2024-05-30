import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Registration = () => {

    const initialValues = {
        username: "",
        password:""
    }
    const navigate = useNavigate();

    //Specify what fields needs to be VALIDATE
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(15).required()
    })

    const onSubmit = (data) => {
        axios.post('http://localhost:3003/auth', data).then( () => {
            console.log(data);
        });

        navigate('/login')
    }

  return (
    <div className='createPostPage'>
         <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label>Username: </label>
                <ErrorMessage name='username' component='span' />
                <Field autoComplete='off' id="inputCreatePost" name="username" placeholder='(Ex: john@123...)' />

                <label>Password: </label>
                <ErrorMessage name='password' component='span' />
                <Field autoComplete='off' type='password' id="inputCreatePost" name="password" placeholder='Enter your password' />

                <button type='submit'>Register</button>
            </Form>
        </Formik>
    </div>
  )
}
