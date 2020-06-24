// components/visit_list.js
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Visit from './visit.js'

export default class VisitList extends Component {

	constructor(props) {
		super(props)
		this.state = {                // variable estado de la clase, lista de películas
			visit_list: []
		}
	}


	componentDidMount() {
		fetch('http://localhost:8000/visitas_granada/api/visitas/')  // o el que sea
			.then(res => { return res.json()})
			.then(data => {
			this.setState({visit_list:data})
		}).catch(error => {
			console.log(error)
		})
	}


    render() {

        return (
            <>
				<Router>
					<Switch>
						<Route exact path={"/"}>
				            <Grid container spacing={3}>
				                {this.state.visit_list.map(item => (
									<Link to={"/visit/" + item.pk} style={{ textDecoration: 'none' }}>
						                <Card style={{ width: '18rem', height:'24rem', margin: '50px 0px 00px 60px'}}>
						                  <CardActionArea>
						                    <CardMedia
						                      component="img"
						                      alt={item.nombre}
						                      height="200"
						                      image={item.foto}
						                      title={item.nombre}
						                    />
						                    <CardContent>
						                      <Typography gutterBottom variant="h5" component="h2">
						                        {item.nombre}
						                      </Typography>
						                      <Typography variant="body2" color="textSecondary" component="p">
						                        <b>Descripción:</b> {item.descripcion}<p/>
						                      </Typography>
						                      <Typography variant="body2" color="textSecondary" component="p">
						                        <b>Likes:</b> {item.likes}
						                      </Typography>
						                    </CardContent>
						                  </CardActionArea>
						                </Card>
									</Link>
				                ))}
				            </Grid>
						</Route>
						<Route path="/visit/:id" component={Visit} />
				  	</Switch>
				</Router>
            </>
        );
    }
}
