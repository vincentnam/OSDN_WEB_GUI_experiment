
export default async function register_platform(url, headers, data){
    const request = new Request(url+"/registry", {
        method: "GET",
        headers:headers,
        body:data
    });
    return fetch(request)
        .then(response => {
            return response.json()
        })
}
