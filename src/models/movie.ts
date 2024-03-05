interface IUser {
   id: number;
   img: string;
   title: string;
   backdrop_path?: string;
}
interface IRequests {
   requestPopular: string;
   requestTopRated: string;
   requestTrending: string;
   requestUpcoming: string;
   requestHorror: string;
}

export type { IUser, IRequests };
