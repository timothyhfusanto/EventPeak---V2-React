import React, { useState, useEffect } from 'react';
import Api from '../../helpers/Api';
import EventCard from '../../components/EventCard';
import EventDetail from '../../components/EventDetail';
import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';

export default function Landing() {
	const [data, setData] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	const {id = 0} = useParams();

	useEffect(() => {
		Api.searchEvents(searchInput)
			.then(response => response.json())
			.then(events => {
				for (const event of events) {
					const { eventDate, deadline } = event;

					event.eventDate = eventDate.substring(0, eventDate.length - 5);
					event.deadline = deadline.substring(0, deadline.length - 5);
				}
				setData(events);
				console.log(events);
			});
	}, [searchInput]);

	const handleInputChange = (e) => {
		setSearchInput(e.target.value.toLowerCase());
	};

	const renderBody = () => {
		if (id > 0) {
			let selectedEvent = null;
			for (const event of data) {
				if (event.eventId === parseInt(id)) {
					selectedEvent = event;
				}
			}
			return (
				<>
					<EventDetail {...selectedEvent} />
					<Link to={`/authenticated`}>
						<Button variant="contained">Back</Button>
					</Link>
				</>
			);
		} else {
			return (
				<>
					<h1>Welcome to EventPeak</h1>
					<TextField
						label="Search for events"
						variant="standard"
						onChange={handleInputChange}
						value={searchInput}
						sx={{
							width: '50%',
							mb:5,
						}}
					/>
					<Grid container spacing={2}>
						{data.map(event => (
								<Grid item xs={4} key={event.eventId}>
									<Link to={`/authenticated/${event.eventId}`}>
										<EventCard {...event} />
									</Link>
								</Grid>
						))}
					</Grid>
				</>
			);
		}
	}

	return (
		<>
			{renderBody()}
		</>
	);
}