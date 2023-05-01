import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { MovieGenres } from './movies-genres.enum';

// describe { it, it, it ... }
describe('MoviesService', () => {
  let service: MoviesService;

  //    beforeEach, afterEach : 각각 한 번
  //    beforeAll, afterAll : 끝에 한 번, 시작에 한 번
  // 👇 각각의 it(?) 마다 시작 전 한 번
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    service.create({
      title: 'test movie',
      genres: [MovieGenres.action],
      year: 2000,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should be return movie', () => {
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(404);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('Movie with ID 404 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      const beforeDel = service.getAll().length;
      service.deleteOne(1);
      const afterDel = service.getAll().length;
      expect(afterDel).toBeLessThan(beforeDel);
    });
    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(404);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('Movie with ID 404 not found.');
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      service.deleteOne(1);
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'test movie',
        genres: [MovieGenres.action],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      const beforeUpdate = service.getAll();
      const updateData = {
        title: 'updated',
        genres: [MovieGenres.action],
        year: 7777,
      };
      service.update(1, updateData);
      const afterUpdate = service.getAll();
      expect(afterUpdate[0].title).toEqual(updateData.title);
      expect(afterUpdate[0].genres[0]).toEqual(updateData.genres[0]);
      expect(afterUpdate[0].year).toEqual(updateData.year);
      // expect(JSON.stringify(afterUpdate)).toEqual(JSON.stringify(updateData));
      expect(beforeUpdate.length).toEqual(afterUpdate.length);
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(404, {});
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('Movie with ID 404 not found.');
        // expect(service.getAll().length).toEqual(1);
        // 👆 beforeEach로 it마다 서비스 다시 불러와서 메모리가 휘발되는 듯
      }
    });
  });
});
