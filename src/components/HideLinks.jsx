import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLogin } from '../redux/auth/authSlice'

export default function ShowOnLogin({children}) {
    const isLoginin = useSelector(selectIsLogin)
    return (
        <div>
            {!isLoginin ? children : null}
        </div>
    )
 

}




