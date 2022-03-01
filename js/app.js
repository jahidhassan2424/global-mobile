// Document get Element Function
const get = id => {
    return document.getElementById(id);
}

// Create Element Function
const create = name => {
    return document.createElement(name);
}

// Clear 
const clear = name => {
    return get(name).textContent = '';
}

const loadAllMobile = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showAllResult(data))

}

const searchButton = () => {
    const searchText = get('search-field').value;
    document.getElementById('showing-search-result-for').innerHTML = `Showing search result for <span ></span>"${searchText}"`;
    get('search-field').value = '';
    clear('output-result');
    loadAllMobile(searchText);
}

const showAllResult = data => {
    const phones = data.data
    let count = data.data.length

    if (count === 0) {


        clear('nothing-found');
        const div = document.createElement('div')
        div.innerHTML = `
        <div style="text-align:center" >
        <img src="image/no-result-found.png">
        <div>
        `;
        get('nothing-found').appendChild(div);
        console.log('No result Found');

    }
    else if (count >= 20) {
        clear('nothing-found');
        // phones.forEach(element => {
        for (let i = 0; i < 20; i++) {
            let count = 0;
            if (count < 20) {
                const div = document.createElement('div');
                div.classList = 'col col-4';
                div.innerHTML = `
                <div class="card h-100">
                    <img width="100%" src="${data.data[i].image}" class="m-auto p-5" alt="...">
                    <div class="card-body text-center">
                        <h5 class="card-title">${data.data[i].phone_name}</h5>
                        <p class="">Brand: ${data.data[i].brand} </p>
                        <a href="#"><button class="btn btn-primary fw-bold ">Details</button></a>
                    </div>
                </div>
            `;
                const output = get('output-result');
                output.appendChild(div);
                count++;
            }
        }
    }
    else {
        clear('nothing-found');
        phones.forEach(element => {
            const div = document.createElement('div');
            div.classList = 'col col-4';
            div.innerHTML = `
                <div class="card h-100">
                    <img width="100%" src="${element.image}" class="m-auto p-5" alt="...">
                    <div class="card-body text-center">
                        <h5 class="card-title">${element.phone_name}</h5>
                        <p class="">Brand: ${element.brand} </p>
                        <a href="#"><button class="btn btn-primary fw-bold ">Details</button></a>
                    </div>
                </div>
            `;
            const output = get('output-result');
            output.appendChild(div);
        })
    }
}

