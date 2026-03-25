export const loginuser = (req, res) => {
  // Renderiza la vista de inicio de sesión
  res.render('login', { title: 'Iniciar Sesión' });
}