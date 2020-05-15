

const BASE_URL = "http://localhost:3000";

// using axios to interact with Library API
const axios = require('axios');



/**
 * Retrieves the list of authors from Library API
 * @return List of Objects, each containing author data.
 */
export function getAuthors() {
    const endpoint = BASE_URL + `/author-management`;
    console.log("getAuthors");
    try{
        return axios.get(endpoint).then(res => res.data);
    } catch (e) {
        return e;
    }

}

/**
 * Retrieves a single author from Library API using the author ID
 * @param {string} author_id -- uniquely identifies each author
 * @return Single Objects containing author data.
 */
export function  getAuthor(id) {
    const endpoint = BASE_URL + `/author-management/${id}`;

    try{
        return axios.get(endpoint).then(res => res.data);
    } catch (e) {
        return e;

    }
}

/**
 * Updates the details of an author; changes only the first and last name
 * @param {object} author {id, first_name, last_name}
 */
export function updateAuthor(author) {
    const { id, first_name, last_name } = author;
    const endpoint = BASE_URL + `/author-management/${id}`;
    // check the author id is present
    if (!id) {
        alert("must include an id");
        return;
    }
    // check that both contain some text
    if (!first_name || !last_name) {
        alert("must include a first name or last name to update");
        return;
    }

    console.log({
        first_name,
        last_name
    });


    console.log("updateAuthor");

    return axios({
            url: endpoint,  // send a request to the library API
            method: "POST", // HTTP POST method
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({ // payload -- values to change
                first_name,
                last_name
            })
        })

}
