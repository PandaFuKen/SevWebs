export const renderRegister = (req, res) => {
  // Los estados ya están disponibles en `res.locals.estados` gracias al middleware `obtenerEstados`
  res.render('register', { title: 'Registro', estados: res.locals.estados });
};