const {UserModel} = require("../models/UserModel");
const bcrypt = require("bcrypt")
const ObjectID = require("mongoose").Types.ObjectId
const jwt = require("jsonwebtoken")


exports.findAll = async (req, res) => {
    UserModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log("impossible de récupérer les user:" + err)
    })
}

exports.findById = async (req, res) => {
    UserModel.findById(
       req.params.id,
        (err, docs) => {
           if(!err) {
               return res.json({msg: "Utilisateur avec id :" + req.params.id + " trouvé" , data: docs})
           } else  {
               console.log("Utilisateur introuvable")
           }
        }
    )
}

exports.register = async (req, res) => {
    // avec la destucturation je récupère les valeur du body
    const {email, password, firstName, lastName, role, birthday, username} = req.body;
    const userAlreadyexist = await UserModel.findOne({email})
    // on check si l'utilisateur est déjà présent en base
    if(userAlreadyexist) {
        return res.status(403).send("Utilisateur déjà existant. Connectez-vous")
    }

    // je hash le mot de passe avant de l'envoyer en base
    let passwordCrypted = await bcrypt.hash(password, 10);
    // je construis mon nouvel utilisateur
    const newUser = new UserModel({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: passwordCrypted,
        role: role,
        birthday: birthday,
        username: username
    })
    // je sauvegarde mon user en base
    newUser.save((err, docs) => {
        if(!err) res.send(docs);
        else console.log("impossible de récupérer les user:" + err)
    })
}


exports.update = async (req, res) => {
    if(!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("Id Inconnu")
    }
    const {email, password, firstName, lastName, role, birthday, username} = req.body;
    let passwordCrypted = await bcrypt.hash(password, 10);

    const userUpdated = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: passwordCrypted,
        role: role,
        birthday: birthday,
        username: username
    }

    UserModel.findByIdAndUpdate(
        req.params.id,
        {$set: userUpdated},
        {new: true},
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("Erreur" + err)
        }
    )
}

exports.delete = async (req, res) => {
    if(!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("Id Inconnu")
    }
    UserModel.findByIdAndDelete(
        req.params.id,
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("Erreur: " + err)
        }
    )
}

exports.login = async (req, res) => {
    //
    try {
        // je récupère les données du formulaire
        const {email , password} = req.body;
        // verification en base si mon utilisateur il existe
        const user = await UserModel.findOne({email})
        console.log(user)
        if(user && (await bcrypt.compare(password, user.password))) {
            // expiration
            const expiresIn = 24*60*60 // 1 journée
            // création du token
            const token = jwt.sign(
                {user_id: user.id, email},
                process.env.SECRET_KEY,
                {expiresIn: expiresIn}
            );
            // on retourne l'utilisateur
            return res.status(200).json({
                msg: "Connexion Réussi",
                user: user,
                token: token
            })
        }
        return res.status(401).json({msg : "Identifiants erronés !"})
    } catch (err) {
        console.log(err)
    }
}



