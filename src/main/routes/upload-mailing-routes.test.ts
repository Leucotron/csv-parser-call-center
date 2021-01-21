import request from 'supertest'
import app from '../config/app'

describe('Upload Mailing Middleware', () => {
  test('Should return an mailing on success', async () => {
    await request(app)
      .post('/api/v1/upload')
      .send({
        delimiter: ',',
        headers: {
          nome: 'nome',
          email: 'email',
          telefone1: 'telefone',
          telefone2: 'celular'
        },
        campaignId: 1
      })
      .expect(200)
  })
})
