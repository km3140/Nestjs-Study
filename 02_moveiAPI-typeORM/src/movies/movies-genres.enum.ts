// export class Movie {
//   id: number;
//   title: string;
//   year: number;
//   genres: MovieGenres[];
// }

export enum MovieGenres {
  action = 'action',
  drama = 'drama',
  comedy = 'comedy',
  romance = 'romance',
  thriller = 'thriller',
}
// 👆 enum의 프로퍼티들은 자동으로 readonly, 비슷하게 as const가 있음, 각각 리터럴타입?
