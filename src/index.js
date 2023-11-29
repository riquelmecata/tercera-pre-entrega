import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import { router as ProductRouter,dbM } from "./routes/api/product.routes.js"
import { router as CartRouter} from "./routes/api/carts.routes.js"
import { router as viewsRouter } from "./routes/view.routes.js"
import { router as sessionRouter } from "./routes/api/sessions.routes.js"
import {Server} from "socket.io"
import dotenv from "dotenv";
import ProductManager from "./dao/mongomanagers/productManagerMongo.js";
dotenv.config();

import "./dao/dbConfig.js"
import "./passport/passport.config.js"

import session  from "express-session";
import  FileStore  from "session-file-store";
import passport from "passport";

const pmanager=new ProductManager()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))
const fileStore= FileStore(session)
app.use(session({
    store: new fileStore({
        path: __dirname+"/sessions"
    }),
    secret:"default",
    
}))

app.use(passport.initialize())
app.use(passport.session())


//Api Routes
app.use('/api/products', ProductRouter);
app.use('/api/carts', CartRouter);
app.use('/api/sessions', sessionRouter);


// Views routes
app.use('/', viewsRouter);
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.get('/', (req, res) => {
    res.redirect('/login')
})

const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log("Andando en puerto " + PORT)
})

//---------------------------------------Socket.io-----------------------------------//

const socketServer = new Server(httpServer)

//-------------------------------Prueba conexión-------------------------------------------//
socketServer.on("connection", socket => {
    console.log("cliente conectado con id:" ,socket.id)
//------Recibir información del cliente----------//
    socket.on("message", data => {
        console.log(data)
    })
//-----------------------------------------------//

socket.on('addProduct',  data => {
    pmanager.addProduct(data);
    socketServer.emit("success", "Producto Agregado Correctamente");
  });

  socket.on("deleteProduct", (id) => {
    pmanager.deleteProduct(id);
    socketServer.emit("success", "Producto Eliminado Correctamente");
  });
  
  socket.on("updateProduct", ({id, newProduct}) => {
    pmanager.updateProduct(id, updatedProducts)
    socketServer.emit("success", "Producto Actualizado Correctamente");
});
  /*

    socket.on("newProd", (newProduct) => {
        products.addProduct(newProduct)
        socketServer.emit("success", "Producto Agregado Correctamente");
    });
    socket.on("updProd", ({id, newProduct}) => {
        products.updateProduct(id, newProduct)
        socketServer.emit("success", "Producto Actualizado Correctamente");
    });
    socket.on("delProd", (id) => {
        products.deleteProduct(id)
        socketServer.emit("success", "Producto Eliminado Correctamente");
    });
*/
    socket.on("newEmail", async({email, comment}) => {
        let result = await transport.sendMail({
            from:'Chat Correo <riquelmecata@gmail.com>',
            to:email,
            subject:'Correo con Socket y Nodemailer',
            html:`
            <div>
                <h1>${comment}</h1>
            </div>
            `,
            attachments:[]
        })
        socketServer.emit("success", "Correo enviado correctamente");
    });
//-----------------------------Enviar información al cliente----------------------------------//
    socket.emit("test","mensaje desde servidor a cliente, se valida en consola de navegador")
//--------------------------------------------------------------------------------------------//
})

httpServer