import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
//                        👆 e2e에 쓰이는 라이브러리
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 👆 beforeEach이면 앱이 테스트마다 초기화됨

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    // 👆 실제 어플리케이션과 테스트 환경은 다르다!
    //    실제 환경과 같게 설정해주어야 실제 어플리케이션을 테스트 하는 효과를 볼 수 있음

    await app.init();
  });

  it('/ (GET)', () => {
    //     👇 supertest   👇 http://localhost:3000 따위를 대신해서 씀
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to my movie api');
    // request(app.getHttpServer()).[http메소드]('[url]').[blabla].expect(예상http코드).expect(예상return값?)
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2000,
          genres: ['test'],
          badReq: 'blocked by forbidNonWhitelisted',
        })
        .expect(400);
    });
    it('DELETE 404', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movie/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'blabla' })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
    it.todo('SOMETHING');
    // 👆 만들어야할 테스트 메모 기능, 연필모양
  });
});
