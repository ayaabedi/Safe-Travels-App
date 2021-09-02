import React from 'react'

function Flight({ data }) {
    const { direct, price, airline, from, to, departure } = data

    const goToSkyScanner = () => {
        window.open('https://www.skyscanner.com/', '_blank')
    }
    return (
        <div onClick={goToSkyScanner}>
            <h2>{airline}</h2>
            <h2>{departure}</h2>
            <h3>${price}</h3>
            <h3>{direct}</h3>
            <h3>{from}</h3>
            <h3>{to}</h3>
            <hr/>
        </div>
    )
}

export default Flight
