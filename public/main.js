const form = document.getElementById('form'); // initliazing form to be element from DOM (in index it's grabbing elementbyID 'form)


//function to make data readalble which is passed in handlesubmit 
function stringifyFormData(fd)  //fd stands for form data
{const data = {}; // build object
for (let key of fd.keys()) { // iterate over all the keys in the object
    data[key] = fd.get(key); // iterate over all the keys in the object
}
return JSON.stringify(data, null, 4);
}


// handle submit is the event that happens after user clicks login 
const handleSubmit = (e) => {
    e.preventDefault(); // prevent default to stop page from resfresh
    const data = new FormData(e.target); // creating our data & this is the data that we want to send to the server. This formates our data in a way that makes it possible to send it to the server.
    //we need to make the data readiable so we use stringufy
    const stringified = stringifyFormData(data) // firing function stringify 
    console.log(stringified);
};


form.addEventListener('submit', handleSubmit); // handeling submit eventon form capturing data