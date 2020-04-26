import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.post('/login/cellphone', controller.login.loginByCellPhone);
  router.post('/login/init/profile', controller.login.postInitProfile);
  router.post('/login/sms/captcha/send', controller.login.postLoginCaptchaSend);
  router.post(
    '/login/sms/captcha/verify',
    controller.login.postLoginCaptchaVerify
  );
  router.post(
    '/login/cellphone/check/exist',
    controller.login.postCheckCellphoneExit
  );
  router.get('/login/refresh', controller.login.getLoginRefresh);
  router.get('/login/status', controller.login.getLoginStatus);
  router.get('/logout', controller.login.getLogout);
};
