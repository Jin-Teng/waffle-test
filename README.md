## Mock API Routes
```
/posts
/posts/counts
/posts/counts?date=2020-08-10
/posts/counts?date=2020-08-09
/posts/counts?begin_timestamp=2020-08-04&end_timestamp=2020-08-10

/users/login
/users/logout
/users/profile
```

## JSON server
* use JSON server
* install `npm install json-server`
* run JSON server `json-server --watch --routes routes.json db.json`

## Color scheme
* use scss global variables

## Article
* format Materials DatePicker
* API /posts Response 沒有回覆的資料，set value 0
* 時間處理改 MomentPipe

## Dashboard
* 時間處理改 MomentPipe

## app.component
* 改用 behavior subject 同步登入狀態

## Login
* use session storage save user status (jwt & role)
* 受限 JSON server POST 是新增沒辦法取得回傳，所以目前 login/logout 改用 get 做模擬，正確 post 方法寫在 auth.service 裡
* add button hover (use attribute directive)

## Auth
* auth.interceptor 攔截 request 加入 header : jwt, Content-Type
* auth.guard 保護 home, dashboard, article
* member.guard 保護 book
