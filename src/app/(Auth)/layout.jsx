import React from 'react'
import Styles from './../page.module.css'
const AuthLayout = ({children}) => {
    return (
        <div className={Styles.page}> 
            {children}
        </div>
    )
}

export default AuthLayout