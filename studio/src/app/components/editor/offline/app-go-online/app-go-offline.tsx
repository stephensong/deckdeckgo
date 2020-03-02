import {Component, h, State, Event, EventEmitter} from '@stencil/core';

import {OfflineService} from '../../../../services/editor/offline/offline.service';

@Component({
  tag: 'app-go-online'
})
export class AppGoOnline {
  @State()
  private goingOnline: boolean = false;

  @State()
  private progress: number = 0;

  @Event()
  private doneOnline: EventEmitter<void>;

  private offlineService: OfflineService;

  constructor() {
    this.offlineService = OfflineService.getInstance();
  }

  private async goOnline() {
    this.goingOnline = true;

    try {
      await this.offlineService.upload();

      this.doneOnline.emit();
    } catch (err) {
      this.goingOnline = false;
      // TODO ERROR
    }
  }

  render() {
    return [
      <p>Cool, you are online again.</p>,
      <p>
        Please do note that the upload of this deck will <bold>replace</bold> any of its previous online content.
      </p>,
      <p>Long story short, your local presentation is going to be uploaded and saved in the database as the good one.</p>,
      <div class="ion-padding ion-text-center go">{this.renderGoOnline()}</div>
    ];
  }

  private renderGoOnline() {
    if (!this.goingOnline) {
      return (
        <ion-button type="submit" color="tertiary" shape="round" onClick={() => this.goOnline()}>
          <ion-label>Go online now</ion-label>
        </ion-button>
      );
    } else {
      return (
        <div class="in-progress">
          <ion-progress-bar value={this.progress} color="tertiary"></ion-progress-bar>
          <ion-label>Hang on still, we are uploading the content.</ion-label>
        </div>
      );
    }
  }
}