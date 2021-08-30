import React from 'react'
import ReactLoading from 'react-loading'

export const Loading = ({type, color}) => {
    return (
        <div>
            <ReactLoading type={type} color={color} height={100} width={100} />
        </div>
    )
}

