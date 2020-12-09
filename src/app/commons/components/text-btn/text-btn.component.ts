import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-btn',
  templateUrl: './text-btn.component.html',
  styles: [
  ]
})
export class TextBtnComponent implements OnInit, OnChanges {

  @Input() textLoaded: string;
  @Input() textLoading: string;
  @Input() loading: boolean;
  @Input() pogressbar: boolean;

  public texto = '';
  constructor() { }

  ngOnInit(): void {
    if (this.loading) {
      this.texto = this.textLoading;
    } else {
      this.texto = this.textLoaded;
    }
  }

  ngOnChanges() {
    if (this.loading) {
      this.texto = this.textLoading;
    } else {
      this.texto = this.textLoaded;
    }
  }

}
