import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get(
    '/comment/resource/:resourceId/comments',
    controller.comment.getResourceComments
  );
};
