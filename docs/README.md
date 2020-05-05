## EggNeteaseCloudMusicApi

网易云音乐 EggJs 版 API，[github 地址](https://github.com/chenshengshui/EggNeteaseCloudMusicApi)，接口正在持续更新中，目前已经支持网易云音乐中的大部分接口，包含登录注册。

## 工作原理

跨站请求伪造 (CSRF), 伪造请求头 , 调用官方 API。

## 特别声明

```!
本项目不提供线上 demo，请不要轻易信任使用他人提供的公开服务，以免发生安全问题,泄露自己的账号和密码
```

```!
部分接口如登录接口不能调用太频繁 , 否则可能会触发 503 错误或者 ip 高频错误 ,若需频繁调用 , 需要准备 IP 代理池.
```

```!
本项目仅供学习使用,请尊重版权，请勿利用此项目从事商业行为
```

## EggJS 中间件实现

这里简要提一下 EggJs 的中间件。Egg 是基于 Koa 实现的，所以 Egg 的中间件形式和 Koa 的中间件形式是一样的，都是基于洋葱圈模型。

![](https://user-gold-cdn.xitu.io/2020/5/5/171e51167f32b872?w=478&h=435&f=png&s=63666)

### 处理 cookie 中间件

```javascript
/**
 * 处理cookie
 */
module.exports = () => {
  return async function (ctx, next) {
    const { response } = ctx;
    await next();
    response.append('Set-Cookie', response.body && response.body.cookie);
  };
};
```

### 错误处理中间件

```javascript
module.exports = () => {
  return async function (ctx, next) {
    try {
      await next();
    } catch (error) {
      ctx.body = error.body;
      ctx.status = error.status;
    }
  };
};
```

## 包含接口

```!
特别声明，接口示范使用以下格式
```

```javascript
Method /xxx/:xxxx/xxx

@body:
{
	"***": "**********",
	"**"?: "*********" // ?代表可选
}

@param:
{
    "***": "********"
}

@query:
{
    "***": "***********",
    "***"?: "**********"
}

```

```!
参数统一声明
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 :( 当前页码 -1)*30, 其中 30 为 limit 的值 , 默认为 0
```

![](https://user-gold-cdn.xitu.io/2020/5/5/171e3771ee906f99?w=2150&h=4258&f=png&s=1105014)

## 1.登录模块

#### 1.1 手机号登录

**必选参数** :

```
phone: 手机号码
password: 密码
```

**接口地址** :

```
/login/cellphone
```

**可选参数** :

```
rememberLogin: 30天免登录，默认false
```

**调用例子** :

```javascript
POST /login/cellphone

@body:
{
	phone: "**********",
	password: "*****",
	rememberLogin?: true

}
```

#### 1.2 邮箱登录

**必选参数** :

```
email: 手机号码
password: 密码
```

**接口地址** :

```
/login/email
```

**可选参数** :

```
rememberLogin: 30天免登录，默认false
```

**调用例子** :

```javascript
POST /login/email

@body:
{
	email: "**********",
	password: "*****",
	rememberLogin: true
}
```

#### 1.3 初始化昵称

**必选参数** :

```
nickname: 昵称
```

**接口地址** :

```
/login/init/profile
```

**调用例子** :

```javascript
POST /login/init/profile

@body
{
	nickname: "**********"
}
```

#### 1.4 发送手机验证码

**必选参数** :

```
cellphone: 手机号码
```

**接口地址** :

```
/login/sms/captcha/send
```

**可选参数** :

```
ctcode: 国家区号,默认86即中国
```

**调用例子** :

```javascript
POST /login/sms/captcha/send

// body
{
	ctcode?: "86",
	cellphone: "*******"
}
```

#### 1.5 校验手机验证码

**必选参数** :

```
cellphone: 手机号码
captcha: 验证码
```

**接口地址** :

```
/login/sms/captcha/verify
```

**可选参数** :

```
ctcode: 国家区号,默认86即中国
```

**调用例子** :

```javascript
POST /login/sms/captcha/verify

// body
{
	ctcode?: "86",
	cellphone: "*******",
	captcha: "****"
}
```

#### 1.6 检测手机号码是否已注册

**必选参数** :

```
cellphone: 手机号码
```

**接口地址** :

```
/login/cellphone/check/exist
```

**可选参数** :

```
countrycode: 国家码，用于国外手机号登陆，例如美国传入：1
```

**调用例子** :

```javascript
POST /login/cellphone/check/exist

// body
{
	countrycode?: "86",
	cellphone: "*******"
}
```

#### 1.7 刷新登录

**接口地址** :

/login/refresh

**调用例子** :

```javascript
GET / login / refresh;
```

#### 1.8 获取登录状态

**接口地址** :

```
/login/status
```

**调用例子** :

```javascript
GET / login / status;
```

#### 1.9 退出登录

**接口地址** :

```
/logout
```

**调用例子** :

```javascript
GET / logout;
```

## 2.用户模块

#### 2.1 获取用户录音

说明 : 登陆后调用此接口，可获取用户创建的电台

**必选参数** :

```
无
```

**接口地址** :

```
/user/audios
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / user / audios;
```

#### 2.2 删除用户云盘歌曲

说明 : 登陆后调用此接口，可删除云盘歌曲

**必选参数** :

```
ids: 歌曲id数组
```

**接口地址** :

```
/user/cloud/song/del
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
DELETE /user/cloud/song/del

@body
{
    ids: ["****","****"]
}
```

#### 2.3 获取用户云盘数据详情

说明: 登陆后调用此接口，传入云盘歌曲 ids，可获取云盘数据详情

**必选参数** :

```
ids: 多个歌曲id用","分隔
```

**接口地址** :

```
/user/cloud/songs/info
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET /user/cloud/songs/info

@query
{
	ids: "***,***"
}
```

#### 2.4 获取云盘音乐列表

说明： 登陆后调用此接口 , 可获取云盘数据 , 获取的数据没有对应 url, 需要再调用一 次 /song/url 获取 url。

**必选参数** :

```
无
```

**接口地址** :

```
/user/cloud
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 :( 当前页码 -1)*30, 其中 30 为 limit 的值 , 默认为 0
```

**调用例子** :

```javascript
GET /user/cloud

// query
{
	limit?: 100,
	offset?: 1
}
```

#### 2.5 获取用户信息

说明 : 登陆后调用此接口，可以获取用户详情

**必选参数** :

```
无
```

**接口地址** :

```
/user/info
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / user / info;
```

#### 2.6 获取用户电台

说明 : 登陆后调用此接口，可以获取用户电台

**必选参数** :

```
cellphone: 手机号码
```

**接口地址** :

```
无
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / user / djs;
```

#### 2.7 获取用户动态

说明 : 登陆后调用此接口，可以获取用户动态

**必选参数** :

```
无
```

**接口地址** :

```
/user/event
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
lasttime : 返回数据的 lasttime ,默认-1,传入上一次返回结果的 lasttime,将会返回下一页的数据
```

**调用例子** :

```javascript
GET /user/event

@query
{
	limit?: 30,
	lasttime: -1
}
```

#### 2.8 获取用户粉丝

说明 : 登陆后调用此接口，可以获取用户粉丝列表

**必选参数** :

```
无
```

**接口地址** :

```
/user/followeds
```

**可选参数** :

```
可选参数 : limit : 返回数量 , 默认为 30
lasttime : 返回数据的 lasttime ,默认-1,传入上一次返回结果的 lasttime,将会返回下一页的数据
```

**调用例子** :

```javascript
GET /user/followeds

@query
{
	limit?: 30,
	lasttime: -1
}
```

#### 2.9 获取用户关注者

说明 : 登陆后调用此接口，可以获取用户关注列表

**必选参数** :

```
无
```

**接口地址** :

```
/user/follows
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 :( 当前页码 -1)*30, 其中 30 为 limit 的值 , 默认为 0
```

**调用例子** :

```javascript
GET /user/follows

@query
{
    limit?: 30,
    offset?: 1
}
```

#### 2.10 获取用户播放列表

说明 : 登陆后调用此接口，可以获取用户歌单

**必选参数** :

```
无
```

**接口地址** :

```
/user/playlist
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 :( 当前页码 -1)*30, 其中 30 为 limit 的值 , 默认为 0
```

**调用例子** :

```javascript
GET /user/playlist

@query
{
    limit?: 30,
    offset?: 1
}
```

#### 2.11 获取用户播放记录

说明：登陆后调用此接口，可获取用户播放记录

**必选参数** :

```
无
```

**接口地址** :

```
/user/playrecord
```

**可选参数** :

```
type: type=1 时只返回周数据, type=0 时返回所有数据
```

**调用例子** :

```javascript
GET /user/playrecord

@query
{
	type?: 0
}
```

#### 2.12 获取用户收藏计数

说明：登陆后调用此接口，可获取用户收藏计数

**必选参数** :

```
无
```

**接口地址** :

```
/user/subcount
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / user / subcount;
```

#### 2.13 更新用户信息

说明 : 登陆后调用此接口，传入相关信息，可以更新用户信息

**必选参数** :

```
gender: 性别 0:保密 1:男性 2:女性

birthday: 出生日期,时间戳 unix timestamp

nickname: 用户昵称

province: 省份id // 可以调用/custom/citylist接口获取

city: 城市id // 可以调用/custom/citylist接口获取

signature：用户签名
```

**接口地址** :

```
/user/info
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
PUT /user/info

// body
{
    gender: 0
    birthday: 134567788
    nickname: "***"
    province: 400022
    city: 2344554
    signature："****"
}
```

#### 2.14 获取用户操作记录

说明 : 登陆后调用此接口，可以获取用户操作记录

**必选参数** :

```
无
```

**接口地址** :

```
/user/logs
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / user / logs;
```

#### 2.15 获取用户 FM

说明 : 登陆后调用此接口，可以获取用户 FM

**必选参数** :

```
无
```

**接口地址** :

```
/user/fm
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / user / fm;
```

#### 2.16 获取用户推荐电台节目

说明 : 调用此接口 , 可获取推荐电台

**必选参数** :

```
无
```

**接口地址** :

```
/user/rec/djprogram
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / user / rec / djprogram;
```

#### 2.17 获取用户推荐 MV

说明 : 调用此接口 , 可获取推荐 MV

**必选参数** :

```
无
```

**接口地址** :

```
/user/rec/mv
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / user / rec / mv;
```

#### 2.18 获取用户推荐新歌

说明 : 调用此接口 , 可获取推荐新歌

**必选参数** :

```
无
```

**接口地址** :

```
/user/rec/newsong
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / user / rec / newsong;
```

#### 2.19 获取独家放送

说明 : 调用此接口 , 可获取独家放送

**必选参数** :

```
无
```

**接口地址** :

```
/user/privatecontent
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / user / privatecontent;
```

#### 2.20 获取用户推荐歌单

说明 : 调用此接口 , 可获取独独家推荐歌单

**必选参数** :

```
无
```

**接口地址** :

```
/user/rec/playlist
```

**可选参数** :

```
limit：返回数量 , 默认为 30
```

**调用例子** :

```javascript
GET /user/rec/playlist

@query
{
	limit?: 30
}
```

## 3.专辑模块

#### 3.1 获取专辑动态信息

说明 : 调用此接口 , 可获取专辑动态信息

**必选参数** :

```
albumId: 专辑ID
```

**接口地址** :

```
/album/:albumId/detail/dynamic
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET /album/:albumId/detail/dynamic

@param
{
	albumId: 12244
}
```

#### 3.2 获取最新专辑

说明 : 调用此接口 , 可获取最新专辑

**必选参数** :

```
无
```

**接口地址** :

```
/album/latest
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / album / latest;
```

#### 3.3 收藏｜取消收藏 专辑

说明 : 调用此接口 , 可收藏｜取消收藏 专辑

**必选参数** :

```
albumId：专辑ID
actionType: 操作类型，收藏："sub" ，取消收藏："unsub"
```

**接口地址** :

```
/album/:albumId/sub/:actionType
```

**可选参数** :

```
limit：返回数量 , 默认为 30
```

**调用例子** :

```javascript
POST /album/:albumId/sub/:actionType

@param
{
	albumId: "****",
	actionType: "sub"
}
```

#### 3.4 获取收藏专辑列表

说明 : 调用此接口 , 可获取收藏专辑列表

**必选参数** :

```
无
```

**接口地址** :

```
/album/sublist
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 :( 当前页码 -1)*30, 其中 30 为 limit 的值 ,
```

**调用例子** :

```javascript
GET /album/sublist

@query
{
    offset?: 0,
	limit?: 30
}
```

#### 3.5 获取专辑信息

说明 : 调用此接口 , 可获取专辑信息

**必选参数** :

```
albumId: 专辑ID
```

**接口地址** :

```
/album/:albumId/info
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET /album/:albumId/info

@param
{
	albumId: "****"
}
```

## 4.歌手模块

#### 4.1 获取歌手列表

说明 : 调用此接口 , 可获取歌手列表

**必选参数** :

```
无
```

**接口地址** :

```
/artist/list
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
initial: a-z/A-Z，按首字母索引查找参数,如 initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,未热门传0
categoryCode:
    入驻歌手 5001
    华语男歌手 1001
    华语女歌手 1002
    华语组合/乐队 1003
    欧美男歌手 2001
    欧美女歌手 2002
    欧美组合/乐队 2003
    日本男歌手 6001
    日本女歌手 6002
    日本组合/乐队 6003
    韩国男歌手 7001
    韩国女歌手 7002
    韩国组合/乐队 7003
    其他男歌手 4001
    其他女歌手 4002
    其他组合/乐队 4003
```

**调用例子** :

```javascript
GET /artist/list

@param
{
	limit?: 30,
	offset?: 1
	categoryCode: 1001,
	initial: 'a'
}
```

#### 4.2 获取歌手简介

说明 : 调用此接口 , 可获取歌手简介

**必选参数** :

```
artistId: 歌手ID
```

**接口地址** :

```
/artist/:artistId/brief
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET /artist/:artistId/brief

@param
{
	artistId: "****"
}
```

#### 4.3 获取歌手信息

说明 : 调用此接口 , 可获取歌手信息

**必选参数** :

```
artistId: 歌手ID
```

**接口地址** :

```
/artist/:artistId/info
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET /artist/:artistId/info

@param
{
	artistId: "****"
}
```

#### 4.4 获取歌手专辑

说明 : 调用此接口 , 可获取歌手专辑

**必选参数** :

```
artistId: 歌手ID
```

**接口地址** :

```
/artist/:artistId/albums
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /artist/:artistId/albums

@param
{
	artistId: "****"
}
@query
{
    limit?: 30,
    offset: 1
}
```

#### 4.5 获取歌手 MV

说明 : 调用此接口 , 可获取歌手 MV

**必选参数** :

```
artistId: 歌手ID
```

**接口地址** :

```
/artist/:artistId/mv
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /artist/:artistId/mv

@param
{
	artistId: "****"
}
@query
{
    limit?: 30,
    offset: 1
}
```

#### 4.6 获取歌手 50 首流行歌曲

说明 : 调用此接口 , 可获取专辑信息

**必选参数** :

```
artistId: 歌手ID
```

**接口地址** :

```
/artist/:artistId/top/song
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET /artist/:artistId/top/song

@param
{
	artistId: "****"
}
```

#### 4.7 收藏｜取消收藏歌手

说明 : 调用此接口 , 可获取专辑信息

**必选参数** :

```
artistId: 歌手ID
actionType: 操作类型，收藏："sub"，取消收藏："unsub"
```

**接口地址** :

```
/artist/:artistId/sub/:actionType
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET /artist/:artistId/sub/:actionType

@param
{
	artistId: "****",
	actionType: "sub"
}
```

#### 4.8 获取订阅歌手列表

说明 : 调用此接口 , 可获取专辑信息

**必选参数** :

```
无
```

**接口地址** :

```
/artist/sublist
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /artist/sublist

@query
{
    limit?: 30,
    offset?: 1
}
```

## 5.评论模块

#### 5.1 获取资源评论

说明 : 调用此接口 , 可获取资源评论

**必选参数** :

```
type: 资源类型，可选：
    专辑："album",
    电台："dj"
    歌曲："music",
    MV："mv",
    歌单："playlist",
    视频："video",
    动态："event"
resourceId: 资源ID
```

**接口地址** :

```
/comment/resource/:resourceId/comments
```

**可选参数** :

```
limit: 取出评论数量 , 默认为 20
offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
beforeTime: 分页参数,取上一页最后一项的time，获取下一页数据(获取超过5000条评论的时候需要用到)
```

**调用例子** :

```javascript
GET /comment/resource/:resourceId/hot/comments

@param {
    resourceId: "***"
}
@query
{
    limit?: 30,
    offset?: 1,
    type: "music",
    beforeTime: 0
}
```

#### 5.2 获取资源热门评论

说明 : 调用此接口 , 可获取资源热门评论

**必选参数** :

```
type: 资源类型，可选：
    专辑："album",
    电台："dj"
    歌曲："music",
    MV："mv",
    歌单："playlist",
    视频："video",
    动态："event"
resourceId: 资源ID
```

**接口地址** :

```
/comment/resource/:resourceId/hot/comments
```

**可选参数** :

```
limit: 取出评论数量 , 默认为 20
offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
beforeTime: 分页参数,取上一页最后一项的time，获取下一页数据(获取超过5000条评论的时候需要用到)
```

**调用例子** :

```javascript
GET /comment/resource/:resourceId/hot/comments

@param {
    resourceId: "***"
}
@query
{
    limit?: 30,
    offset?: 1,
    type: "music",
    beforeTime: 0
}
```

#### 5.3 获取资源云村热评

说明 : 调用此接口 , 可获取资源云村热评

**必选参数** :

```
无
```

**接口地址** :

```
/comment/hotwall/list
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / comment / hotwall / list;
```

#### 5.4 点赞 ｜ 取消点赞 评论

说明 : 调用此接口 , 可点赞 ｜ 取消点赞 评论

**必选参数** :

```
resourceId: 资源ID
actionType: 操作类型，点赞："like"，取消点赞："unlike"
commentId: 评论ID
type: 资源类型，可选：
    专辑："album",
    电台："dj"
    歌曲："music",
    MV："mv",
    歌单："playlist",
    视频："video",
    动态："event"
```

**接口地址** :

```
/comment/resource/:resourceId/like/:actionType
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
POST /comment/resource/:resourceId/like/:actionType

@param
{
    resourceId: "***",
    actionType: "like"
}
@body
{
   commentId: "***",
   type: "music"
}
```

#### 5.5 发表资源评论

说明 : 调用此接口 , 可发表资源评论

**必选参数** :

```
resourceId: 资源ID
content: 评论内容
type: 资源类型，可选：
    专辑："album",
    电台："dj"
    歌曲："music",
    MV："mv",
    歌单："playlist",
    视频："video",
    动态："event"
```

**接口地址** :

```
/comment/resource/:resourceId/comment/send
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
POST /comment/resource/:resourceId/comment/send

@body
{
    resourceId: "***",
    content: "***",
    type: "music"
}
```

#### 5.5 删除资源评论

说明 : 调用此接口 , 可删除资源评论

**必选参数** :

```
resourceId: 资源ID
commentId: 评论ID
type: 资源类型，可选：
    专辑："album",
    电台："dj"
    歌曲："music",
    MV："mv",
    歌单："playlist",
    视频："video",
    动态："event"
```

**接口地址** :

```
/comment/resource/:resourceId/comment
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
DELETE /comment/resource/:resourceId/comment

@param
{
    resourceId: "***"
}
@body {
    commentId: "***",
    type: "music"
}
```

#### 5.6 回复资源评论

说明 : 调用此接口 , 可回复资源评论

**必选参数** :

```
resourceId: 资源ID
commentId: 评论ID
content: 评论内容
type: 资源类型，可选：
    专辑："album",
    电台："dj"
    歌曲："music",
    MV："mv",
    歌单："playlist",
    视频："video",
    动态："event"
```

**接口地址** :

```
/comment/resource/:resourceId/comment/:commentId/reply
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
POST /comment/resource/:resourceId/comment/:commentId/reply

@param
{
    resourceId: "***",
    commentId: "***"
}
@body {
    content: "****",
    type: "music"
}
```

## 6.MV 模块

#### 6.1 获取 MV 列表

说明 : 调用此接口 , 可获取 MV 列表

**必选参数** :

```
无
```

**接口地址** :

```
/mv/list
```

**可选参数** :

```
area:地区，默认 0
    全部: 0,
    内地: 1,
    港台: 2,
    欧美: 3,
    日本: 4,
    韩国: 5
type: 类型，默认 0
    全部: 0,
    官方版: 1,
    原生: 2,
    现场版: 3,
    网易出品: 4
order: 排序，默认 0
    上升最快: 0,
    最热: 1,
    最新: 2
limit: 返回数量 , 默认为 30
offset: 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /mv/list

@query
{
    area?: 0,
    type?: 0,
    order?: 0,
    offset?: 1,
    limit?: 30,
}
```

#### 6.2 获取 MV 详情

说明 : 调用此接口 , 可获取 MV 详

**必选参数** :

```
mvId: MV ID
```

**接口地址** :

```
/mv/:mvId/detail
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET /mv/:mvId/detail

@param
{
    mvId: "***"
}
```

#### 6.3 获取网易出品 MV

说明 : 调用此接口 , 可获取网易出品 MV

**必选参数** :

```
无
```

**接口地址** :

```
/mv/exclusive/rcmd
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /mv/exclusive/rcmd

@query
{
    limit?: 30,
    offset?: 1
}
```

#### 6.4 获取最新 MV

说明 : 调用此接口 , 可获取最新 MV

**必选参数** :

```
无
```

**接口地址** :

```
/mv/latest
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /mv/latest

@query
{
    limit?: 30,
    offset?: 1
}
```

#### 6.5 收藏 ｜ 取消收藏 MV

说明 : 调用此接口 , 可收藏 ｜ 取消收藏 MV

**必选参数** :

```
mvId: MV ID
actionType: 操作类型，收藏："sub"，取消收藏："unsub"
```

**接口地址** :

```
/mv/:mvId/sub/:actionType
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET /mv/:mvId/sub/:actionType

@param
{
    mvId: "***",
    actionType: "sub"
}
```

#### 6.6 获取 MV 收藏列表

说明 : 调用此接口 , 获取 MV 收藏列表

**必选参数** :

```
无
```

**接口地址** :

```
/mv/sublist
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /mv/sublist

@query
{
    limit?: 30,
    offset?: 1
}
```

#### 6.7 获取 MV URL

说明 : 调用此接口 , 可获取专辑信息

**必选参数** :

```
mvId: MV ID
resolution: 分辨率，默认1080
```

**接口地址** :

```
/mv/url
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET /mv/url

@query
{
    mvId: "***",
    resolution?: 1080
}
```

## 7.电台模块

#### 7.1 获取电台 banner

说明 : 调用此接口 , 可获取电台 banner

**必选参数** :

```
无
```

**接口地址** :

```
/dj/banner
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / dj / banner;
```

#### 7.2 获取电台非热门分类

说明 : 调用此接口 , 可获取电台非热门分类

**必选参数** :

```
无
```

**接口地址** :

```
/dj/category/excludehot
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / dj / category / excludehot;
```

#### 7.3 获取电台推荐分类

说明 : 调用此接口 , 可获取电台推荐分类

**必选参数** :

```
无
```

**接口地址** :

```
/dj/category/rec
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / dj / category / rec;
```

#### 7.4 获取电台分类列表

说明 : 调用此接口 , 可获取电台分类列表

**必选参数** :

```
无
```

**接口地址** :

```
/dj/category/list
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / dj / category / list;
```

#### 7.5 获取热门电台

说明 : 调用此接口 , 可获取热门电台

**必选参数** :

```
无
```

**接口地址** :

```
/dj/hot
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /dj/hot

@query
{
    limit?: 30,
    offset?: 1
}
```

#### 7.6 获取付费电台

说明 : 调用此接口 , 可获取付费电台

**必选参数** :

```
无
```

**接口地址** :

```
/dj/paygift
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /dj/paygift

@query
{
    limit?: 30,
    offset?: 1
}
```

#### 7.7 获取电台 24 小时节目榜

说明 : 调用此接口 , 可获取电台 24 小时节目榜

**必选参数** :

```
无
```

**接口地址** :

```
/dj/program/toplist/hours
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
```

**调用例子** :

```javascript
GET /dj/program/toplist/hours

@query
{
    limit?: 30
}
```

#### 7.8 获取电台节目榜单

说明 : 调用此接口 , 可获取电台节目榜单

**必选参数** :

```
无
```

**接口地址** :

```
/dj/program/toplist
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /dj/program/toplist

@query
{
    limit?: 30,
    offset?: 1
}
```

#### 7.9 获取电台节目列表

说明 : 调用此接口 , 可获取电台节目列表

**必选参数** :

```
djId: 电台ID
```

**接口地址** :

```
/dj/:djId/program/list
```

**可选参数** :

```
asc: 排序方式,默认为 false (新 => 老 ) 设置 true 可改为 老 => 新
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /dj/:djId/program/list

@param
{
    djId: "***"
}
@query
{
    asc?: false,
    limit?: 30,
    offset?: 1
}
```

#### 7.10 获取分类热门电台

说明 : 调用此接口 , 可获取分类热门电台

**必选参数** :

```
categoryId: 分类ID
```

**接口地址** :

```
/dj/category/:categoryId/djs
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /dj/category/:categoryId/djs

@param
{
    categoryId: "***"
}
@query
{
    limit?: 30,
    offset?: 1
}
```

#### 7.11 精选分类电台列表

说明 : 调用此接口 , 可获取精选分类电台列表

**必选参数** :

```
typeId: 类型ID，数字
  有声书: 10001,
  知识技能: 453050,
  商业财经: 453051,
  人文历史: 11,
  外语世界: 13,
  亲子宝贝: 14,
  创作|翻唱: 2001,
  音乐故事: 2,
  3D|电子: 10002,
  相声曲艺: 8,
  情感调频: 3,
  美文读物: 6,
  脱口秀: 5,
  广播剧: 7,
  二次元: 3001,
  明星做主播: 1,
  娱乐|影视: 4,
  科技科学: 453052,
  校园|教育: 4001,
  旅途|城市: 12,
```

**接口地址** :

```
/dj/type/:typeId/rec/djs
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET /dj/type/:typeId/rec/djs

@param
{
    typeId: 1
}
```

#### 7.12 获取推荐电台

说明 : 调用此接口 , 可获取推荐电台

**必选参数** :

```
无
```

**接口地址** :

```
/dj/rec/djs
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET / dj / rec / djs;
```

#### 7.13 订阅 ｜ 取消订阅 电台

说明 : 调用此接口 , 订阅 ｜ 取消订阅 电台

**必选参数** :

```
djId: 电台ID
actionType: 操作类型，订阅："sub" 取消订阅："unsub"
```

**接口地址** :

```
/dj/:djId/sub/:actionType
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
POST /dj/:djId/sub/:actionType

@param
{
    djId: "***",
    actionType: "sub"
}
```

#### 7.14 获取订阅电台列表

说明 : 调用此接口 , 可获取订阅电台列表

**必选参数** :

```
无
```

**接口地址** :

```
/dj/sublist
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /dj/sublist

@query
{
    limit?: 30,
    offset?: 1
}
```

#### 7.15 获取今日优选电台

说明 : 调用此接口 , 可获取今日优选电台

**必选参数** :

```
无
```

**接口地址** :

```
/dj/totay/perfered
```

**可选参数** :

```
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /dj/totay/perfered

@query
{
    offset?: 1
}
```

#### 7.16 获取 24 小时榜电台

说明 : 调用此接口 , 可获取 24 小时榜电台

**必选参数** :

```
无
```

**接口地址** :

```
/dj/toplist/hours
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
```

**调用例子** :

```javascript
GET /dj/toplist/hours

@query
{
    limit?: 30
```

#### 7.17 电台新人榜

说明 : 调用此接口 , 可获取电台新人榜

**必选参数** :

```
无
```

**接口地址** :

```
/dj/toplist/newcomer
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /dj/toplist/newcomer

@query
{
    limit?: 30,
    offset?: 1
}
```

#### 7.18 付费精品

说明 : 调用此接口 , 可付费精品

**必选参数** :

```
无
```

**接口地址** :

```
/dj/toplist/pay
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
```

**调用例子** :

```javascript
GET /dj/toplist/pay

@query
{
    limit?: 30
}
```

#### 7.19 流行热榜

说明 : 调用此接口 , 可获取流行热榜

**必选参数** :

```
无
```

**接口地址** :

```
/dj/toplist/popular
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
```

**调用例子** :

```javascript
GET /dj/toplist/popular

@query
{
    limit?: 30
}
```

#### 7.20 电台热榜

说明 : 调用此接口 , 可获取专辑信息

**必选参数** :

```
无
```

**接口地址** :

```
/dj/toplist
```

**可选参数** :

```
type:  榜单类型, 0 为新晋电台榜,1 为热门电台榜,默认为0
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /dj/toplist

@query
{
    type: 0,
    limit?: 30,
    offset?: 1
}
```

#### 7.21 获取电台节目详情

说明 : 调用此接口 , 可获取电台节目详情

**必选参数** :

```
djId: 电台ID
```

**接口地址** :

```
/dj/:djId/program/detail
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET /dj/:djId/program/detail

@param
{
    djId: "***"
}
```

#### 7.22 获取电台详情

说明 : 调用此接口 , 可获取电台详情

**必选参数** :

```
djId: 电台ID
```

**接口地址** :

```
/dj/:djId/detail
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET /dj/:djId/detail

@param
{
    djId: "***"
}
```

## 8.排行榜模块

#### 8.1 专辑排行榜

说明 : 调用此接口 , 可获取专辑排行榜

**必选参数** :

```
无
```

**接口地址** :

```
/top/album
```

**可选参数** :

```
area: 'ALL' | 'ZH' | 'EA' | 'KR' | 'JP'
    全部： ALL
    华语：ZH
    欧美：EA
    韩国：KR
    日本：JP
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /top/album

@query
{
    area?: 'ZH',
    limit?: 30,
    offset?: 1
}
```

#### 8.2 获取热门歌手

说明 : 调用此接口 , 获取热门歌手

**必选参数** :

```
无
```

**接口地址** :

```
/top/artist
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /top/artist

@query
{
    limit?: 30,
    offset?: 1
}
```

#### 8.3 获取新歌列表

说明 : 调用此接口 , 获取新歌列表

**必选参数** :

```
type: 新歌类型，数字，0 - 36
    云音乐新歌榜：0
    云音乐热歌榜：1
    云音乐原创榜：2
    云音乐飙升榜：3
    云音乐电音榜：4
    UK排行榜周榜：5
    美国Billboard周榜：6
    KTV嗨榜：7
    iTunes榜：8
    Hit FM Top榜：9
    日本Oricon周榜：10
    韩国Melon排行榜周榜：11
    韩国Mnet排行榜周榜：12
    韩国Melon原声周榜：13
    中国TOP排行榜(港台榜)：14
    中国TOP排行榜(内地榜)：15
    香港电台中文歌曲龙虎榜：16
    华语金曲榜：17
    中国嘻哈榜：18
    法国 NRJ EuroHot 30周榜：19
    台湾Hito排行榜：20
    Beatport全球电子舞曲榜：21
    云音乐ACG音乐榜：22
    云音乐说唱榜：23
    云音乐古典音乐榜：24
    云音乐电音榜：25
    抖音排行榜：26
    新声榜：27
    云音乐韩语榜：28
    英国Q杂志中文版周榜：29
    电竞音乐榜：30
    云音乐欧美热歌榜：31
    云音乐欧美新歌榜：32
    说唱TOP榜：33
    云音乐ACG动画榜：34
    云音乐ACG游戏榜：35
    云音乐ACG VOCALOID榜：36
```

**接口地址** :

```
/top/list
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET /top/list

@query
{
    type: 0
}
```

#### 8.4 获取 MV 排行榜

说明 : 调用此接口 , 获取 MV 排行榜

**必选参数** :

```
无
```

**接口地址** :

```
/top/mv
```

**可选参数** :

```
area:   '全部' | '内地' | '港台' | '欧美' | '日本' | '韩国', 默认为全部
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /top/mv

@query
{
    area: '内地',
    limit?: 30,
    offset?: 1
}
```

#### 8.5 获取高质量歌单排行榜

说明 : 调用此接口 , 获取高质量歌单排行榜

**必选参数** :

```
无
```

**接口地址** :

```
/top/quality/playlist
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
lasttime: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据,默认为0
category: 分类
  可选类型： 全部,华语,欧美,韩语,日语,粤语,小语种,运动,ACG,影视原声,流行,摇滚,后摇,古风,民谣,轻音乐,电子,器乐,说唱,古典,爵士
```

**调用例子** :

```javascript
GET /top/quality/playlist

@query
{
    category: '华语'
    limit?: 30,
    lasttime: 0,
}
```

#### 8.6 获取歌单排行榜

说明 : 调用此接口 , 获取歌单排行榜

**必选参数** :

```
无
```

**接口地址** :

```
/top/playlist
```

**可选参数** :

```
order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'

category: ,分类，" 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/category/list)

limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /top/playlist

@query
{
    order?: 'new',
    category?: '古风'
    limit?: 30,
    offset?: 1
}
```

#### 8.7 新歌榜单

说明 : 调用此接口 , 可获取新歌榜单

**必选参数** :

```
无
```

**接口地址** :

```
top/songs
```

**可选参数** :

```
area:'全部' | '华语' | '欧美' | '日本' | '韩国
```

**调用例子** :

```javascript
GET /top/songs

@query
{
    area: '华语'
}
```

#### 8.8 获取歌手榜

说明 : 调用此接口 , 获取歌手榜

**必选参数** :

```
无
```

**接口地址** :

```
/toplist/artist
```

**可选参数** :

```
type: 数字，可选1-4
  1: '华语',
  2: '欧美',
  3: '日本',
  4: '韩国',
```

**调用例子** :

```javascript
GET /toplist/artist

@query
{
   type: 2
}
```

#### 8.9 所有榜单内容摘要

说明 : 调用此接口 , 获取所有榜单内容摘要

**必选参数** :

```
无
```

**接口地址** :

```
/toplist/detail
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / toplist / detail;
```

#### 8.10 榜单介绍

说明 : 调用此接口 , 可获取榜单介绍

**必选参数** :

```
无
```

**接口地址** :

```
/toplist/introduction
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / toplist / introduction;
```

## 9.视频模块

#### 9.1 获取视频信息

说明 : 调用此接口 , 获取视频信息

**必选参数** :

```
videoId：视频ID
```

**接口地址** :

```
/video/:videoId/detail
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET /video/:videoId/detail

@query
{
    videoId: "***"
}
```

#### 9.2 获取视频分组列表

说明 : 调用此接口 , 获取视频分组列表

**必选参数** :

```
无
```

**接口地址** :

```
/video/group/list
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / video / group / list;
```

#### 9.3 获取视频分组下的视频

说明 : 调用此接口 , 获取视频分组下的视频

**必选参数** :

```
groupId: 分组ID
```

**接口地址** :

```
/video/group/videos
```

**可选参数** :

```
resolution：分辨率，默认1080
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /video/group/videos

@query
{
    groupId: "***",
    resolution?: 1080,
    offset?: 1
}
```

#### 9.4 收藏｜取消收藏 视频

说明 : 调用此接口 , 收藏｜取消收藏 视频

**必选参数** :

```
videoId：视频ID
actionType：操作类型，收藏："sub"，取消收藏: "unsub"
```

**接口地址** :

```
/video/:videoId/sub/:actionType
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
POST /video/:videoId/sub/:actionType

@query
{
    videoId: "***",
    actionType: "sub"
}
```

#### 9.5 获取视频 URL

说明 : 调用此接口 , 可获取专辑信息

**必选参数** :

```
videoIds: 视频ID，多个以逗号分隔
```

**接口地址** :

```
/video/urls
```

**可选参数** :

```
resolution：分辨率，默认1080
```

**调用例子** :

```javascript
GET /video/urls

@query
{
    videoIds: "***,***",
    resolution?: 1080
}
```

## 10.歌单模块

#### 10.1 获取歌单分类列表

说明 : 调用此接口 , 获取歌单分类列表

**必选参数** :

```
无
```

**接口地址** :

```
/playlist/category/list
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / playlist / category / list;
```

#### 10.2 创建歌单

说明 : 调用此接口 , 创建歌单

**必选参数** :

```
name: 歌单名字，
privacy：0 为普通歌单，10 为隐私歌单
```

**接口地址** :

```
/playlist/create
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
POST /playlist/create

@query
{
    name: "***",
    privacy: 0
}
```

#### 10.3 删除歌单

说明 : 调用此接口 , 删除歌单

**必选参数** :

```
pid：歌单ID
```

**接口地址** :

```
/playlist/delete
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
DELETE /playlist/delete

@body
{
    pid: "***"
}
```

#### 10.4 更新歌单描述

说明 : 调用此接口 , 更新歌单描述

**必选参数** :

```
pid: 歌单ID
description: 描述
```

**接口地址** :

```
/playlist/des/update
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
PUT /playlist/des/update

@query
{
    pid: "***",
    description: "***"
}
```

#### 10.5 获取歌单详情

说明 : 调用此接口 , 获取歌单详情

**必选参数** :

```
pid: 歌单ID
```

**接口地址** :

```
/playlist/detail
```

**可选参数** :

```
subNum:  歌单最近的 subNum 个收藏者
```

**调用例子** :

```javascript
GET /playlist/detail

@query
{
    pid: "****",
    subNum?: 10
}
```

#### 10.6 获取热门歌单

说明 : 调用此接口 , 获取热门歌单

**必选参数** :

```
无
```

**接口地址** :

```
/playlist/hot
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
GET / playlist / hot;
```

#### 10.7 更新歌单名

说明 : 调用此接口 , 更新歌单名

**必选参数** :

```
pid: 歌单ID
name: 歌单名
```

**接口地址** :

```
/playlist/name/update
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
PUT /playlist/name/update

@query
{
    pid: "***",
    name: "***"
}
```

#### 10.8 订阅 ｜ 取消订阅 歌单

说明 : 调用此接口 , 订阅 ｜ 取消订阅 歌单

**必选参数** :

```
pid: 歌单ID
actionType: 订阅：'subscribe' 取消订阅： 'unsubscribe'
```

**接口地址** :

```
/playlist/:pid/sub/:actionType
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
POST /playlist/:pid/sub/:actionType

@param
{
  pid: "***",
  actionType: "subscribe"
}
```

#### 10.9 获取歌单订阅者

说明 : 调用此接口 , 获取歌单订阅者

**必选参数** :

```
pid: 歌单ID
```

**接口地址** :

```
/playlist/:pid/subscribers
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
GET /playlist/:pid/subscribers

@param
{
    pid: "***"
}
@query
{
    limit?: 30,
    offset?: 1
}
```

#### 10.10 更新歌单标签

说明 : 调用此接口 , 更新歌单标签

**必选参数** :

```
pid: 歌单ID
tags: 歌单标签
```

**接口地址** :

```
/playlist/:pid/tags/update
```

**可选参数** :

```
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值,默认为 0
```

**调用例子** :

```javascript
PUT /playlist/:pid/tags/update

@query
{
   pid: "***"
}
@body
{
    tags: "***"
}
```

#### 10.11 添加歌单歌曲

说明 : 调用此接口 , 添加歌单歌曲

**必选参数** :

```
pid: 歌单ID
songIds：歌曲ID数组
```

**接口地址** :

```
/playlist/:pid/songs/add
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
POST /playlist/:pid/songs/add

{
   pid: "***"
}
@body
{
    songIds: ["***", "****"]
}
```

#### 10.12 删除歌单歌曲

说明 : 调用此接口 , 可获取专辑信息

**必选参数** :

```
pid: 歌单ID
songIds：歌曲ID数组
```

**接口地址** :

```
/playlist/:pid/songs/del
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
DELETE /playlist/:pid/songs/del

@param
{
   pid: "***"
}
@body
{
    songIds: ["***", "****"]
}
```

#### 10.13 更新歌单

说明 : 调用此接口 , 可获取专辑信息

**必选参数** :

```
pid: 歌单ID
description：描述
tags：标签
```

**接口地址** :

```
/playlist/:pid/update
```

**可选参数** :

```
无
```

**调用例子** :

```javascript
PUT /playlist/:pid/update

{
   pid: "***"
}
@body
{
    description: "***",
    tags: "***"
}
```

## 结语

目前的实现的接口主要是这些，接口暂时未经过严格的测试，如有问题，请给我提 issue。贡献出来，是方便大家一起学习，禁止商用。下期预告，webpack 环境配置。

> @author: WaterMan
