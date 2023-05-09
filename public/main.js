// login page
 if(window.location.pathname === '/login' || window.location.pathname === '/'){



//function to make data readalble which is passed in handlesubmit 
function stringifyFormData(fd)  //fd stands for form data
{const data = {}; // build object
for (let key of fd.keys()) { // iterate over all the keys in the object
    data[key] = fd.get(key); // iterate over all the keys in the object
}
return JSON.stringify(data, null, 4);
}



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

if(window.location.pathname === '/register') {


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
    <label for="Username">Username</label>
    <input type='text' class="form-control" id="username" required />
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

// construct user object
const user = {
    groupType: document.querySelector("#grouptype").value,
    firstName: document.querySelector("#firstName").value,
  lastName: document.querySelector("#lastName").value,
  email: document.querySelector("#emailAddress").value,
    username: document.querySelector("#username").value,
    password: document.querySelector("#password").value,
    confirmPassword: document.querySelector("#confirmPassword").value,
}

// post to server with user object:
fetch ("/register",    // format 
{
    method:"POST", // format
    headers: {
        "Content-Type":"application/json"
    },
    body : JSON.stringify(user)
}
).then((res)=> res.json())
.then(data=>{
    console.log ("RES", data);
    document.location.replace("/landing"); // redirect to landing page
});



}

if(window.location.pathname === '/landing'){

const searchContainer = document.querySelector('#search-container');

function userSearchForm() {
    
    const html = `
    <div class="input-group mb-3">
      <input type="text" class="form-control" name="address" placeholder="Search for Address" id="inputaddress">
      <span class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg></span>
    </div>
  <button type="submit" class="btn btn-custom2" id="submitBtn">Search</button>
    `;
    searchContainer.innerHTML = html;

}

userSearchForm(); // calling fumction 
   
   document.querySelector("#form").addEventListener("submit",(e)=>{
    e.preventDefault();
        getProperty(e.target.address.value) // multiple fields 
        console.log('look here',  e.target.address.value)
   })


    async function getProperty(city){ // 
      console.log('getProperty function called');
        let urlstring = encodeURIComponent(city)
        console.log(urlstring)
        let query = `https://airdna1.p.rapidapi.com/properties?location=${urlstring}`
        fetch(query,{
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '073e8d9172mshdb82d5e4353d0c8p10487bjsnc51b2de1e97b',
                'X-RapidAPI-Host': 'airdna1.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then(data => {

      
        console.log("data",data.properties)
        for(let i = 0; i<10; i++){
         let property = data.properties[i]
         console.log(property.bedrooms, property.id, property.img_cover,property.bathrooms,property.title)
          const newdiv = document.createElement("div")

       
        
        let html = "";
        let output = document.querySelector("#output");

            let price = Math.floor(Math.random() * (200 - 150 + 1) + 150) // generate price for listings 
            
            
            //add to the dom
            
            newdiv.innerHTML = `<div class="box">
            <div class="boxImg" style="background-image: url(${property.img_cover})"></div>
    
            <h4>${property.title}</h4>
           <p>Bedrooms</p> <p>${property.bedrooms}</p>
            <p>Bathrooms: ${property.bathrooms}</p>
            <p>Price:$ ${price} </p>
            <a href="booking?id=${property.id}" class="rent-now-link"}">Rent Now</a>
            </div>`;
   
            // Add an event listener to the "Rent Now" link inside the new div
              newdiv.querySelector('.rent-now-link').addEventListener('click', (event) => {
                event.preventDefault(); // prevent the default link behavior

                 // Save clicked information in local storage
                      const clickedInfo = {
                      title: property.title,
                      bedrooms: property.bedrooms,
                      bathrooms: property.bathrooms,
                      price: price,
                      id: property.id,
                      acc: property.accommodates
                    };
                    console.log("did i save?",  clickedInfo)
                    localStorage.setItem('clickedInfo', JSON.stringify(clickedInfo)); // save it in local storage
                    console.log( localStorage.getItem('clickedInfo') );

                    window.location.href = `booking?id=${property.id}`; // navigate to the booking page changing url but server is not doing anything that is why i dont see any data 
               
              });

              // Add the new div to the output container
              output.appendChild(newdiv);
                      
      
      }
    })
}



} //end if if inside landing page




if(window.location.pathname.includes("/booking")) {
    console.log(window.location.pathname)
    const urlParams = new URLSearchParams(window.location.search); // // create a new url using URLSearchParams object using querystring portion of the URL (that part after the ?)  
    const propertyId = urlParams.get('id');  // get the value of 'id' 
    const myInfoData = JSON.parse( localStorage.getItem('clickedInfo') );// get  JSON-formatted string from local storage using the key "clickedInfo" and parse it into a JavaScript object using JSON.parse()
    console.log("i got info data", myInfoData)



    const propertyIdDiv = document.getElementById('property-id'); // set  the innerHTML property of an HTML element with the ID 'property-id"
    const {bedrooms, bathrooms,title, price, acc} = myInfoData; //retrieves the myInfoData object that was previously parsed from JSON in the previous code block. It uses destructuring to extract the values of the bedrooms, bathrooms, title, price, and acc properties from myInfoData
    
    //sets the content of the propertyIdDiv element to this HTML string
    //  p tags containing information about the property, including its title, number of bedrooms and bathrooms, price, and the number of people it accommodates. It also includes an h4 tag containing the property's title.

    propertyIdDiv.innerHTML = ` 
    <h4>${title}</h4>
    <p>Bedrooms ${bedrooms}</p>
    <p>Bathrooms ${bathrooms}</p>
    <p>Price ${price}</p>
    <p>Accommodates ${acc}</p>
    
    `;
    
    
    
    /**
     * The function calculates the total number of days stayed and the corresponding price based on the
     * start and end dates selected by the user.
     * 
     * @return If either `startdate` or `enddate` is empty, the function `calcTotal()` will return
     * `false`. Otherwise, it will calculate the total number of days stayed and log the result to the
     * console along with the total cost of the stay.
     */
    let startdate = enddate =  ""

    document.querySelector("#startdate").addEventListener("change",(e)=> {
        console.log("startdate",e.target.value)
        startdate = e.target.value;
        calcTotal();
    })

    document.querySelector("#enddate").addEventListener("change",(e)=> {
        console.log("enddate",e.target.value)
        enddate = e.target.value
        calcTotal();
    })
    

    function calcTotal(){
        if(startdate === "" || enddate === ""){
            //i need both dates to be valid
            return false
        }
        let s = parseInt( dayjs(startdate).format("D") );
        let sMonth = dayjs(startdate).daysInMonth()
        let e = parseInt( dayjs(enddate).format("D") );
        let eMonth = dayjs(startdate).daysInMonth()
        let totalDaysStayed = 0;

        console.log(s, e)
        if(s < e){
          
           totalDaysStayed = e - s
           //may 1 and may 20
        } else {
            totalDaysStayed = (s - sMonth) + e
             //may 20 and june 5
        }
        console.log(totalDaysStayed);
        console.log("$" + totalDaysStayed * price)

    }
    
}
