const verifyRoles = (...allowedRoles) =>{
    return (req,res,next) =>{
        if (!req?.roles) return res.status(401).send("Unauthorized verificando roles");
        const rolesArray = [...allowedRoles];
        console.log("rolesarray",rolesArray);
        console.log(req.roles);
        const result = req.roles.map(role => rolesArray.includes(role)).find(val =>val===true);
        if (!result) return res.status(401).send("Unauthorized roles no incluidos en array");
        next();
    }
}

module.exports = verifyRoles;

