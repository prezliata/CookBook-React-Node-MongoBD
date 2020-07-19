import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core';
import NavBar from '../NavBar/NavBar';
import MenuCookBook from '../MenuCookBook/MenuCookBook'
import RecipeList from '../RecipeList/RecipeList'
import RecipeForm from '../RecipeForm/RecipeForm'
import styles from './styles';

class CookBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedtId: '',
			isEdit: false,
			formIsOpen: false,
			title: '',
			description: '',
			recipeList: [],
			filteredRecipeList: [],
			sortBy: '',
		};
    }
    
    componentDidMount() {
		this.getRecipeList()
	}

	getRecipeList = () => {
		axios
		// .get('http://localhost:4000/api/recipeList')
		.get('/recipeList')
		.then((response) => {
			this.setState({
				filteredRecipeList: response.data,
				recipeList: response.data
			})
		})
		.catch(err => {
			console.log(err);
		});
	}

	handleDelete = (e) => {
		let id = e.target.parentNode.getAttribute("data-id");
		axios
		// .delete(`http://localhost:4000/api/recipeList/${id}`)
		.delete(`/recipeList/${id}`)
		.then(() => {
			this.getRecipeList();
		})
		.catch(err => {
			console.log(err);
		});
	};

	handleEdit = (e) => {
		const id = e.currentTarget.getAttribute('data-id');
		const filteredRecipeList = this.state.filteredRecipeList;
		const title = filteredRecipeList.filter((el) => el._id === id)[0].title;
		const description = filteredRecipeList.filter((el) => el._id === id)[0].description;
		this.setState({
			selectedtId: id,
			isEdit: true,
			formIsOpen: true,
			title: title,
			description: description
		});
	};

	handleUpdateFileteredList = (e) => {
		const isEdit = this.state.isEdit
		const id = this.state.selectedtId
		if (isEdit === true) {
			axios
			// .put(`http://localhost:4000/api/recipeList/${id}`,{title: this.state.title, description: this.state.description})
			.put(`/recipeList/${id}`,{title: this.state.title, description: this.state.description})
			.then(res => {
				console.log(res);
				this.getRecipeList();
			})
			.catch(err => {
				console.log(err);
			});
		}
	};

	handleRecipeFind = (e) => {
		let filteredRecipeList = this.state.recipeList;
		filteredRecipeList = filteredRecipeList.filter(
			(item) => item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
		);
		this.setState({
			filteredRecipeList: filteredRecipeList
        });
	};
    
	sortMaxMin = (arr) => arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
	sortMinMax = (arr) => arr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	handleRecipesSort = (e) => {
		const { filteredRecipeList } = this.state;
		e.target.value === 'Newest'
			? this.setState({
					filteredRecipeList: this.sortMinMax(filteredRecipeList),
					sortBy: e.target.value
				})
			: this.setState({
					filteredRecipeList: this.sortMaxMin(filteredRecipeList),
					sortBy: e.target.value
				});
	};
	
	handleFormOpen = () =>{
		this.setState({
			formIsOpen: true
		})
	}
	
	handleFormClose = () =>{
		this.setState({
			isEdit: false,
			formIsOpen: false,
			title: '',
			description: ''
		})
	}

	handleCreateNewRecipe = (title, description) => {
		const isEdit = this.state.isEdit
		const date = new Date();
		const options = { 
			weekday: 'long', 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric', 
			hour: 'numeric', 
			minute: 'numeric', 
			second: 'numeric' 
		};
		const newRecipe = {
			title: title,
			description: description,
			date: date.toLocaleDateString("en-US", options),
			image: 'https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Choc-Fudge-Cake-b2d1909.jpg?quality=45&resize=768,574',
		};
		if (isEdit === false) {
			axios
			// .post(`http://localhost:4000/api/recipeList/`, newRecipe)
			.post(`/recipeList/`, newRecipe)
			.then(res => {
				this.getRecipeList();
			})
			.catch(err => {
				console.log(err);
			});
		}
	};

	handleChangeTitle = (e) =>{
		this.setState({
			title: e.target.value
		})
	}

	handleChangeDescription = (e) =>{
		this.setState({
			description: e.target.value
		})
	}

	handleResetFields = () => {
		this.setState({
			title: '',
			description: ''
		})
	};

	handleAddNewRecipe = () => {
		const title = this.state.title;
		const description = this.state.description;
		if (title === '' || description === '') {
			alert("The fields shouldn't be empty");
		} else {
			this.handleCreateNewRecipe(title, description);
			this.handleUpdateFileteredList();
			this.handleResetFields();
			this.handleFormClose();
		}
	};

    render() {
        const { filteredRecipeList, sortBy } = this.state;
        return (
            <Fragment>
                <NavBar />
                <MenuCookBook 
                    onRecipesSort={this.handleRecipesSort}
                    sortBy={sortBy}
					onRecipeFind={this.handleRecipeFind}
					onFormOpen={this.handleFormOpen}
                /> 
                <RecipeList 
                    recipe={filteredRecipeList}
					onDelete={this.handleDelete}
					onEdit={this.handleEdit}
                />
				<RecipeForm 
					formIsOpen={this.state.formIsOpen}
					onFormClose={this.handleFormClose}
					onCreateNewRecipe={this.handleCreateNewRecipe}
					onChangeTitle={this.handleChangeTitle}
					onChangeDescription={this.handleChangeDescription}
					onAddNewRecipe={this.handleAddNewRecipe}
					title={this.state.title}
					description={this.state.description}
				/>
            </Fragment>
        )
    }
}
export default withStyles(styles)(CookBook);