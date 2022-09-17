# NestJs-tutorial

### **2022-09-17**

---

- NestJs 시작

  - [Youtube](https://www.youtube.com/watch?v=GHTA143_b-s&t=8225s)
  - [Github](https://github.com/vladwulf/nestjs-api-tutorial)
  - [공식문서](https://docs.nestjs.com/first-steps)
  - [공식문서 번역](https://velog.io/@mskwon/series/Nest-JS-%EA%B3%B5%EC%8B%9D%EB%AC%B8%EC%84%9C-%EB%B2%88%EC%97%AD%ED%95%98%EA%B8%B0)

- Prisma

  - yarn add --dev prisma
  - yarn add @prisma/client
  - npx prisma init
  - prisma.schema 작성
  - npx prisma migrate dev
    - 작성한 스키마대로 디비 구성
  - npx prisma generate
    - 코드에서 사용할 수 있게 client generate

- Pipes

  - yarn add class-validator class-transformer
  - dto class에서 annotation을 통해 조건? 추가
  - main.ts에서 useGlobalPipes(new ValidationPipe()) 사용하여 적용

- Sign up

  - argon2를 이용하여 hashing
  - prisma schema를 이용하여 relation 정의
  - 이메일 중복시, 에러처리

- Sign in

  - argon2.verify를 이용하여 입력한 password와 db hashing 된 문자와 비교
  - 이메일, 비밀번호 일치하지 않을 때마다, 에러반환

- @nestjs/config

  - app.module에서 ConfigModule을 통해 .env 연결
  - prisma.service에 하드 코딩 되어있던 환경변수 수정

- passport & JWT

  - yarn add @nestjs/passport passport passport-local
  - yarn add --dev @types/passport-local
  - yarn add @nestjs/jwt passport-jwt
  - yarn add --dev @types/passport-jwt
  - auth 폴더 아래 jwt strategy 정의하여 사용
    - authorization header에서 token을 extract 하겠다.
    - secret은 이것을 사용하겠다 등

- Guard

  - global, controller, router level에서 사용 가능
  - @UseGuards(AuthGuard('jwt')) -> 여기서 'jwt'는 AuthGuard strategy?의 key이다.
    - jwt.strategy 에서 PassportStrategy extends할 때 key를 정할수 있다.
    - default 는 jwt다.
  - jwt.strategy에서 validate 함수를 구현하여, user를 db에서 조회하여 넘긴다.
    - 여기서 return 하는것이 req.user로 들어간다.
    - 여기서는 user만 db에서 조회하고, 나머지 users/me에서 반환하고 싶은것이 있으면, service에서 구현하도록 하자.

- Custom Decorator

  - Decorator는 annotation과 같은것, @가 앞에 붙어있는 것이다.
  - createParamDecorator을 이용하여 만들수 있다.
  - data param은 @GetUser(), 여기 괄호 안에 들어가는 것에 해당한다. - 이것을 통해 get-user에 한정하자면, `request.user[data]`를 통해 특정 필드만 반환이 가능하다.

    ```
    import {
      createParamDecorator,
      ExecutionContext,
    } from '@nestjs/common'

    export const GetUser = createParamDecorator(
      (
        data: string | undefined,
        ctx: ExecutionContext,
      ) => {
        const request = ctx
        .switchToHttp()
        .getRequest()

            if (data) {
              return request.user[data]
            }

            return request.user

        },
      )
    ```

    ```
    @UseGuards(JwtGuard)
    @Get('me/email')
    getMyEmail(
      @GetUser('email') userEmail: string,
    ) {
      return userEmail
    }
    ```

  - 각 라우터에 `@HttpCode(HttpStatus.~~)`를 통해 status code를 수정할 수 있다.

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
