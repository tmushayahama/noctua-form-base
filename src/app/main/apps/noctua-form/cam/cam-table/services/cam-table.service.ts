import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDrawer } from '@angular/material';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { map, filter, reduce, catchError, retry, tap } from 'rxjs/operators';

import { NoctuaUtils } from '@noctua/utils/noctua-utils';
import { CurieService } from '@noctua.curie/services/curie.service';
import { NoctuaGraphService } from '@noctua.form/services/graph.service';

import { NoctuaFormConfigService } from '@noctua.form/services/config/noctua-form-config.service';


import { Curator } from '@noctua.form/models/curator';
import { Group } from '@noctua.form//models/group';

import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';
declare const require: any;
const each = require('lodash/forEach');

@Injectable({
  providedIn: 'root'
})
export class CamTableService {

  constructor() {
  }

}
