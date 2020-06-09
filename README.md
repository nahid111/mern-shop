# mern-shop
<p>
MERN stack Ecommerce / Shopping-Cart
</p>

## Features
- [x] Token Based Auth
- [x] Verify Email
- [x] Forgot/Reset Password
- [x] image Upload
- [ ] Pagination
- [ ] Live Search
- [ ] Filter
- [ ] Cart
- [ ] Payment Gateway (Stripe)
- [ ] History


## Models
- User
- Product


# installation
- install NodeJs & npm
- install MongoDB
- install dependencies 
```
$ npm install
```
- install dependencies for the client
```
$ cd client && npm install
```
- Copy & rename .env.example file to .env
- Set env variables
- create file upload directory
```
$ mkdir -p server/public/uploads
```
- Seed the DB using
```
$ node seeder -i
```
- Run in Dev mode
```
$ npm run dev
```

