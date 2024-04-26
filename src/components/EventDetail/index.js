export default function EventDetail(props) {
	const {id, title, description, eventDate, location, deadline} = props;
	return (
		<div key={id}>
			<h1>{title}</h1>
			<p>{description}</p>
			<p>{eventDate}</p>
			<p>{location}</p>
			<p>{deadline}</p>
		</div>
	);
}