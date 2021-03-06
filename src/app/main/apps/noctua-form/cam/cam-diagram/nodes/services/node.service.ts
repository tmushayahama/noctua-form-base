import {
  ComponentRef,
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector
} from '@angular/core';

import { CamDiagramService } from './../../services/cam-diagram.service';

import { Annoton } from '@noctua.form/models/annoton/annoton';
import { NodeComponent } from './../node/node.component';
import { jsPlumb } from 'jsplumb';

@Injectable()
export class NodeService {
  private rootViewContainer: any;

  constructor(private factoryResolver: ComponentFactoryResolver,
    public camDiagramService: CamDiagramService) { }

  public setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  public addDynamicNode(annoton: Annoton) {
    const self = this;

    const factory = this.factoryResolver.resolveComponentFactory(NodeComponent);
    const component = factory.create(self.rootViewContainer.parentInjector);
    const nodeComponent: NodeComponent = <NodeComponent>component.instance

    nodeComponent.annoton = annoton;
    self.rootViewContainer.insert(component.hostView);
    self.camDiagramService.onNodesReady.push(nodeComponent.onNodeReady)

    return component;
  }

  public clear() {
    this.rootViewContainer.clear();
  }
}
