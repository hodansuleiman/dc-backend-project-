// login page
 if(window.location.pathname === '/login' || window.location.pathname === '/'){

const form = document.getElementById('form'); // initliazing form to be element from DOM (in index it's grabbing elementbyID 'form)
const credsContainer=form.querySelector('#credentials-container');



//function to make data readalble which is passed in handlesubmit 
function stringifyFormData(fd)  //fd stands for form data
{const data = {}; // build object
for (let key of fd.keys()) { // iterate over all the keys in the object
    data[key] = fd.get(key); // iterate over all the keys in the object
}
return JSON.stringify(data, null, 4);
}


// handle submit is the event that happens after user clicks login 
const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default to stop page from resfresh
    const data = new FormData(e.target); // creating our data & this is the data that we want to send to the server. This formates our data in a way that makes it possible to send it to the server.
    //we need to make the data readiable so we use stringufy
    const stringified = stringifyFormData(data) // firing function stringify 
    const response = await doLogin(stringified);
    location.href = response.redirectTo; // clent is redirecting not the server
    console.log(`The user is logged in: ${response.isAuthenticated}`);
};


renderForm()// load function
form.addEventListener('submit', handleSubmit); // handeling submit eventon form capturing data

function renderForm() {
        const html = `
        <div class="input-field"> 
            <input type="text" name="username" id="username" placeholder="Enter Username">
        </div>
        <div class="input-field">
            <input type="password" name="password" id="password" placeholder="Enter Password">
        </div>  
            <input type="submit" value="LogIn">
        `;
        //console.log("what is this?", credsContainer)
        credsContainer.innerHTML = html;
}

async function doLogin(body) {
    const data = await fetch('/login', {
        body,
        headers: {
            'Content-Type' : 'application/json'
        }, 
        method: 'POST'
    });
    const response = await data.json();
    return response;
}


 }


if(window.location.pathname === '/register'){

const regform= document.getElementById('form');
const regcredsContainer=form.querySelector('#regcredentials-container');


renderRegisterForm()
form.addEventListener('submit', handleSubmit); // handeling submit eventon form capturing data

//registertion function 
function renderRegisterForm() {
    console.log('testing')
    const html = `
    <div class="input-field">
    <fieldset>
    <label for="Type">Group type</label>
    <input type='text' class="form-control" id="groupType" required />
    </fieldset>
    <fieldset>
    <label for="First Name">First Name</label>
    <input type='text' class="form-control" id="firstName" required />
    </fieldset>
    <fieldset>
    <label for="Last Name">Last Name</label>
    <input type='text' class="form-control" id="lastName" required />
    </fieldset>
    <fieldset>
    <label for="Email Address">Email Address</label> 
    <input type='text' class="form-control" id="emailAddress" required />
    </fieldset>
    <fieldset>
    <label for="Password">Password</label> 
    <input type='text' class="form-control" id="password" required />
    </fieldset>
    <fieldset>
    <label for ="Confirm Password">Confirm Password</label>
    <input type='text' class="form-control" id="confirmPassword" required />
    </fieldset>

        <input type="submit" value="Register">
        </div>
    `;
    regcredsContainer.innerHTML = html;
}

 }





//landing page view once client, mgmt , and vendor are logged in

if(window.location.pathname === '/landing'){
    
const searchContainer = document.querySelector('#search-container');

//console.log("??", searchContainer)
function userSearchForm() {
    
    const html = `
    <div class="input-group mb-3">
      <input type="text" class="form-control" name="address" placeholder="Search for Address" id="inputAddress">
      <span class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg></span>
    </div>
  <button type="submit" class="btn btn-custom2" id="submitBtn">Search</button>
    `;
    searchContainer.innerHTML = html;
}


userSearchForm();
    /*
    address, bedrooms, bathrooms, accomodates
    */
   document.querySelector("#form").addEventListener("submit",(e)=>{
    e.preventDefault();
        console.log("form submit", e.target.address.value)
        getListings(e.target.address.value)

   })

    function getListings(address){
        let query = `https://airdna1.p.rapidapi.com/rentalizer?address=${address}`
        fetch(query,{
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '073e8d9172mshdb82d5e4353d0c8p10487bjsnc51b2de1e97b',
                'X-RapidAPI-Host': 'airdna1.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then(data => {

            /* */
        console.log("data",data.data.comps)
        
        let html = "";
        let output = document.querySelector("#output");

        data.data.comps.map(oneRental =>{
            
            //pulling usable variables
            const {bedrooms, airbnb_property_id, cover_img, bathrooms, title , listing_url  } = oneRental;
            console.log( bedrooms, cover_img, bathrooms, title , listing_url   )
            let price = Math.floor(Math.random() * (200 - 150 + 1) + 150) // generate price for listings 
            
            
            //add to the dom
            
            html += `<div class="box">
            <img src="${cover_img}" />
            <h4>${title}</h4>
           <p>Bedrooms</p> <p>${bedrooms}</p>
            <p>${bathrooms}</p>
            <p>Price:$ ${price} </p>
            <a href="booking?id=${airbnb_property_id}">Rent Now</a>
            </div>`;
        });
   
        output.innerHTML = html;

        })

    }
   
}


// booking page 
let url = window.location.pathname;


if(url.match('/booking')){

    const urlParams = new URLSearchParams(window.location.search);

    document.querySelector("#bookingForm").addEventListener("submit", (e)=>{
        e.preventDefault();

        // let startNum = (e.target.startdate.value)
        // let endNum = (e.target.enddate.value)

        // console.log(startNum, endNum, endNum - startNum)
        // console.log(e.target.startdate.value)
        // console.log(e.target.enddate.value)
        // console.log(urlParams.get('id'))

    });

}
//};
  

