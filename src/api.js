import BASE_URL from './constants.js'

export async function apiVerifyAccessToken(access_token) {
    try {
        const resp = await fetch(`${BASE_URL}/api/token/verify`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((resp) => resp)
        return resp.json()
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function apiObtainNewToken(refresh_token) {
    const payload = {
        refresh_token: refresh_token
    }
    try {
        const resp = await fetch(`${BASE_URL}/api/v2/token/obtain`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        }).then((resp) => resp)
        return resp.json()
    } catch (error) {
        console.log(error)
        return []
    }
}
