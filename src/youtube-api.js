import { loadingMessage } from "./loading"

export function getVideoId(url){
    try{
        const [_, query] = url.split('?')
        const urlParams = new URLSearchParams(query)
        const videoId = urlParams.get('v')
        return videoId
    }catch(error){
        console.log('[URL_ERROR]', error)
        return ''
    }
}

export function loadVideo(url){
    loadingMessage('Carregando Vídeo do YouTube')
    return new Promise((resolve, reject) => {

        const videoId = getVideoId(url)
        const embedUrl = `https://www.youtube.com/embed/${videoId}`
        document.querySelector('#youtubeVideo').src = embedUrl

        resolve()
    })
}