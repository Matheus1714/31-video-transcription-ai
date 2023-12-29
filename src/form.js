import axios from 'axios'
import { startLoading, stopLoading, loadingMessage } from './loading'
import { loadVideo, getVideoId } from './youtube-api'
import { renderText } from './render'

const form = document.querySelector('#form')

form.addEventListener('submit', async (e) => {
    try{
        e.preventDefault()

        loadingMessage('Iniciando a aplicação')
        startLoading()

        const formData = new FormData(form)
        const url = formData.get('url')
        const videoId = getVideoId(url)

        await loadVideo(url)

        loadingMessage('Conectando com o back-end')
        const response = await axios.get(`http://localhost:3333/audio?v=${videoId}`)

        const { result } = response.data

        console.log(result)

        renderText(result)

    }catch(error){
        console.log('[SUBMIT_ERROR]', error)
    }finally{
        stopLoading()
    }
})