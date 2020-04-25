import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get(
    '/comment/resource/:resourceId/comments',
    controller.comment.getResourceComments
  );

  router.get(
    '/comment/resource/:resourceId/hot/comments',
    controller.comment.getResourceHotComments
  );

  router.get('/comment/hotwall/list', controller.comment.getCommentHotwall);

  router.post(
    '/comment/resource/:resourceId/like/:actionType',
    controller.comment.postResourceCommentLike
  );

  router.post(
    '/comment/resource/:resourceId/comment/send',
    controller.comment.postResourceCommentSend
  );

  router.delete(
    '/comment/resource/:resourceId/comment',
    controller.comment.deleteResourceComment
  );

  router.post(
    '/comment/resource/:resourceId/comment/:commentId/reply',
    controller.comment.postResourceCommentReply
  );
};
