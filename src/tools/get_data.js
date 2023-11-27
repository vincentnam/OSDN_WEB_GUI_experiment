export default async function get_data(url, initiator, model, key, operator, value, query ){
    const request = new Request(url+"/request", {
        method: "GET",
        headers: {
            "initiator": initiator,
            "model":model,
            "key":key,
            "operator":operator,
            "operand":value,
            "request-id":Date.now().toString(),
            "platform-id":initiator,
            "jump":"0",
            "platforms-visited":"",
            "query":query
        }
    });
    return fetch(request)
        .then(response => {
            console.log(response)

            return response.json()
        })
        .catch(error =>{
            // console.log(error)
            // console.log(error)
        })

}
