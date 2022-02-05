import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const { ...newAccount } = await accountCollection.findOne({
      _id: result.insertedId
    })

    const { _id, first_name, last_name, username, email, password } = newAccount

    const account = {
      id: _id.toString(),
      first_name,
      last_name,
      username,
      email,
      password
    }
    return account
  }
}
