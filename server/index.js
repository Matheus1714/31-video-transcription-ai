import express from "express"
import cors from "cors"
import { downloader } from "./download-video.js"
import { convert } from './convert.js'
import { transcribeAudio } from "./transcribe.js"

// import data from './data.json' assert { type: "json" };

const app = express()
app.use(cors())
app.use(express.json())



app.get('/audio', async (req, res) => {
    try{
        const videoId = req.query.v

        await downloader(videoId)

        const audioConverted = await convert()
        const result = await transcribeAudio(audioConverted)

        res.json({ result })
    }catch(error){
        console.log(error)
        res.json({ error })
    }
})

app.listen(3333, () => console.log('server up'))