import { ApiData } from '../types';

export const BikesApi: ApiData = {
  api: `${String(process.env.REACT_APP_BIKES_API_URL) ?? ''}/bikes`,
  endPoints: {
    getAllBikes: '/',
    getBike: <T>(bid: T): string => `/${typeof bid === 'string' ? bid : ''}`,
  },
};

export const LocationApi: ApiData = {
  api: `${String(process.env.REACT_APP_LOCATION_API_URL) ?? ''}/location`,
  endPoints: {
    getLocation: <T>(bid: T): string =>
      `/${typeof bid === 'string' ? bid : ''}`,
  },
};

export const RentApi: ApiData = {
  api: `${String(process.env.REACT_APP_RENT_API_URL) ?? ''}/rent`,
  endPoints: {
    getAllRents: <T>(bid: T): string =>
      `/${typeof bid === 'string' ? bid : ''}`,
    createRent: '/',
  },
};

export const ServicesApi: ApiData = {
  api: `${String(process.env.REACT_APP_SERVICES_API_URL) ?? ''}`,
  endPoints: {
    createBike: '/bikes/',
    updateBike: <T>(bid: T): string =>
      `/bikes/${typeof bid === 'string' ? bid : ''}`,
    deleteBike: <T>(bid: T): string =>
      `/bikes/${typeof bid === 'string' ? bid : ''}`,
  },
};
