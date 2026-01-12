import React from 'react'
import {Link, useParams} from 'react-router-dom'

const Dashboard = () => {
    const dashitem =[
        {id:1, title:'Apple'},
        {id:2, title:'Ball'},
        {id:3, title:'Dog'},
    ]
    const {id} = useParams()
  return (
    <>
    <ul>
        {dashitem.map((item)=>{
            <li key={id}>
                <Link to={`/about/${item.id}`}>
                    <h2>{item.title}</h2>
                </Link>
            </li>
        })}
    </ul>
    </>
  )
}

export default Dashboard