import "dotenv/config"
import express from 'express'

const app = express()

const PORT = process.env.PORT || 8000

//express midllware  
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes file
import routes from "./routes/index.js"
app.use(routes)

app.listen(PORT, () => {
    console.log(`Server is lsitening on the PORT ${PORT}`);
})