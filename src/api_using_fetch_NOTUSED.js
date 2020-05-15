
const BASE_URL = "http://localhost:3000";

export function getAuthors() {
    const endpoint = BASE_URL + `/author-management`;
    console.log("getAuthors");
    return fetch(endpoint).then(res => res.json());
}

export function  getAuthor(id) {
    const endpoint = BASE_URL + `/author-management/${id}`;

    try{
        return fetch(endpoint).then(res => res.json());
    } catch (e) {
        return e;

    }
}

export function updateAuthor(author) {
    const { id, first_name, last_name } = author;
    if (!id) {
        alert("must include an id");
        return;
    }
    if (!first_name || !last_name) {
        alert("must include a first name or last name to update");
        return;
    }

    console.log({
        first_name,
        last_name
    });
    const endpoint = BASE_URL + `/author-management/${id}`;
    console.log("updateAuthor");
    // console.log(author);

    return fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            first_name,
            last_name
        })
    })
        .then(res => {
            console.log(res);
        })
        .then(res => window.location.reload());
}
