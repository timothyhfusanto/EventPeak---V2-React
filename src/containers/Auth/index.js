import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Api from "../../helpers/Api";

export default function Auth() {
	const { link = "" } = useParams();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [gender, setGender] = useState(1);
	const [dob, setDob] = useState("");
	const navigate = useNavigate();

	const validateData = () => {
		return email !== "" && password !== "";
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		 
		if (validateData()) {
			Api.authenticate({ 
				email,
				password,
			})
			.then(() => {
				navigate('/authenticated');
			})
				
		}
	}

	const handleSubmitRegister = (e) => {
		e.preventDefault();
		 
		if (validateData()) {
			Api.createCustomer({
				name,
				phone,
				dob,
				gender, 
				email,
				password,
			})
			.then(() => {
				navigate('/');
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
						Don't have an account? Register <Link to="/register" className="text-black" style={{fontWeight: "bold", textDecoration: "underline"}}>Here</Link>
					</Typography>
				</div>
			</div>
		);
		
	} else if (link === "register") {
		return (
			<div>
				<h1>Register to EventPeak</h1>
				<div style={{display: "flex", textAlign: "center", justifyContent: "center"}}>
					<Card sx={{  width:350, mt:10, padding:3 }}>
						<form onSubmit={handleSubmitRegister}>
							<CardContent
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								<TextField onChange={(e) => setName(e.target.value)} label="Name" variant="standard" fullWidth autoFocus sx={{mb:3}}/>
								<TextField onChange={(e) => setPhone(e.target.value)} label="Phone" variant="standard" fullWidth sx={{mb:3}}/>
								<Grid container spacing={2}>
									<Grid item md={6}>
										<FormControl variant="standard">
											<InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
											<Select
											labelId="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											value={gender}
											onChange={(e) => setGender(e.target.value)}
											label="Gender"
											fullWidth
											>
											<MenuItem value={1}>Female</MenuItem>
											<MenuItem value={2}>Male</MenuItem>
											</Select>
										</FormControl>									
									</Grid>
									<Grid item md={6}>
										<TextField onChange={(e) => setDob(e.target.value)} label="DOB" variant="standard" fullWidth sx={{mb:3}}/>
									</Grid>
								</Grid>
								<TextField onChange={(e) => setEmail(e.target.value)} label="Email" variant="standard" fullWidth sx={{mb:3}}/>
								<TextField onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" fullWidth type="password" label="Password" variant="standard" />
							</CardContent>
							<Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>Register</Button>
						</form>
					</Card>
				</div>
				<div style={{display: "flex", textAlign: "center", justifyContent: "center", marginTop: 30}}>
					<Typography variant="subtitle">
						Already have an account? Login <Link to="/" className="text-black" style={{fontWeight: "bold", textDecoration: "underline"}}>Here</Link>
					</Typography>
				</div>
			</div>

		);
	} else {
		return <h1>404 Page Not found</h1>
	}
}
	