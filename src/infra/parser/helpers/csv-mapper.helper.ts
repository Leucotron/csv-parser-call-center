import { unlinkSync } from 'fs'
import { MailingModel } from '../../../domain/models/mailing'
import { MailingRows } from '../contracts/mailing-rows'

export const mapToMailing = (data: MailingRows): MailingModel => {
  const { nome, cpf, cnpj, email, endereco, numero, cep, cidade, complemento, pais, bairro, estado } = data
  const mailing: MailingModel = {
    name: nome,
    cpf,
    cnpj,
    email,
    street: endereco,
    number: numero,
    zipCode: cep,
    city: cidade,
    complement: complemento,
    country: pais,
    neighborhood: bairro,
    state: estado,
    phones: mapToMailingPhones(data)
  }
  return mailing
}

export const mapToMailingPhones = (data: MailingRows): string[] => {
  const phones = []
  for (let i = 1; i <= 10; i++) {
    const phone = data[`telefone${i}`]
    if (!phone) break
    phones.push(phone)
  }
  return phones
}

export const removeUploadCsvFile = (path: string): void => {
  try {
    unlinkSync(path)
  } catch (error) {
    console.error(error)
  }
}
