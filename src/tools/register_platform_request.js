
export default async function register_platform(url, headers, data){
    const request = new Request(url+"/registry", {
        method: "POST",
        headers:headers,
        body:data
    });
    return fetch(request)
        .then(response => {
            // if (response.ok){

            return [response.status, response.statusText];
            // }
            // else {
            //     return [response.status, response.statusText];
            // }
            // console.log(response.status, response.statusText)
            // return response.json()
        })
        .catch(test=>{
            // console.log(test.message)
            // return test
        })
}
