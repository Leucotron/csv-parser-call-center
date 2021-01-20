
export interface Address {
  street: string
  number: number
  cep: string
  city: string
  complement: string
  country: string
  neighborhood: string
  state: string
}

export interface MailingModel {
  name: string
  cpf: string
  cnpj: string
  email: string
  phones: string[]
  address: Address
  responsibleContact: string
  contactCode: string
  campaignId: string
}
