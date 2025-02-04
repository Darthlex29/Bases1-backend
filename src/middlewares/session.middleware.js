export const checkSession = (req, res, next) => {
  if (req.session.user) {
    console.log("Verificacion usuario loggeado")
    req.user = req.session.user;
    console.log("Usuario en sesion:", req.user);
    console.log("id usuario en sesion:", req.user.id);
    console.log("email en sesion:", req.user.email);
    next();
  } else {
    res.status(401).json({ message: "No autorizado" });
  }
};
