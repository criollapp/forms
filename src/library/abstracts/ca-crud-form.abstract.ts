import {CAFormAbstract} from './ca-form.abstract';
import {EventEmitter, Input, Output} from '@angular/core';
import {ICACrudService, CAModelResponse, ICAModel} from '@criollapp/common';

export abstract class CACrudFormAbstract extends CAFormAbstract {
  public static readonly ACTION_TYPE_CREATING = 'creating';
  public static readonly ACTION_TYPE_UPDATING = 'updating';
  public static readonly ACTION_TYPE_READING = 'reading';

  protected _service: ICACrudService;

  @Output() public creationSuccessful: EventEmitter<CAModelResponse> = new EventEmitter();
  @Output() public updateSuccessful: EventEmitter<CAModelResponse> = new EventEmitter();
  @Output() public creationFailed: EventEmitter<CAModelResponse> = new EventEmitter();
  @Output() public updateFailed: EventEmitter<CAModelResponse> = new EventEmitter();

  constructor() {
    super();

    this.form.actionType = CACrudFormAbstract.ACTION_TYPE_READING;
  }

  @Input()
  public get model(): ICAModel {
    return super.getModel();
  }

  public set model(newModel: ICAModel) {
    super.setModel(newModel);

    this.form.actionType = this.model.isOnDb() ? CACrudFormAbstract.ACTION_TYPE_READING : CACrudFormAbstract.ACTION_TYPE_CREATING;
  }

  protected executeAction() {
    this._service.save(this.model).then(( response:CAModelResponse ) => {
      this.response = response;
      switch (this.form.actionType) {
        case CACrudFormAbstract.ACTION_TYPE_CREATING:
          this.creationSuccessful.emit(response);
          break;
        default:
          this.updateSuccessful.emit(response);
          break;
      }
      super.executeSuccessfulAction();
    }).catch(( response:CAModelResponse )=>{
      switch (this.form.actionType) {
        case CACrudFormAbstract.ACTION_TYPE_CREATING:
          this.creationFailed.emit(response);
          break;
        default:
          this.updateFailed.emit(response);
          break;
      }
      super.executeFailAction();
    });
  }
}
