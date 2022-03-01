// Document get Element Function
const get = id => {
    return document.getElementById(id);
}

// Create Element Function
const create = name => {
    return document.createElement(name);
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
    const output = get('output-result');
    output.textContent = '';
    loadAllMobile(searchText);

}

const showAllResult = data => {

    const phones = data.data
    console.log(data.data);
    // console.log(data.data.brand);

    let count = data.data.length
    if (count === 0) {
        const h1 = create('h1');
        h1.innerText = "No Result Found";
        const output = get('output');
        output.appendChild(h1);
        console.log('No result Found');

    }
    else if (count >= 20) {
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
        // console.log(data.data[0].phone_name);
        phones.forEach(element => {
            // console.log(element.phone_name);
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

            // const output = get('output');
            // output.appendChild(div);
            // console.log('Result > 0');
        }

        );
    }
    // return count;
}



