const URL_BASE = process.env.VUE_APP_URL_API

const getData = async (MODULE, params = '', payload = {}) => {
    const req = await fetch(`${URL_BASE}/${MODULE}${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': payload?.token || null,
            data: JSON.stringify(payload?.data)
        }
    })

    return await req.json()
}

const sendData = async (METHOD, MODULE, payload) => {
    const req = await fetch(`${URL_BASE}/${MODULE}`, {
        method: METHOD,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': payload?.token || null
        },
        body: JSON.stringify(payload.data),
    })
    
    return await req.json()
}

export {
    getData, sendData
}