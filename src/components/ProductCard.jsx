import React from 'react'

function ProductCard(props) {
    return (
        <>
            <div>
                <h1>{props.name}</h1>
                <img src={props.image} alt={props.name} />
                <p>Price LKR - {props.price}</p>
            </div>
        </>
    )
}

export default ProductCard

