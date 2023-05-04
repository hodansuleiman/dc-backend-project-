function setMainView(view){
    return{
        footer: 'partials/footer', // consuming after the partials are imported
        header: 'partials/header',
        main: `partials/main/${view}`// go down file tree 
    }
}

module.exports = {setMainView}; // export it in order to bring it to scoop and call