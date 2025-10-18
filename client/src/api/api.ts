type FetchResponse<T> = {
  data?: T
  error?: boolean
  status?: number
  message?: string
}



function useApi(token: string) {
    
    const BASE_URL = "http://localhost:8080"
   

    const fetchWrapper = async<T = unknown> (url : string, params : RequestInit, timeout = 8000) : Promise<FetchResponse<T>> => {

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
            return data
        }
        catch(error: any)
        {
            if (error.name === 'AbortError') {
                return { error: true, message: 'Żądanie przekroczyło limit czasu (timeout)' }
            }
            return { error: true, message: error.message || 'Nieznany błąd sieciowy' }
            
        }
    }

    const getAuthData = async (
        url: string,
        headers: object = {},
        queryParams: URLSearchParams | null = null
    ) => {
        const fullUrl = queryParams ? `${BASE_URL}${url}?${queryParams.toString()}` : `${BASE_URL}${url}`;

        return await fetchWrapper(fullUrl, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`, ...headers }
        });
    };

    const getAuthPost = async () => {
        const url = "/api/posts"
        return await getAuthData(url,{},null)
    }

    const getAuthDocs = async () => {
        const url = "/api/docs"
        return await getAuthData(url,{},null)
    }


    const getPublicData = async (url: string, headers: object = {}, queryParams: URLSearchParams | null = null) => {

        let URL = `${BASE_URL}${url}`

        if(queryParams)
        {
            URL = `${URL}?${queryParams.toString()}`
        }

        return await fetchWrapper(URL,{
            method: "GET",
            headers: headers as HeadersInit
        })
    }

    const getSliderPhoto = async () => {
        const url = "/api/photos"
        return await getPublicData(url)
    }

    const fetchNewsApi = async (perPage: number, page: number, token: string) => {
        const url = "/api/news"
        const query = new URLSearchParams({"per_page": perPage.toString(), "page": page.toString()})
        return await getAuthData(url,{},query)
    }

    return {
        fetchNewsApi,
        getSliderPhoto,
        getAuthPost,
        getAuthDocs
    }

}

export {
    useApi
}


