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
    document.getElementById('showing-search-result-for').innerHTML = `Showing search result for <span ></span>"${searchText.toLowerCase()}"`;
    get('search-field').value = '';
    clear('output-result');
    clear('phoneDetails');
    loadAllMobile(searchText);
}

// Show all result Function starts
const showAllResult = data => {
    console.log(data.data);
    const phones = data.data
    let count = phones.length

    if (count === 0) {
        clear('nothing-found');
        const div = document.createElement('div');
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
                        <a href="#"><button class="btn btn-primary fw-bold " onclick="loadPhoneDetails('${data.data[i].slug}')">Details</button></a>
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
                        <a href="#"><button class="btn btn-primary fw-bold " onclick="loadPhoneDetails('${element.slug}')">Details</button></a>
                    </div>
                </div>
            `;
            const output = get('output-result');
            output.appendChild(div);
        })
    }
}
// Show all result Function end


// Load Phone Details
const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPhoneDetails(data));
}

// Show Phone Details

const showPhoneDetails = phone => {
    clear('phoneDetails');
    console.log('Phone:', phone);
    // console.log(phone.data.slug);
    let releaseDate = phone.data.releaseDate;
    let others = phone.data.others;
    let bluetooth = 'No Data Found';
    let gps = 'No Data Found';
    let nfc = 'No Data Found';
    let radio = 'No Data Found';
    let usb = 'No Data Found';
    let wlan = 'No Data Found';

    if (others === undefined) {
        others = 'No Data Found';
        console.log('Other is undefined');
    }


    else {
        bluetooth = phone.data.others.Bluetooth;
        gps = phone.data.others.GPS;
        nfc = phone.data.others.NFC;
        radio = phone.data.others.Radio;
        usb = phone.data.others.USB;
        wlan = phone.data.others.WLAN;
        console.log('Other is available');
        others = phone.data.others;
        // bluetooth === "" ? bluetooth = 'No Data Found' : bluetooth = phone.data.others.Bluetooth;
    }
    releaseDate === "" ? releaseDate = 'No Data Found' : releaseDate = phone.data.releaseDate;

    const div = document.createElement('div');
    div.innerHTML = `
        <div style="display:flex; flex-direction: row;align-items:center; justify-content:center; ">
            <div class="">
                <img src="${phone.data.image}" alt="">
            </div>
            <div class="px-3">
                <table >
                <tr>
                    <th>Name </th>
                    <td>${phone.data.name}</td>
                </tr>
                <tr>
                    <th>Brand</th>
                    <td> ${phone.data.brand}</td>
                </tr>
                <tr>
                    <th>Release Date</th>
                    <td> ${releaseDate}</td>
                </tr>
                <tr  >
                    <td class="center-text" colspan="2">Main Features</td> 
                </tr>      
                <tr>
                    <th>Storage</th>
                    <td> ${phone.data.mainFeatures.storage}</td>
                </tr>
                <tr>
                    <th ">Display Size</th>
                    <td> ${phone.data.mainFeatures.displaySize}</td>
                </tr>
                <tr>
                    <th ">ChipSet</th>
                    <td> ${phone.data.mainFeatures.chipSet}</td>
                </tr>
                <tr>
                    <th ">Memory</th>
                    <td> ${phone.data.mainFeatures.memory}</td>
                </tr>
                <tr>
                    <th ">Sensors</th>
                    <td> ${phone.data.mainFeatures.sensors}</td>
                </tr>
                <tr  >
                    <td class="center-text" colspan="2">Other Features</td>
                </tr> 
                <tr>
                    <th ">Bluetooth:</th>
                    <td> ${bluetooth}</td>
                </tr>
                <tr>
                    <th ">GPS:</th>
                    <td> ${gps}</td>
                </tr>
                <tr>
                    <th ">NFC:</th>
                    <td> ${nfc}</td>
                </tr>
                <tr>
                    <th ">Radio:</th>
                    <td> ${radio}</td>
                </tr>
                <tr>
                    <th ">USB:</th>
                    <td> ${usb}</td>
                </tr>
                <tr>
                    <th ">WLAN:</th>
                    <td> ${wlan}</td>
                </tr>
               
            

                </table>
            </div>
        </div>
    
    `;
    get('phoneDetails').appendChild(div);

}

