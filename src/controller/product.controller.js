import ProductManagerDB from '../DAL/dao/productManagerMongo.js';

export const dbM = new ProductManagerDB()

// Importar todos los routers;

export const getProducts = async (req, res) => {

    try {
        const { limit, page, sort } = req.query
        let filterQuery = { ...req.query }
        if (limit) delete filterQuery.limit
        if (page) delete filterQuery.page
        if (sort) delete filterQuery.sort

        let arrProduct = await dbM.getProducts(limit, page, sort, filterQuery)
        return res.status(200).json({
            status: "success",
            ...arrProduct
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ status: "error", error: e.message })
    }
}

// Endpoint para traer el producto solicitado by id en el params
export const getOneProductById = async (req, res) => {
    const { pid } = req.params
    if (!pid) return res.status(400).json({ status: "error", error: "Debe enviar un id de producto por params" })
    try {
        let payload = await dbM.getProductById(pid)
        return res.status(200).json({ status: "success", payload, })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ status: "error", error: e.message })
    }
}

export const createProduct = async (req, res) => {
    const { title, description, code, price,
        status, stock, category, thumbnail } = req.body
    if ([title, description, code, price, stock, category].includes(undefined)) return res.status(400).json({ error: "Faltan campos obligatorios" })
    try {
        let obj = {}

        obj.title = title.toString()
        obj.description = description.toString()
        obj.code = code.toString()
        obj.price = parseFloat(price)
        obj.status = Boolean(status ? status : true)
        obj.stock = parseInt(stock)
        obj.category = category.toString()
        obj.thumbnail = thumbnail ? thumbnail : []
        if (thumbnail && Array.isArray(thumbnail)) {
            for (let i = 0; i < thumbnail.length; i++) {
                obj.thumbnail[i] = thumbnail[i].toString();

            }
        }

        let arrProduct = await dbM.addProduct(obj)

        return res.status(200).json({ result: arrProduct })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: e.message })
    }


}

export const productUpdater = async (req, res) => {
    const { pid } = req.params
    let objeChanges = { ...req.body }
    delete objeChanges.id;
    const keysArr = Object.keys(objeChanges)

    if (pid && keysArr.length > 0) {
        try {

            if (objeChanges.title) objeChanges.title = objeChanges.title.toString()
            if (objeChanges.description) objeChanges.description = objeChanges.description.toString()
            if (objeChanges.code) objeChanges.code = objeChanges.code.toString()
            if (objeChanges.price) objeChanges.price = parseFloat(objeChanges.price)
            if (objeChanges.status) objeChanges.status = Boolean(objeChanges.status)
            if (objeChanges.stock) objeChanges.stock = parseInt(objeChanges.stock)
            if (objeChanges.category) objeChanges.category = objeChanges.category.toString()
            if (objeChanges.category) objeChanges.category = objeChanges.category.toString()
            if (objeChanges.thumbnail) objeChanges.thumbnail = objeChanges.thumbnail.toString();

                    
                
            


            let arrProduct = await dbM.updateProduct(pid, objeChanges)
            return res.status(200).json({ result: arrProduct })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: e.message })
        }
    } else return res.status(400).json({ error: "Debe enviar un id de producto por params y los campos a modificar por body" })

}

export const productDeleter = async (req, res) => {
    const { pid } = req.params

    if (!pid) return res.status(400).json({ error: "Debe enviar un id de producto por params" })
    try {
        await dbM.deleteProduct(pid)
        return res.status(200).json({ result: "Product Deleted" })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: e.message })
    }


}

export const productIdFinderDBM = dbM.getProductById