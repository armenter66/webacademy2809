const hello = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve('Hello dear friend, it`s promise object')
    }, 3000)
})  
    .then( 
        function (result) {
            alert(result);
        },
        function (error) {
            alert(error);
        }
    );