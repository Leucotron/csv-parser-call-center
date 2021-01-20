import { PostAddMailing, PostMailingModel, Response } from '../../../data/contracts/post-add-mailing'
import axios from 'axios'
export class AxiosAdapter implements PostAddMailing {
  async post (url: string, body: PostMailingModel): Promise<Response> {
    const response = await axios.post(url, body)
    return response
  }
}
