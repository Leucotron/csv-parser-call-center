import { PostMailingModel, Response } from '../../../data/contracts/post-add-mailing'
import { AxiosAdapter } from './axios-adapter'
import axios from 'axios'

jest.mock('axios', () => ({
  async post (url: string, body: any): Promise<Response> {
    const response: Response = {
      data: 'valid_data',
      status: 201,
      statusText: 'Created'
    }
    return new Promise(resolve => resolve(response))
  }
}))

describe('Mailing Rest API', () => {
  const makeSut = (): AxiosAdapter => {
    return new AxiosAdapter()
  }
  const makeFakePostMailingModel = (): PostMailingModel => {
    return {
      campaignId: 1,
      mailings: [
        {
          cnpj: 'any_cnpj',
          name: 'any_name',
          cpf: 'any_cpf',
          email: 'any_email@mail.com',
          zipCode: 'any_cep',
          city: 'any_city',
          complement: 'any_complement',
          country: 'any_country',
          neighborhood: 'any_neighborhood',
          number: 123,
          state: 'any_state',
          street: 'any_street',
          phones: ['any_phone']
        }
      ]
    }
  }

  test('Should throw if axios throws', async () => {
    const sut = makeSut()
    const postAddMailings = makeFakePostMailingModel()
    jest.spyOn(axios, 'post').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.post('valid_url', postAddMailings)
    await expect(promise).rejects.toThrow()
  })

  test('Should calls axios.post with correct params', async () => {
    const sut = makeSut()
    const postAddMailings = makeFakePostMailingModel()
    const postSpy = jest.spyOn(axios, 'post')
    await sut.post('valid_url', postAddMailings)
    expect(postSpy).toHaveBeenCalledWith('valid_url', {
      campaignId: 1,
      mailings: [
        {
          cnpj: 'any_cnpj',
          name: 'any_name',
          cpf: 'any_cpf',
          email: 'any_email@mail.com',
          zipCode: 'any_cep',
          city: 'any_city',
          complement: 'any_complement',
          country: 'any_country',
          neighborhood: 'any_neighborhood',
          number: 123,
          state: 'any_state',
          street: 'any_street',
          phones: ['any_phone']
        }
      ]
    })
  })

  test('Should return created response on success', async () => {
    const sut = makeSut()
    const postAddMailings = makeFakePostMailingModel()
    const response = await sut.post('valid_url', postAddMailings)
    const { status, data } = response
    expect(status).toBe(201)
    expect(data).toBeTruthy()
  })
})
