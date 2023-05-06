// login page
 if(window.location.pathname === '/login' || window.location.pathname === '/'){

/**
 * The function takes in form data and converts it into a readable JSON format.
 * 
 * @param fd fd stands for form data, which is an object that contains a collection of key-value pairs
 * representing form fields and their values. It is typically used to send data from a web page to a
 * server.
 * 
 * @return a JSON stringified version of the data object that was built from the form data passed in as
 * the argument. The JSON string is formatted with an indentation level of 4 spaces for each nested
 * level.
 */


//function to make data readalble which is passed in handlesubmit 
function stringifyFormData(fd)  //fd stands for form data
{const data = {}; // build object
for (let key of fd.keys()) { // iterate over all the keys in the object
    data[key] = fd.get(key); // iterate over all the keys in the object
}
return JSON.stringify(data, null, 4);
}




/**
 * This function handles the submit event after a user clicks login, sends the login data to the
 * server, and redirects the client to the appropriate page.
 * 
 * @param e The event object that is passed to the function when the form is submitted. It contains
 * information about the event, such as the target element (the form that was submitted) and any data
 * associated with the event (such as the user's input in the form fields).
 */

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

const form = document.getElementById('form'); // initliazing form to be element from DOM (in index it's grabbing elementbyID 'form)
const credsContainer=form.querySelector('#credentials-container');
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

/**
 * The function sends a POST request to the '/login' endpoint with a JSON body and returns the response
 * as a JSON object.
 * 
 * @param body The `body` parameter is the data that will be sent in the request body of the `POST`
 * request to the `/login` endpoint. It is expected to be in JSON format.
 * 
 * @return The `doLogin` function is returning a Promise that resolves to the response object obtained
 * from the server after making a POST request to the `/login` endpoint with the provided `body` data.
 * The response object is parsed as JSON using the `json()` method before being returned.
 */
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


 // new register page 
 if(window.location.pathname === '/register') {
    const form = document.getElementById('form');
    const regcredsContainer = form.querySelector('#regcredentials-container');
  
    renderRegisterForm();
  
    form.addEventListener('submit', handleSubmit);
  
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
            <label for="Confirm Password">Confirm Password</label>
            <input type='text' class="form-control" id="confirmPassword" required />
          </fieldset>
          <input type="submit" value="Register">
        </div>
      `;
      regcredsContainer.innerHTML = html;
    }
  
    async function handleSubmit(event) {
      event.preventDefault();
  
      const user = {
        groupType: document.querySelector("#groupType").value,
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        email: document.querySelector("#emailAddress").value,
        password: document.querySelector("#password").value,
        confirmPassword: document.querySelector("#confirmPassword").value,
      };
  
      // send a POST request to the server with user data
      const response = await fetch('/register', {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
      });
  
      // handle the response from the server
      const data = await response.json();
      console.log("RESPONSE DATA:", data);
  
      // redirect to the landing page
      document.location.replace("/landing");
    }
  }
  

// if(window.location.pathname === '/register') {


// const regform= document.getElementById('form');
// const regcredsContainer=form.querySelector('#regcredentials-container');


// renderRegisterForm()
// form.addEventListener('submit', handleSubmit); // handeling submit eventon form capturing data

// //registertion function 
// function renderRegisterForm() {
//     console.log('testing')
//     const html = `
//     <div class="input-field">
//     <fieldset>
//     <label for="Type">Group type</label>
//     <input type='text' class="form-control" id="groupType" required />
//     </fieldset>
//     <fieldset>
//     <label for="First Name">First Name</label>
//     <input type='text' class="form-control" id="firstName" required />
//     </fieldset>
//     <fieldset>
//     <label for="Last Name">Last Name</label>
//     <input type='text' class="form-control" id="lastName" required />
//     </fieldset>
//     <fieldset>
//     <label for="Email Address">Email Address</label> 
//     <input type='text' class="form-control" id="emailAddress" required />
//     </fieldset>
//     <fieldset>
//     <label for="Password">Password</label> 
//     <input type='text' class="form-control" id="password" required />
//     </fieldset>
//     <fieldset>
//     <label for ="Confirm Password">Confirm Password</label>
//     <input type='text' class="form-control" id="confirmPassword" required />
//     </fieldset>

//         <input type="submit" value="Register">
//         </div>
//     `;
//     regcredsContainer.innerHTML = html;
// }

// // construct user object
// const user = {
//     groupType: document.querySelector("#grouptype").value,
//     firstName: document.querySelector("#firstName").value,
//     lastName: document.querySelector("#lastName").value,
//     email: document.querySelector("#emailAddress").value,
//     password: document.querySelector("#password").value,
//     confirmPassword: document.querySelector("#confirmPassword").value,
// }

// // post to server with user object:
// fetch ("/register",    // format 
// {
//     method:"POST", // format
//     headers: {
//         "Content-Type":"application/json"
//     },
//     body : JSON.stringify(user)
// }
// ).then((res)=> res.json())
// .then(data=>{
//     console.log ("RES", data);
//     document.location.replace("/landing"); // redirect to landing page
// });
// }

 //}

// after user clicks register send register information to server.
// function register () // from register on cl;ick handler making the call to the server sending all registration data from form
// {
//     // construct user object
//     const user = {
//         groupType: document.querySelector("#grouptype").value,
//         firstName: document.querySelector("#firstName").value,
//         lastName: document.querySelector("#lastName").value,
//         email: document.querySelector("#emailAddress").value,
//         password: document.querySelector("#password").value,
//         confirmPassword: document.querySelector("#confirmPassword").value,
//     }
    
//     // post to server with user object:
//     fetch ("/register",    // format 
//     {
//         method:"POST", // format
//         headers: {
//             "Content-Type":"application/json"
//         },
//         body : JSON.stringify(user)
//     }
//     ).then((res)=> res.json())
//     .then(data=>{
//         console.log ("RES", data);
//         document.location.replace("/landing"); // redirect to landing page
//     });
// }


//landing page view once client, mgmt , and vendor are logged in

if(window.location.pathname === '/landing'){
    
/**
 * The function creates a search form with an input field and a search button.
 */
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

/* This code is creating a search form for the landing page and adding an event listener to the form
submit button. When the form is submitted, it prevents the default behavior and calls the
`getListings` function with the value of the address input field as an argument. The `getListings`
function then makes a fetch request to an API to retrieve rental property data based on the address
input, and displays the data on the landing page. */

userSearchForm();
    /*
    address, bedrooms, bathrooms, accomodates
    */
   document.querySelector("#form").addEventListener("submit",(e)=>{
    e.preventDefault();
        console.log("form submit", e.target.address.value)
        getListings(e.target.address.value)

   })




   /**
    * The function retrieves rental listings data from an API and generates HTML code to display the
    * listings on a webpage.
    * 
    * @param address The address of the location for which you want to retrieve rental listings.
    */
    function getListings(address){
        let urlstring = encodeURIComponent(address)
        console.log(urlstring)
        let query = `https://airdna1.p.rapidapi.com/rentalizer?address=${urlstring}`
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
        //document.querySelector("#searchcontainer").style.display = "none"; // hide search display box
        
        let html = "";
        let output = document.querySelector("#output");

        data.data.comps.map(oneRental =>{
            
            //pulling usable variables
            const {bedrooms, airbnb_property_id, cover_img, bathrooms, title , listing_url  } = oneRental;
            //console.log( bedrooms, cover_img, bathrooms, title , listing_url   )
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
  

