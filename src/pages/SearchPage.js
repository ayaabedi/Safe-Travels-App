import React, { useState, useEffect } from 'react';
import '../components/SearchPage.css';
import { useDispatch } from 'react-redux'
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { Alert } from 'react-bootstrap';

const SearchPage = () => {
     // Redux
     const dispatch = useDispatch()
     // Router
     const history = useHistory();
     // Origin/Destination State Variables
     const [originPlaces,setOriginPlaces] = useState([])
     const [destPlaces,setDestPlaces] = useState([])
     const [originValue, setOriginValue] = useState("")
     const [destValue, setDestValue] = useState("")

        // Outbound/Inbound Date State Variables 
    const [outboundDate,setOutboundDate] = useState(new Date())
    const [inboundDate, setInboundDate] = useState(new Date())
    const [showInboundInput, setShowInboundInput] = useState(false)

      // Currency State Variables
      const [currency, setCurrency] = useState("USD")
      const [currencies, setCurrencies] = useState([])

       const [err, setShowErr] = useState(false)

       function getFlight(quotes, carriers, places) {
        const flights = quotes.map(quote => {
            const { OutboundLeg, Direct, MinPrice } = quote
            const airline = carriers.find(carrier => carrier.CarrierId === OutboundLeg.CarrierIds[0])
            const to = places.find(place => place.PlaceId === OutboundLeg.DestinationId)
            const from = places.find(place => place.PlaceId === OutboundLeg.OriginId)
            return {
                direct: Direct,
                price: MinPrice,
                airline: airline.Name,
                from: from.Name,
                to: to.Name,
                departure: OutboundLeg.DepartureDate
            }
        })
        return flights;
       }
        /* On form submission, fetch flights according to origin, dest., and dates */
    function handleSubmit(e) {
        e.preventDefault() // Prevent page from refreshing after submit

        /* Convert date object to appropriate string format: YYYY-MM-DD */
        function toString(date) {
            return date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? 
                '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + 
                date.getDate()
        }

        // Since InboundDate is of type Date, create a local version that's a string 
        let localInboundDate
        if (showInboundInput) localInboundDate = toString(inboundDate)
        else localInboundDate = "anytime"

        // ?????

        async function fetchFlights() {
            const reqOptions = {
                method: 'GET',
                headers: {
                    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    "x-rapidapi-key": "9dd335fd5fmsh126b73ee1f9cf94p16039djsnbb4543436faf"
                    
                }
            }
            const response = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/${currency}/en-US/${originValue}/${destValue}/${toString(outboundDate)}/?` + new URLSearchParams({inboundpartialdate: localInboundDate}), reqOptions)
            if (!response.ok) {
                setShowErr(true)
                return
            }
            const data = await response.json()
            const { Quotes, Carriers, Places } = data;
            const flights = getFlight(Quotes, Carriers, Places)
            // update redux store with flights
            dispatch({ type: 'SET_FLIGHTS', payload: flights })
            // navigate to flights
            history.push("/flights");
            // clear error
            setShowErr(false)
        }

        fetchFlights()
    }

    // Origin Handler Functions
    /* Sets originValue according to value of option selected, then updates origin options */
    const handleOriginChange = (option, actionMeta) => {
        actionMeta.action === "clear" ? setOriginValue("") : setOriginValue(option.PlaceId)
        getOriginOptions(option ? option.PlaceName : "")
    }
    
    /* Updates origin options by fetching places that match the current originValue */
    function getOriginOptions(origin) {
        async function fetchOrigins() {
            const reqOptions = {
                method: 'GET',
                headers: {
                    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    "x-rapidapi-key": "9dd335fd5fmsh126b73ee1f9cf94p16039djsnbb4543436faf",
                    "useQueryString": true
                }
            }
            let response = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/${currency}/en-US/?` + new URLSearchParams({query: origin }), reqOptions)
            response = await response.json()
            setOriginPlaces(response.Places)
        }
        fetchOrigins()
    }

    // Destination Handler Functions
    /* Sets destValue according to value of option selected, then updates destination options */
    const handleDestChange = (option, actionMeta) => {
        actionMeta.action === "clear" ? setDestValue("") : setDestValue(option.PlaceId)
        getDestOptions(option ? option.PlaceName : "")
    }

    /* Updates origin options by fetching places that match the current originValue */
    function getDestOptions(dest) {
        async function fetchDests() {
            const reqOptions = {
                method: 'GET',
                headers: {
                    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    "x-rapidapi-key": "9dd335fd5fmsh126b73ee1f9cf94p16039djsnbb4543436faf",
                    "useQueryString": true
                }
            }
            let response = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/${currency}/en-US/?` + new URLSearchParams({query: dest }), reqOptions)
            response = await response.json()
            setDestPlaces(response.Places)
        }
        
        fetchDests()
    }

    // Currency Functions
    /* Fetch list of currencies */
    const getCurrencies = () => {
        async function fetchCurrencies() {
            const reqOptions = {
                method: 'GET',
                headers: {
                    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    "x-rapidapi-key": "9dd335fd5fmsh126b73ee1f9cf94p16039djsnbb4543436faf",
                    "useQueryString": true
                }
            }
            let response = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies", reqOptions)
            response = await response.json()
            setCurrencies(response.Currencies)
        }

        fetchCurrencies()
    }

    /* Fetch list of currencies when state changes instead of every render */
    useEffect(() => {
        getCurrencies()
    }, [])

    // Input/Select Components
    /* Input for inbound date. Hidden until Roundtrip is selected */
    const InboundInput = () => {
        return (
            <div id="inboundDateInput" className="searchInput">
                <label htmlFor="inboundDate" className="visuallyHidden">Return Date:</label>
                <DatePicker 
                    id="inboundDate"
                    name="inboundDate"
                    placeholderText="Return Date" 
                    todayButton="Today"
                    selected={inboundDate}
                    onChange={date => setInboundDate(date)}
                    required
                />
            </div>
        )
    }

    return (
        <div className="searchBar">
            {/* Error */}
            {err && 
                <Alert variant='danger'>
                    No Data Found
                </Alert>
            }
            {/* Main Search Bar */}
            <form onSubmit={handleSubmit}>
                <div id="originInput" className="searchInput">
                    <label htmlFor="originSelect" className="visuallyHidden">Origin:</label>
                    <Select 
                        id="originSelect"
                        name="originSelect"
                        className="placeSelect"
                        isClearable
                        backspaceRemovesValue
                        onChange={handleOriginChange}
                        onInputChange={inputValue => getOriginOptions(inputValue)}
                        options={originPlaces}
                        getOptionLabel={({ PlaceName }) => PlaceName}
                        getOptionValue={({ PlaceId }) => PlaceId}
                        placeholder="Where from?"
                        filterOption={""}
                    />
                </div>
                <div id="destInput" className="searchInput">
                    <label htmlFor="destSelect" className="visuallyHidden">Destination:</label>
                    <Select 
                        id="destSelect"
                        name="destSelect"
                        className="placeSelect"
                        isClearable
                        backspaceRemovesValue
                        onChange={handleDestChange}
                        onInputChange={inputValue => getDestOptions(inputValue)}
                        options={destPlaces}
                        getOptionLabel={({ PlaceName }) => PlaceName}
                        getOptionValue={({ PlaceId }) => PlaceId}
                        placeholder="Where to?"
                        filterOption={""}
                    />
                </div>
                <div id="outboundDateInput" className="searchInput">
                    <label htmlFor="outboundDate" className="visuallyHidden">Departure Date:</label>
                    <DatePicker 
                        id="outboundDate"
                        name="outboundDate"
                        placeholderText="Departure Date" 
                        todayButton="Today"
                        selected={outboundDate}
                        onChange={date => setOutboundDate(date)}
                        required
                    />
                </div>
                { showInboundInput ? <InboundInput /> : <></> }
                <button id="search">Search</button>
            </form>

            <div id="searchOptions">
                {/* Trip Type Buttons */}
                <div id="leftOptions">
                    <button id="roundtrip"
                            onClick={e => setShowInboundInput(true)}>
                            Roundtrip
                    </button>
                    <button id="oneWay"
                        onClick={e => setShowInboundInput(false)}>
                        One Way
                    </button>
                </div>

                <div id="rightOptions">
                    {/* Sort Type Selector */}
                    {/* { showFlights ? <SortSelect /> : <></> } */}

                    {/* Currency Picker */}
                    <div id="currency">
                        <label htmlFor="currencySelect" className="visuallyHidden">Currency:</label>
                        <Select 
                            id="currencySelect"
                            name="currencySelect"
                            defaultValue={{ Code: "USD" }}
                            onChange={(option) => setCurrency(option.Code)}
                            options={currencies}
                            getOptionLabel={({ Code }) => Code}
                            getOptionValue={({ Code }) => Code}
                            placeholder="Currency"
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}


export default SearchPage
