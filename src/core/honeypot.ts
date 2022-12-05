const axios = require('axios');


//
export const isHoneypot = async (address: string) => {
    
        let {data} = await axios.get(`https://aywt3wreda.execute-api.eu-west-1.amazonaws.com/default/IsHoneypot?chain=eth&token=${address}`)
       console.log(data)
       let rugStatus = data.IsHoneypot
        if (data.IsHoneypot === false) {
             console.log("Hii token ni fiti")
        } else {
            console.log("Ni fake")
        }
        
    return rugStatus
}
