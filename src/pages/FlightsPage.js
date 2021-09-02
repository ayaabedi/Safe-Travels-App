import React, { useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Flight from '../components/Flight'

function FlightsPage() {

    const flights = useSelector((state) => state.flights)
    const [sortedFlights, setSortedFlights] = useState(flights)

    const onChange = (e) => {
        if (!e.target.value) return;
        if (e.target.value === 'asc') {
            // avoid mutating state
            const flightsCopy = [...flights]
            flightsCopy.sort((a, b) => (a.price > b.price) ? 1 : -1)
            setSortedFlights(flightsCopy)
        } else if (e.target.value === 'desc') {
            // avoid mutating state
            const flightsCopy = [...flights]
            flightsCopy.sort((a, b) => (a.price < b.price) ? 1 : -1)
            setSortedFlights(flightsCopy)
        }
    }

    return (
        <div className="flights">
            <FloatingLabel controlId="floatingSelect" label="Sort By">
            <Form.Select size='sm' onChange={onChange} aria-label="sort by label">
                <option>Sort By</option>
                <option value="desc">Price High to Low</option>
                <option value="asc">Price Low to High</option>
            </Form.Select>
            </FloatingLabel>
            {sortedFlights.length ? sortedFlights.map((flight, index) => {
                return (
                    <Flight data={flight} key={`flight-node-${index}`}/>
                )
            }) : <h2>No Flights.</h2>}
        </div>
    )
}

export default FlightsPage
