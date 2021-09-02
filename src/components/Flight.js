import React from 'react'
import { Button, Card } from 'react-bootstrap'
import "./FlightPage.css";
// import { toString } from "../pages/SearchPage"



function Flight({ data }) {
    const { direct, price, airline, from, to, departure } = data

    const goToSkyScanner = (place, ) => {
        window.open(`https://www.skyscanner.com`, '_blank')
    }
    return (
        // <div onClick={goToSkyScanner}>
        //     <h2>{airline}</h2>
        //     <h2>{departure}</h2>
        //     <h3>${price}</h3>
        //     <h3>{direct}</h3>
        //     <h3>{from}</h3>
        //     <h3>{to}</h3>
        //     <hr/>
        // </div>
<div >
    
    <Card className="flights"  style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>{airline}</Card.Title>
    <Card.Text>
    {from} To {to}
    <br />
    {departure} <br/>
    {direct} <br/>
    ${price}
    </Card.Text>
    <Button onClick={goToSkyScanner} variant="primary">Book</Button>
  </Card.Body>
</Card>
</div>
    )
}

export default Flight
