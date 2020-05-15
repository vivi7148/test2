import React from 'react';
import { Button, Input } from './Form.styled';

// importing the API functions to retrieve and update authors
import { getAuthor, updateAuthor } from "../../api";


class AuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,        // keep a track of any error
            isLoaded: false,    // helps with showing placeholder while the form is loading
            id : null,          // author attributes - ID
            first_name : null,  // author attributes - first name
            last_name : null    // author attributes - last name
        };

        // bind the functions to this
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // use async and await to pause and wait for the api to return data before proceeding
    // to set the state variables
    async fetchAuthors() {
        const author = await getAuthor(this.props.author_id);

        this.setState({ id:author.id, first_name:author.first_name,
                                    last_name:author.last_name, isLoaded: true })
    }


    /*
    *   The componentDidMount is called after this component has been mounted
    */
    componentDidMount() {
        this.fetchAuthors();
    }

    /*
    *   this method is used to read the values from the input box and save
    *   the data to the state variables
    */
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });

    }

    /*
    *   Stop the form submission process, and then use the API function
    *   to update the author details
    */
    handleSubmit(event) {
        // the following call will stop the form from submitting
        event.preventDefault();

        // get the form data
        const data = new FormData(event.target);
        var authorObject = {};
        data.forEach((value, key) => {authorObject[key] = value});

        // call the API update the author details
        updateAuthor(authorObject);

        // reload the page
        window.location.reload();
    }


    /*
    *   render the author update form
    */
    render() {
        const { error, isLoaded, id, first_name, last_name } = this.state;
        if (error) {
            return <div>ERROR: No author to display</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div>
                        <form onSubmit={this.handleSubmit}>

                            Author ID: <Input name="id" type="text" value={id} onChange={this.handleInputChange}/> <br/>
                            First Name: <Input name="first_name" type="text" value={first_name} onChange={this.handleInputChange}/> <br/>
                            Last Name: <Input name="last_name" type="text" value={last_name} onChange={this.handleInputChange}/> <br/>

                            <Button>Update</Button>
                        </form>
                    </div>

                </div>
            );
        }
    }
}

export default AuthorForm;