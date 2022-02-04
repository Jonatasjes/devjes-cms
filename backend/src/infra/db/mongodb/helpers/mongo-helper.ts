import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(url: string): Promise<void> {
    this.client = MongoClient.connect(url, () => ({
      useNewUrlParser: true,
      useUnifieldTopology: true
    }))
  },

  async disconnect(): Promise<void> {
    await this.client.close()
  }
}
