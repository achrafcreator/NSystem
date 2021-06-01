const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('All Copyrights Gos To: NIR0'))
app.listen(port, () => console.log(`Need Help? Content us Here: https://discord.gg/YkFyXY6ND8`))