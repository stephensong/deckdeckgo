import {Component, Element, Prop, h, EventEmitter} from '@stencil/core';

import {ImageAction} from '../../../utils/editor/image-action';

@Component({
  tag: 'app-image-element',
  styleUrl: 'app-image-element.scss'
})
export class AppImageElement {
  @Element() el: HTMLElement;

  @Prop()
  selectedElement: HTMLElement;

  @Prop()
  slide: boolean = false;

  @Prop()
  imgDidChange: EventEmitter<HTMLElement>;

  private async closePopoverWithoutResults() {
    await (this.el.closest('ion-popover') as HTMLIonPopoverElement).dismiss();
  }

  private onImgDidChange($event: CustomEvent<HTMLElement>) {
    if ($event && $event.detail) {
      this.imgDidChange.emit($event.detail);
    }
  }

  private async onAction($event: CustomEvent<ImageAction>) {
    if ($event && $event.detail) {
      await (this.el.closest('ion-popover') as HTMLIonPopoverElement).dismiss($event.detail);
    }
  }

  render() {
    return [
      <ion-toolbar>
        <h2>{this.slide ? 'Slide background' : 'Image'}</h2>
        <ion-router-link slot="end" onClick={() => this.closePopoverWithoutResults()}>
          <ion-icon name="close"></ion-icon>
        </ion-router-link>
      </ion-toolbar>,
      <app-image
        selectedElement={this.selectedElement}
        slide={this.slide}
        onAction={($event: CustomEvent<ImageAction>) => this.onAction($event)}
        onImgDidChange={($event: CustomEvent<HTMLElement>) => this.onImgDidChange($event)}></app-image>
    ];
  }
}
