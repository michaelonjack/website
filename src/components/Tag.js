import React from 'react'

const Tag = ({type}) => {
    return (
        <span className={'tag' + (type === 'professional' ? ' tag-prof' : ' tag-pers')}>
            {type === 'professional' ? 'Professional' : 'Personal'}
        </span>
    )
}

export default Tag