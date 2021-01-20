import { PostMailingModel } from '../../../data/contracts/post-add-mailing'
import { AxiosAdapter } from './axios-adapter'
import axios from 'axios'
describe('Mailing Rest API', () => {
  test('Should throw if axios throws', async () => {
    const sut = new AxiosAdapter()
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
})
