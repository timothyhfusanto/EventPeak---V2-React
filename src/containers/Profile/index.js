import { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard";
import Api from "../../helpers/Api";

export default function Profile() {
	const [data, setData] = useState();

	useEffect(() => {
		Api.getProfile()
		.then(response => response.json())
		.then(profile => {
			setData(profile);
		})
	}, [])

	return (
		<div>
			<ProfileCard {...data} />
		</div>
	);
}