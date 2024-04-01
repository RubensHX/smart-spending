import { AxiosError, AxiosPromise } from 'axios'

type BaseRequest<T, V> = (body?: T) => Promise<AxiosPromise<V>>

type SuccessResponse<V> = {
  code: 'success'
  data: V
}

type ErrorResponse<E = AxiosError> = {
  code: 'error'
  error: E
}

type BaseResponse<V, E> = Promise<SuccessResponse<V> | ErrorResponse<E>>

export const requestHandler =
  <T, V, E = AxiosError>(request: BaseRequest<T, V>) =>
  async (params?: T): Promise<BaseResponse<V, E>> => {
    try {
      const response = await request(params)
      return { code: 'success', data: response.data }
    } catch (e) {
      return { code: 'error', error: e as E }
    }
  }
