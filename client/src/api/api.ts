import { useAuth0 } from '@auth0/auth0-vue';

const BASE_URL = "http://localhost:8080"

type FetchResponse<T> = {
  data?: T
  error?: boolean
  status?: number
  message?: string
}

const fetchWrapper = async<T = unknown> (url : string, params : RequestInit, timeout = 8000) : FetchResponse<T> => {

    const contoler = new AbortController()
    const id = setTimeout(() => contoler.abort(),timeout)
    try{

        const response = await fetch(url,{...params, signal: contoler.signal})
        clearTimeout(id)
        
        if (!response.ok) {
            const msg = await response.text()
            return { error: true, status: response.status, message: msg || response.statusText }
        }

        const data = await response.json()
        return { data, status: response.status }

    }
    catch(error: any)
    {
        if (error.name === 'AbortError') {
            return { error: true, message: 'Żądanie przekroczyło limit czasu (timeout)' }
        }
         return { error: true, message: error.message || 'Nieznany błąd sieciowy' }
        
    }
}

const getAuthData = async (url: string, headers: object = {}, queryParams: URLSearchParams) => {
    const { getAccessTokenSilently } = useAuth0()
    const tempToken = getAccessTokenSilently({audience: "node-api"})
    return await fetchWrapper(`${BASE_URL}${url}?${queryParams.toString()}`,{
        method: "GET",
        headers: { authorization: `Bearer ${tempToken}}`, ...headers }
    })
}

export const getAuthPost = async (category: string) => {
    const url = "/api/posts"
    const query = new URLSearchParams({cat: category})
    return await getAuthData(url,{},query)
}


const getPublicData = async (url: string, headers: object = {}, queryParams: URLSearchParams = {}) => {
    return await fetchWrapper(`${BASE_URL}${url}?${queryParams.toString()}`,{
        method: "GET",
        headers: headers
    })
}

export const getSliderPhoto = async () => {
    const url = "/api/photos"
    return await getPublicData(url)
}