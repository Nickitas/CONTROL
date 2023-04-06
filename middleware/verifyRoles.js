export const verifyRoles = (req, res, allowedRoles) => {
    if (!req?.roles) return res.code(401).send()
    const result = req.roles.map(role => allowedRoles.includes(role)).find(val => val === true)
    if (!result) return res.code(401).send()
}
