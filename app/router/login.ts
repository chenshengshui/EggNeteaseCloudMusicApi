import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/login/cellphone', controller.login.loginByCellPhone);
  router.post('/login/init/profile', controller.login.postInitProfile);
};
