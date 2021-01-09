import React, { Component } from 'react';
import { Accordion } from 'foundation-sites';
import './tripMenu.css'
import EventModal from "../EventModal/EventModal.jsx"
import TripModal from "../TripModal/TripModal.jsx"
import $ from "jquery";
import axios from "axios";

class TripMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventType: '',
            trips: [],
            accordionDidCreate: false
        };

    }

    componentDidMount() {
        axios.get(`/api/traveler/trips/${localStorage.getItem("user")}`)
            .then(res => {
                let initialTrips = [];
                res.data.data.forEach(trip => {
                    initialTrips.push(trip)
                });
                return initialTrips
            })
            .then(data => {
                this.setState({
                    trips: data
                }, () => {
                    this.initializeFoundation();
                })
            })
            .catch(err => {
                console.log("Unable to get trips from backend: ", err);
            });

    }

    initializeFoundation = () => {
        console.log('initialized')
        // $(document).foundation();

        new Accordion($(".accordion"), {
            slideSpeed: 500,
            multiExpand: true
        })
    }

    render() {

        let trips = this.state.trips;
        let createAllTripOptions = (trips.map(trip =>
            <li id="accordion-item" class="accordion-item" data-accordion-item>
                <a href="#" class="accordion-title">{trip.location}</a>
                <div class="accordion-content" data-tab-content>
                    <p><a href="#">Flights</a></p>
                    <p><a href="#">Lodging</a></p>
                    <p><a href="#">Activities</a></p>
                </div>
            </li>
        )
        )


        return (
            <>
                <EventModal />
                <TripModal />
                {/* <div class="primary button-group">
                    <a class="trip-button button">Add Trip</a>
                    <a class="event-button button" onClick={<EventModal/>}>Add Event</a>
                </div> */}
                <div class="callout">
                    <ul class="accordion" data-accordion>
                        {createAllTripOptions}
                    </ul>
                </div>
                {/* 
                <div className="callout">
                    <ul className="accordion" data-accordion data-allow-all-closed>
                        {['a', 'b', 'c'].map((data, index) => {
                            return (
                            <li key={data + index} id="accordion-item" class="accordion-item" data-accordion-item>
                                <a href="#" class="accordion-title">{data}</a>
                                <div class="accordion-content" data-tab-content>
                                    <p><a href="#">Flights</a></p>
                                    <p><a href="#">Lodging</a></p>
                                    <p><a href="#">Activities</a></p>
                                </div>
                            </li>
                        )
                        })}
                    </ul>
                </div> */}
            </>
        );
    }
};

export default TripMenu;