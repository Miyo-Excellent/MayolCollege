//  Dependencies
import axios from 'axios';

//  App Configuration
import appConfig from '../config';

export default async function getChatCommits() {
  try {
    const commits = await axios.get(appConfig.proxy.url + 'https://huc2m17au1.execute-api.us-west-2.amazonaws.com/production/messages');

    return commits.data.messages;
  } catch (error) {
    console.log(error);
    debugger;
  }
}
