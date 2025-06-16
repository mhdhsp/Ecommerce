import React, { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Collection() {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3031/items`)
      .then(res => {
        setItems(res.data)
      })
  }, [])

  return (
    <div className="container py-4">
      <div className="row g-4">
        {
          items.map(item => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <Link to={`/items/${item.id}`} className="text-decoration-none text-dark">
                <ItemCard item={item} />
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Collection
