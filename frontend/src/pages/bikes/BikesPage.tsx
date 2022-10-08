import { useState, useEffect, useCallback } from 'react';
import {
  Bike,
  GetAllBikesResponse,
  PostCreateBikeResponse,
  DeleteBikeResponse,
  UpdateBikeResponse,
  BikeFormData,
  GetBikeLocationResponse,
  RentFormData,
  Rent,
  Location,
  GetBikeRentsResponse,
  PostCreateBikeRentResponse,
} from '../../types';
import { BikesApi, ServicesApi, LocationApi, RentApi } from '../../enums';
import { RootState } from '../../store/index';
import useModal from '../../hooks/useModal';
import useCrud from '../../hooks/useCrud';
import { useAppSelector } from '../../hooks/useAppRedux';
import useAlertStatus from '../../hooks/useAlertStatus';
import MainLayout from '../../components/templates/main-layout/MainLayout';
import { IcomoonIcon, Loader } from '../../components/atoms';
import { CrudTable, RentBoard } from '../../components/organisms';
import { Modal, BikeForm, Map } from '../../components/molecules';
import styles from './BikesPage.module.scss';

interface CreateBikeBody {
  color: string;
  model: string;
  longitude?: number;
  latitude?: number;
}
interface CreateRentBody {
  userId: string;
  bikeId: string;
  startDate: string;
  endDate: string;
}

const BikesPage = (): JSX.Element => {
  const userId: string = useAppSelector(
    (state: RootState): string => state.auth.user?.googleId ?? ''
  );
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [tempBikeId, setTempBikeId] = useState<string | undefined>();

  const { showAlertMessage } = useAlertStatus();

  const { handleCloseModal, setContentModal, showModal, contentModal } =
    useModal<JSX.Element>();

  const {
    isLoading: isServicesLoading,
    sendCreateRequest: sendServicesCreateRequest,
    sendUpdateRequest: sendServicesUpdateRequest,
    sendDeleteRequest: sendServicesDeleteRequest,
  } = useCrud<
    PostCreateBikeResponse,
    unknown,
    UpdateBikeResponse,
    DeleteBikeResponse
  >({ apiUrl: ServicesApi.api });

  const { isLoading: isBikesLoading, sendReadRequest: sendBikesReadRequest } =
    useCrud<unknown, GetAllBikesResponse, unknown, unknown>({
      apiUrl: BikesApi.api,
    });

  const {
    isLoading: isLocationLoading,
    sendReadRequest: sendLocationReadRequest,
  } = useCrud<unknown, GetBikeLocationResponse, unknown, unknown>({
    apiUrl: LocationApi.api,
  });

  const {
    isLoading: isRentLoading,
    sendReadRequest: sendRentReadRequest,
    sendCreateRequest: readRentCreateRequest,
  } = useCrud<
    PostCreateBikeRentResponse,
    GetBikeRentsResponse,
    unknown,
    unknown
  >({ apiUrl: RentApi.api });

  const closeModalHandler = useCallback(() => {
    setTempBikeId(undefined);
    handleCloseModal(null);
  }, [handleCloseModal]);

  const getAllBikesHandler = useCallback(async (): Promise<void> => {
    const endPoint: string =
      'getAllBikes' in BikesApi.endPoints &&
      typeof BikesApi.endPoints.getAllBikes === 'string'
        ? BikesApi.endPoints.getAllBikes
        : '';
    return await sendBikesReadRequest(endPoint)
      .then((response: GetAllBikesResponse): void => {
        setBikes(
          response?.bikes != null && response.bikes?.length > 0
            ? [...response.bikes]
            : []
        );
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }, [sendBikesReadRequest]);

  const createBikeHandler = useCallback(
    (data: BikeFormData) => {
      const endPoint: string =
        'createBike' in ServicesApi.endPoints &&
        typeof ServicesApi.endPoints.createBike === 'string'
          ? ServicesApi.endPoints.createBike
          : '';
      const createBikeBody: CreateBikeBody = {
        color: data.color,
        model: data.model,
        longitude: data.longitude,
        latitude: data.latitude,
      };
      closeModalHandler();
      void sendServicesCreateRequest<CreateBikeBody>(createBikeBody, endPoint)
        .then((response: PostCreateBikeResponse) => {
          showAlertMessage('Se creo la bicicleta');
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          void getAllBikesHandler();
        });
    },
    [
      closeModalHandler,
      sendServicesCreateRequest,
      showAlertMessage,
      getAllBikesHandler,
    ]
  );

  const updateBikeHandler = useCallback(
    (data: BikeFormData, bike?: Bike) => {
      const bikeId: string = bike?.bikeId ?? '';
      const endPoint: string =
        'updateBike' in ServicesApi.endPoints &&
        typeof ServicesApi.endPoints.updateBike !== 'string'
          ? ServicesApi.endPoints.updateBike(bikeId)
          : '';
      const updateBikeBody: CreateBikeBody = {
        color: data.color,
        model: data.model,
        longitude: data.longitude,
        latitude: data.latitude,
      };
      closeModalHandler();
      void sendServicesUpdateRequest<CreateBikeBody>(updateBikeBody, endPoint)
        .then((response: UpdateBikeResponse | null) => {
          showAlertMessage('Se modifico la bicicleta');
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          void getAllBikesHandler();
        });
    },
    [
      closeModalHandler,
      sendServicesUpdateRequest,
      showAlertMessage,
      getAllBikesHandler,
    ]
  );

  const deleteBikeHandler = useCallback(
    (response: boolean | null) => {
      if (response != null && response && tempBikeId != null) {
        const endPoint: string =
          'deleteBike' in ServicesApi.endPoints &&
          typeof ServicesApi.endPoints.deleteBike !== 'string'
            ? ServicesApi.endPoints.deleteBike(tempBikeId)
            : '';
        void sendServicesDeleteRequest(endPoint)
          .then((response: DeleteBikeResponse): void => {
            showAlertMessage('Se elimino la bicicleta');
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            void getAllBikesHandler();
          });
      }
      setTempBikeId(undefined);
      handleCloseModal(response);
    },
    [
      tempBikeId,
      handleCloseModal,
      sendServicesDeleteRequest,
      showAlertMessage,
      getAllBikesHandler,
    ]
  );

  const showLocationHandler = useCallback(
    (bike: Bike): void => {
      const bikeId: string = bike?.bikeId ?? '';
      const endPoint: string =
        'getLocation' in LocationApi.endPoints &&
        typeof LocationApi.endPoints.getLocation !== 'string'
          ? LocationApi.endPoints.getLocation(bikeId)
          : '';
      void sendLocationReadRequest(endPoint)
        .then((response: GetBikeLocationResponse): void => {
          if (response?.location != null) {
            setContentModal(
              <Map
                key={`mapLocation_${response.location?.bikeId}`}
                bike={undefined}
                longitude={response.location.longitude}
                latitude={response.location.latitude}
                style={{
                  minHeight: '450px',
                  maxHeight: '600px',
                  width: '100%',
                }}
              />
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [sendLocationReadRequest, setContentModal]
  );

  const createCRUDTableHandler = useCallback((): void => {
    setContentModal(
      <BikeForm
        key='createForm'
        title='Crear una nueva bicicleta'
        onSubmit={createBikeHandler}
        cancelSubmit={closeModalHandler}
      />
    );
  }, [createBikeHandler, setContentModal, closeModalHandler]);

  const rentSubmitHandler = useCallback(
    (rentData: RentFormData, rentOldData?: Rent, bikeId?: string) => {
      console.log({ ...rentData });

      const endPoint: string =
        'createRent' in RentApi.endPoints &&
        typeof RentApi.endPoints.createRent === 'string'
          ? RentApi.endPoints.createRent
          : '';

      const startDate: Date = new Date(rentData.startDate);
      const endDate: Date = new Date(rentData.endDate);
      console.log('tempBikeId: ', bikeId);
      const createRentBody: CreateRentBody = {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        userId,
        bikeId: bikeId ?? '',
      };
      closeModalHandler();
      void readRentCreateRequest<CreateRentBody>(createRentBody, endPoint)
        .then((response: PostCreateBikeRentResponse) => {
          showAlertMessage('Se creo la renta de la bicicleta');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [closeModalHandler, readRentCreateRequest, showAlertMessage, userId]
  );

  const updateCRUDTableHandler = useCallback(
    (bike: Bike): void => {
      const bikeId: string = bike?.bikeId ?? '';
      const locationEndPoint: string =
        'getLocation' in LocationApi.endPoints &&
        typeof LocationApi.endPoints.getLocation !== 'string'
          ? LocationApi.endPoints.getLocation(bikeId)
          : '';
      const rentEndPoint: string =
        'getAllRents' in RentApi.endPoints &&
        typeof RentApi.endPoints.getAllRents !== 'string'
          ? RentApi.endPoints.getAllRents(bikeId)
          : '';
      void Promise.allSettled([
        sendLocationReadRequest(locationEndPoint),
        sendRentReadRequest(rentEndPoint),
      ]).then((results) => {
        const locationResponse: GetBikeLocationResponse | undefined =
          results[0]?.status === 'fulfilled' ? results[0]?.value : undefined;
        const rentResponse: GetBikeRentsResponse | undefined =
          results[1]?.status === 'fulfilled' ? results[1]?.value : undefined;
        let location: Location | undefined;
        if (locationResponse != null) {
          location = locationResponse.location;
        }
        setContentModal(
          <div className='flex flex-row'>
            <BikeForm
              key={`updateForm_${bike?.id}`}
              title='Editar la información de la bicicleta'
              bike={bike}
              location={location}
              className='pr-8'
              onSubmit={updateBikeHandler}
              cancelSubmit={closeModalHandler}
            />
            <div className='w-0.5 border-r-2 border-dashed border-gray-300' />
            <RentBoard
              key={`rentForm_${bike?.id}`}
              rents={rentResponse?.rents ?? []}
              isRented={rentResponse?.isRented}
              className='pl-8'
              onSubmit={(rentData: RentFormData, rentOldData?: Rent) =>
                rentSubmitHandler(rentData, rentOldData, bikeId)
              }
            />
          </div>
        );
      });
    },
    [
      updateBikeHandler,
      setContentModal,
      closeModalHandler,
      rentSubmitHandler,
      sendLocationReadRequest,
      sendRentReadRequest,
    ]
  );

  const deleteCRUDTableHandler = useCallback(
    (bike: Bike): void => {
      setContentModal(
        <div
          key={`deleteForm_${bike?.id}`}
          className='w-full flex flex-col items-center'
        >
          <IcomoonIcon
            icon='warning-icon'
            className='text-6xl text-amber-500 font-latoBlack'
          />
          <h3 className='py-3 font-latoBold text-primary'>
            ¿Está seguro de eliminar esta bicicleta?
          </h3>
        </div>
      );
      setTempBikeId(bike?.bikeId);
    },
    [setContentModal]
  );

  useEffect(() => {
    console.log('HOLA!');
    void getAllBikesHandler();
  }, [getAllBikesHandler]);

  return (
    <MainLayout>
      <section
        className={`bikesPage w-full flex flex-col items-center ${styles.bikesPage}`}
      >
        <h1 className='text-2xl font-latoBlack text-primaryBlack'>
          Bikes Dashboard!
        </h1>
        {isServicesLoading ||
        isBikesLoading ||
        isLocationLoading ||
        isRentLoading ? (
          <Loader />
        ) : (
          <CrudTable
            data={bikes}
            headersKeys={['model', 'color']}
            className='mt-3'
            createOnClick={createCRUDTableHandler}
            readOnClick={showLocationHandler}
            updateOnClick={updateCRUDTableHandler}
            deleteOnClick={deleteCRUDTableHandler}
          />
        )}
        <Modal
          show={showModal}
          okText='Aceptar'
          cancelText='Cancelar'
          zIndex={60}
          className={`${styles.bikesPage__modal} min-w-[400px]`}
          onClose={closeModalHandler}
          onResponse={deleteBikeHandler}
        >
          <span>{contentModal}</span>
        </Modal>
      </section>
    </MainLayout>
  );
};
BikesPage.displayName = 'BikesPage';

export default BikesPage;
