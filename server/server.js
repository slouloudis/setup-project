import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg";

// for testing
import books from "./books.json" assert {type : "json"}

const PORT = 5252;

const app = express()

app.use(express.json())
app.use(cors())
dotenv.config()

const db = new pg.Pool({
    connectionString:`postgres://postgres.pvjaijaugvkwxizzxnzy:yY6RpQ8OcjqSLXDD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`
})

app.get('/', (req, res) => {
    res.send('	ԅ(≖‿≖ԅ)')
})

app.get('/books', async (req, res) => {
    // const result = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NYTIMES_KEY}`)
    // const books = await result.json()
    res.json(books)
})


app.get('/review/:id', (req, res) => {
    const bookId = req.params.id
    // rest
    res.status(200).send('oh yeah')
})

app.post('review/:id', (req, res) => {
    const bookId = req.params.id

    // try to do something 
    // if it fails, the code inside the catch block will run
    try {
        db.query(`INSERT INTO reviews (username, review, book_id) VALUES ($1, $1)`, [])
        res.status(200).send('Donezo')

    } catch (err) {
        res.status(500).send(err)
    }

})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
