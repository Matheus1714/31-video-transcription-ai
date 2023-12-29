import { pipeline } from "@xenova/transformers"

export async function transcribeAudio(audio) {
    let data = null
    try{
        console.time()
        console.log('[START_TRANSCRIBE]')
        
        const trasncribePipe = await pipeline("automatic-speech-recognition", "Xenova/whisper-small")
        data = await trasncribePipe(audio, {
            chunk_length_s: 30,
            stride_length_s: 5,
            language: "portuguese",
            task: "transcribe",
            return_timestamps: true
        })
        
    }catch(error){
        console.log('[ERROR_TRANSCRIBE]', error)
        throw new Error(error)
    }finally{
        console.timeEnd()
        console.log('[STOP_TRANSCRIBE]')

        return data
    }
}