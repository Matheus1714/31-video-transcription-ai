const renderChunk = ({timestamp, text}) => `
<div class="chunk">
    <time>${getMinutes(timestamp)}</time>
    <p>
        ${groupedText(text, timestamp)}
    </p>
</div>
`

window.seek = (event) => {
    const span = event.target
    const seekTo = Number(span.getAttribute('data-seek-to'))

    const iframeYoutube = document.querySelector('#youtubeVideo')
    const player = iframeYoutube.contentWindow

    iframeYoutube.contentWindow.postMessage({ event: 'seekTo', seekTo }, '*');
}

function getMinutes(timestamp){
    const date = new Date(null)
    date.setTime(timestamp[0] * 1000)
    return date.toISOString().slice(14, 19)
}

function groupedText(text, timestamp){
    const words = text.split(' ')
    let groups = []
    for(let i = 0; i < words.length; i++){
        if(i % 3 === 0){
            groups.push(words.slice(i, i + 3).join(' '))
        }
    }
    return groups.map((item, index) => {
        const [initialTime, finalTime] = timestamp
        const seekTo = index == 0 ? initialTime : (finalTime - initialTime)/(groups.length - index) + initialTime

        return `<span onclick=seek(event) data-seek-to=${seekTo}>${item} </span>`
    }).join("")
}

export function renderText({ chunks }){
    const formattedTranscription = chunks.map(renderChunk).join("")
    document.querySelector('.transcription .content').innerHTML = formattedTranscription
}