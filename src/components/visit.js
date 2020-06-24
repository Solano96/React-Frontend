// components/visit_list.js
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

class Visit extends Component {

	constructor(props) {
		super(props)
		this.state = {                // variable estado de la clase, lista de películas
			visit: null,
			likes: null
		}
		this.visit_id = this.props.match.params.id;
	}

	componentDidMount() {
		fetch('http://localhost:8000/visitas_granada/api/visitas/' + this.visit_id + '/')
			.then(res => { return res.json()})
			.then(data => {
			this.setState({visit:data})
			this.setState({likes:data.likes})
		}).catch(error => {
			console.log(error)
		})
	}


	update_likes(num_likes) {
		fetch('http://localhost:8000/visitas_granada/api/likes/' + this.state.visit.pk + '/',
			{
				method: "PUT",
				headers: new Headers({
					Accept: "application/json"
				}),
				body: JSON.stringify({likes: num_likes})
			}
		)
			.then(res => { return res.json()})
			.then(data => {
			this.setState({likes:data.likes})
		}).catch(error => {
			console.log(error)
		})
	}

    render() {
		const visit = this.state.visit ? (
			<>
				<Card style={{ width: '60rem', margin: '50px 0px 00px 60px'}}>
					<CardMedia
						component="img"
						alt={this.state.visit.nombre}
						height="300"
						image={this.state.visit.foto}
						title={this.state.visit.nombre}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{this.state.visit.nombre}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							<b>Descripción:</b> {this.state.visit.descripcion}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							<b>Likes:</b> {this.state.likes}
						</Typography>
						<Button onClick={() => this.update_likes(this.state.likes+1)} variant="contained" color="primary" style={{ width: '5rem', margin: '10px 0px 0px 0px'}}>
						  Like
						</Button>
						<Button onClick={() => this.update_likes(this.state.likes-1)}  variant="contained" color="secondary" style={{ width: '5rem', margin: '10px 0px 0px 5px'}}>
						  Dislike
						</Button>
					</CardContent>
				</Card>
            </>
		) : (
			<>
				<Card style={{ width: '30rem', margin: '50px 0px 00px 60px'}}>
					<CardContent>
						<Typography variant="body2" color="textSecondary" component="p">
							Cargando visita...
						</Typography>
					</CardContent>
				</Card>
			</>
		)

        return (
	        <div className ="container">
	            {visit}
	        </div>
        );
    }
}

export default withRouter(Visit)
