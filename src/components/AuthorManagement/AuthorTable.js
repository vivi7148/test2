import React from "react";

import { Table, Tr } from 'styled-table-component';
import { getAuthors } from "../../api";

export class AuthorTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            authors: [],        // list of authors
        };
    }

    // get a list of all authors and set the state variable to store the author list
    async  fetchAuthors() {
        const data = await getAuthors();

        this.setState({ authors: data, isLoaded: true })
    }

    componentDidMount() {
        this.fetchAuthors();
    }

    // render a HTML table with author information
    render() {

        const { error, isLoaded, authors } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <Table simple>
                        <thead>
                        <tr>
                            <th scope="col">Author ID</th>
                            <th scope="col">Author First Name</th>
                            <th scope="col">Author Last Name</th>
                        </tr>
                        </thead>
                        <tbody>
                            {authors.map((value, key) => {
                                return <Tr active key={key}>
                                    <td>
                                        <a href={value.id}>{value.id}</a>
                                    </td>
                                    <td>{value["first_name"]}</td>
                                    <td>{value["last_name"]}</td>
                                </Tr>
                            })}
                        </tbody>
                    </Table>
                </div>

            );
        }
    }
}
