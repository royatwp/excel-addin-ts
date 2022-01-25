import axios from 'axios';

export default class HubHelper {

  readonly serverUrl: string = 'https://excel-test.wpsinternal.co.uk';

  constructor(idToken: string) {
    axios.defaults.baseURL = this.serverUrl;
    axios.defaults.headers.common.Authorization = `Bearer ${idToken}`
    axios.defaults.headers.common.ContentType = 'application/json'
    axios.interceptors.response.use(
      (response: any) => {
        return response;
      },
      async (error) => {
        console.log(error);
      });
  }

  public async executeProgram(programPath: string, params: object): Promise<any> {
    const reqResult = await axios.get(`/run/${programPath}`, {params: { ...params }} );
    if (reqResult.status !== 200) {
      throw new Error(reqResult.statusText);
    }
    return reqResult.data;
  }

  public async executeProgramAsync(path: string, params: any[]): Promise<any> {
    let state = '';
    const jobId = await this.createJob(path, params);
    while (state !== 'Finished') {
      state = await this.getJobStatus(jobId);
    }

    return await this.getJobResult(jobId);
  }

  private async createJob(path: string, params: any[]): Promise<string> {
    const reqResult = await axios.post(`/api/v2/ondemand/async/run/${path}`, params)
    if (reqResult.request.status !== 202) {
      throw new Error(reqResult.request.statusText);
    }
    return reqResult.data.jobId;
  }

  private async getJobStatus(jobId: string): Promise<string> {
    const statusResult = await axios.get(`/api/v2/ondemand/async/jobs/${jobId}/status`);
    return statusResult.data.status.state;
  }

  private async getJobResult(jobId: string): Promise<any> {
    const outputResult = await axios.get(`/api/v2/ondemand/async/jobs/${jobId}/results/_webout/content`);
    return outputResult.data;
  }
}
