import app from './server';


const PORT: string = process.env.PORT || "3001";

app.listen(PORT, () => {
   console.clear()
   console.log(`Server listener at http://localhost:${PORT}`)
})