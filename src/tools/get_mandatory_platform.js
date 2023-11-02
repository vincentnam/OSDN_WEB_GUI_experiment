export default async function get_mandatory_platform_to_connect_to(url){
    const request = new Request(url+"/inscription", {
        method: "GET",
        headers: {
            "platform-id": '4',
        }
    });
    return fetch(request)
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            return (data["data"])
        })
        .catch(error =>{
            console.log(error)
            console.log(error)
        })

}
