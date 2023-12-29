import ffmpegStatic from 'ffmpeg-static'
import ffmpeg from 'fluent-ffmpeg'

export const createMP3 = () => new Promise((resolve, reject) => {
    ffmpeg.setFfmpegPath(ffmpegStatic)

    ffmpeg()
    .input('audio.mp4')
    .outputOptions('-ab', '20k')
    .saveToFile('audio.mp3')
    .on('progress', (progress) => {
        if (progress.percent) {
            console.log(`Processando: ${Math.floor(progress.percent)}%`)
        }
    })
    .on('end', () => {
        console.log('Audio convertido com sucesso')
        resolve()
    })
    .on('error', (error) => {
        console.error(error)
        reject(error)
    })
})