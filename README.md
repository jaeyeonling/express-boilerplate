# Express Boilerplate

## 환경
* Node 12.1
* Express 
* Sequelize
* MySQL 8
* Redis 5
* JWT
* SMTP

## Docker
```
docker-compose -f docker-compose.yml up
```

## 폴더 구조
```
.
+-- config            
+-- src
  +-- database          
  +-- domain                // Business logic
  +-- exception             // Error
  +-- http              
  +-- redis   
  +-- security          
  +-- type
  +-- utils             
+-- test              
+-- index.js          
```

## 기능

* 회원가입

* Passport (JWT)
  * Local
  * Google
  * Kakao

* 패스워드 초기화 (SMTP)

* 파일 업로드

* Validation

## TODO

* CI/CD

* Docker

* S3 Upload
