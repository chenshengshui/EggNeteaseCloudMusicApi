import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.post('/login/cellphone', controller.login.loginByCellPhone);
};
