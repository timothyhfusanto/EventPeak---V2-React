import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function ProfileCard(props) {
	const { name, email, phone, dob, gender } = props;
	return (
		<Card sx={{ maxWidth: 700 }}>
			<CardMedia
			  component="img"
			  height="140"
			  image="/static/images/cards/contemplative-reptile.jpg"
			  alt="green iguana"
			/>
			<CardContent>
			  <Typography gutterBottom variant="h5" component="div">
				{name}
			  </Typography>
			  <Typography variant="body2" color="text.secondary">
				{email}
				{phone}
				{gender === 1 && "Female"}
				{gender === 2 && "Male"}
				{dob}
			  </Typography>
			</CardContent>
		</Card>
	);
}