import { PostMailingModel, Response } from '../../../data/contracts/post-add-mailing'
import { AxiosAdapter } from './axios-adapter'
import axios from 'axios'

jest.mock('axios', () => ({
  async post (url: string, body: any): Promise<Response> {
    return new Promise(resolve => resolve(null))
  }
}))

describe('Mailing Rest API', () => {
  const makeSut = (): AxiosAdapter => {
    return new AxiosAdapter()
  }
  test('Should throw if axios throws', async () => {
    const sut = makeSut()
    const postAddMailings: PostMailingModel = {
      campaignId: 1,
      mailings: [
        {
          cnpj: 'any_cnpj',
          name: 'any_name',
          cpf: 'any_cpf',
          email: 'any_email@mail.com',
          address: {
            cep: 'any_cep',
            city: 'any_city',
            complement: 'any_complement',
            country: 'any_country',
            neighborhood: 'any_neighborhood',
            number: 123,
            state: 'any_state',
            street: 'any_street'
          },
          phones: ['any_phone']
        }
      ]
    }
    jest.spyOn(axios, 'post').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.post('valid_url', postAddMailings)
    await expect(promise).rejects.toThrow()
  })

  test('Should calls axios.post with correct params', async () => {
    const sut = makeSut()
    const postAddMailings: PostMailingModel = {
      campaignId: 1,
      mailings: [
        {
          cnpj: 'any_cnpj',
          name: 'any_name',
          cpf: 'any_cpf',
          email: 'any_email@mail.com',
          address: {
            cep: 'any_cep',
            city: 'any_city',
            complement: 'any_complement',
            country: 'any_country',
            neighborhood: 'any_neighborhood',
            number: 123,
            state: 'any_state',
            street: 'any_street'
          },
          phones: ['any_phone']
        }
      ]
    }
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
          address: {
            cep: 'any_cep',
            city: 'any_city',
            complement: 'any_complement',
            country: 'any_country',
            neighborhood: 'any_neighborhood',
            number: 123,
            state: 'any_state',
            street: 'any_street'
          },
          phones: ['any_phone']
        }
      ]
    })
  })
})
