import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigModel } from '../models/config.model';
import { HttpHelperService } from './http-helper.service';

@Injectable()
export class ConfigService {
  static keyPortfolioTitle = 'portfolio_title';
  static keyContactInfo = 'contact_info';

  private configUrl = 'api/config';

  constructor(
    private httpClient: HttpClient,
    private httpHelperService: HttpHelperService
  ) { }

  getConfig(key: string): Observable<ConfigModel> {
    return this.httpClient
      .get<ConfigModel>(
        `${this.configUrl}/${key}`,
        this.httpHelperService.defaultOps
      );
  }

  setConfig(cnf: ConfigModel): Observable<number> {
    return this.httpClient
      .put(
        `${this.configUrl}/${cnf.key}`,
        {
          value: cnf.value
        },
        this.httpHelperService.respOps
      )
      .pipe(
        this.httpHelperService.statusError,
        this.httpHelperService.statusSwitch
      );
  }
}
