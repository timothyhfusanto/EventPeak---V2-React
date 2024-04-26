import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Api from "../../helpers/Api";

export default function Auth() {
	const { link = "" } = useParams();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const validateData = () => {
		return email !== "" && password !== "";
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		 
		if (validateData()) {
			Api.authenticate({ 
				email,
				password 
			})
				.then((data) => {
					navigate("/authenticated");
				})
				
		}
	}

	if (link === "") {
		return (
			<div>
				<div style={{display: "flex", textAlign: "center", justifyContent: "center"}}>
					<Card sx={{  width:350, mt:10, padding:3 }}>
						<form onSubmit={handleSubmit}>
							<CardContent
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								<TextField onChange={(e) => setEmail(e.target.value)} label="Email" variant="standard" fullWidth autoFocus sx={{mb:3}}/>
								<TextField onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" fullWidth type="password" label="Password" variant="standard" />
							</CardContent>
							<Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>Login</Button>
						</form>
					</Card>
				</div>
				<div style={{display: "flex", textAlign: "center", justifyContent: "center", marginTop: 30}}>
					<Typography variant="subtitle">
						Don't have an account? Register <Link to="/register" className="text-black" style={{fontWeight: "bold"}}>Here</Link>
					</Typography>
				</div>
			</div>
		);
		
	} else if (link === "register") {
		return <h1>Register</h1>;
	} else {
		return <h1>404 Page Not found</h1>
	}
}
	