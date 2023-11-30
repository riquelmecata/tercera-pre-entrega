export const adminValidator = (req, res, next) => {
    console.log(req.user.adminRole)
    if (req?.user?.adminRole == "admin") return next()
    return res.status(401).json({ error: "unauthorized, only for admin" });

}

export const userValidator = (req, res, next) => {
    console.log(req.user.adminRole)
    if (req?.user?.adminRole == "user") return next()
    return res.status(401).json({ error: "unauthorized, only for user" });

}