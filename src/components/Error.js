import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
    return (
        <div>
            404 not found <Link to="/">return home</Link>
        </div>
    )
}
