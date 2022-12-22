const jwt = require("jsonwebtoken")
const key = process.env.SECRET_KEY;


exports.tokenInterceptor = async (req, res, next) => {
    // on va checker si le token est présent dans le header de ma requete "Authorization"
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(' ')[1]

    if(token == null ) {
        return res.status(401).json("Token manquant")
    }

    jwt.verify(token, key, (err, user) => {
        if(err) return res.status(401).send("Token Invalide")
        req.user = user

        next()
    })

}