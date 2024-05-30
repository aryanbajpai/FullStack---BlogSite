import axios from 'axios'
import React, { useState } from 'react';

export const ChangePswd = () => {

    const [oldPswd, setOldPswd] = useState(null);
    const [newPswd, setNewPswd] = useState(null);

    const changePswd = () => {
        axios.put("http://localhost:3003/auth/changePswd", {oldPswd: oldPswd, newPswd: newPswd}, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then( (resp) => {
            if(resp.data.error){
                alert(resp.data.error)
            }
        })
    }

  return (
    <div>
        <h1>Change Password</h1>

        <input type='password' placeholder='Current Password...' onChange={(e) => {setOldPswd(e.target.value)}} /> 
        <input type='password' placeholder='New Password...' onChange={(e) => {setNewPswd(e.target.value)}} /> 
        <button onClick={changePswd}>Change Password</button>
    </div>
  )
}
