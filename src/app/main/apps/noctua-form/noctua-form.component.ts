import { Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatDrawer } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { merge, Observable, BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { noctuaAnimations } from '@noctua/animations';
import { NoctuaUtils } from '@noctua/utils/noctua-utils';

import { takeUntil, startWith } from 'rxjs/internal/operators';

import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import { forEach } from '@angular/router/src/utils/collection';

import { NoctuaTranslationLoaderService } from '@noctua/services/translation-loader.service';
import { NoctuaFormConfigService } from '@noctua.form/services/config/noctua-form-config.service';
import { NoctuaGraphService } from '@noctua.form/services/graph.service';
import { NoctuaLookupService } from '@noctua.form/services/lookup.service';
import { SummaryGridService } from '@noctua.form/services/summary-grid.service';

import { locale as english } from './i18n/en';

import { NoctuaFormService } from './services/noctua-form.service';
import { NoctuaFormDialogService } from './dialog.service';
import { NoctuaSearchService } from '@noctua.search/services/noctua-search.service';
import { CamService } from '@noctua.form/services/cam.service'

import { SparqlService } from '@noctua.sparql/services/sparql/sparql.service';

import { Cam } from '@noctua.form/models/annoton/cam';

@Component({
  selector: 'app-noctua-form',
  templateUrl: './noctua-form.component.html',
  styleUrls: ['./noctua-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: noctuaAnimations
})
export class NoctuaFormComponent implements OnInit, OnDestroy {

  cam: Cam;
  searchResults = [];
  modelId: string = '';

  private unsubscribeAll: Subject<any>;

  constructor(private route: ActivatedRoute,
    private camService: CamService,
    private noctuaFormConfigService: NoctuaFormConfigService,
    private noctuaSearchService: NoctuaSearchService,
    public noctuaFormService: NoctuaFormService,
    private noctuaFormDialogService: NoctuaFormDialogService,
    private noctuaLookupService: NoctuaLookupService,
    private noctuaGraphService: NoctuaGraphService,
    private summaryGridService: SummaryGridService,
    private sparqlService: SparqlService,
    private noctuaTranslationLoader: NoctuaTranslationLoaderService) {

    this.unsubscribeAll = new Subject();
    this.route
      .queryParams
      .subscribe(params => {
        this.modelId = params['model_id'] || '5c6c266a00000032';
        this.loadCam(this.modelId);
      });

    console.log("PPPP")
    //this.searchFormData = this.noctuaFormConfigService.createReviewSearchFormData();

  }

  ngOnInit(): void {
  }

  loadCam(modelId) {
    this.cam = this.camService.getCam(modelId)

    this.cam.onGraphChanged.subscribe((annotons) => {
      if (annotons) {
        let data = this.summaryGridService.getGrid(annotons);

        this.camService.addCamChildren(this.cam, data);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}

