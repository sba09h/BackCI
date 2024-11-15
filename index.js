import app from "./src/app.js";

const puerto = 3000;

app.listen(puerto, ()=>{
    console.log(">>>>>el servidor escuchando puerto 3000")});

export default puerto;