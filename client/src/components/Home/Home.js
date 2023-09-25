import React from 'react';

import trainPhoto from '../../assets/train.jpg'
import stationPhoto from '../../assets/station.jpg'
import parcelPhoto from '../../assets/parcel.jpg'
import './Home.css'

function Home() {
	return (
		<>
			<h1>Welcome to Railway Complaints</h1>
			<h5>Your one stop solution to all your complaints regarding Indian Railways</h5>

			<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
				<ol className="carousel-indicators">
					<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
				</ol>
				<div className="carousel-inner">
					<div className="carousel-item active">
						<img src={trainPhoto} className="d-block w-100" alt="..."/>
					</div>
					<div className="carousel-item">
						<img src={stationPhoto} className="d-block w-100" alt="..."/>
					</div>
					<div className="carousel-item">
						<img src={parcelPhoto} className="d-block w-100" alt="..."/>
					</div>
				</div>
				<button className="carousel-control-prev" type="button" data-target="#carouselExampleIndicators" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="sr-only">Previous</span>
				</button>
				<button className="carousel-control-next" type="button" data-target="#carouselExampleIndicators" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="sr-only">Next</span>
				</button>
			</div>
		</>
	);
}

export default Home;