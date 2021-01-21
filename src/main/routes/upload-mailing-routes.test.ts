import request from 'supertest'
import app from '../config/app'
import { sync } from 'fast-glob'

describe('Upload Mailing Middleware', () => {
  test('Should return an mailing on success', async () => {
    const header = {
      nome: 'nome',
      email: 'email',
      telefone1: 'telefone',
      telefone2: 'celular'
    }
    await request(app)
      .post('/api/v1/upload')
      .type('multipart/form-data')
      .field('delimiter', ',')
      .field('header', JSON.stringify(header))
      .field('campaignId', 1)
      .attach('mailing', sync('test.txt')[0])
      .expect(201)
  })
})
