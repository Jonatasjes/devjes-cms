import { AccountModel } from '../models/account'

export interface AddAccountModel {
  first_name: string
  last_name: string
  username: string
  email: string
  password: string
}

export interface AddAccount {
  add(account: AddAccountModel): Promise<AccountModel>
}
