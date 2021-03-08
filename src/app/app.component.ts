import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConverterService} from './services/converter.service';
import {CommonUtils} from './utils/common.utils';
import {take} from 'rxjs/operators';
import {ParsedUrl} from './interfaces/parsed-url';

type StreamingDestination = 'apple' | 'spotify' | 'deezer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private parsedUrl: ParsedUrl | null = null;
  formGroup = new FormGroup({});
  urlFormControl = new FormControl(null);
  nameFormControl = new FormControl(null);

  constructor(private converterService: ConverterService) {
  }

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms(): void {
    // Reset forms to initial state (in case we call this method elsewhere than ngOnInit())
    this.formGroup.removeControl('url');
    this.formGroup.removeControl('name');
    this.urlFormControl.clearValidators();
    this.nameFormControl.clearValidators();

    // Setup forms
    this.urlFormControl.setValidators([Validators.required]);
    this.nameFormControl.disable();
    this.formGroup.addControl('url', this.urlFormControl);
    this.formGroup.addControl('name', this.nameFormControl);
    this.formGroup.updateValueAndValidity();
  }

  handleUrlChange(): void {
    this.converterService.parseUrl(this.urlFormControl.value)
      .pipe(take(1))
      .subscribe(parsedUrl => {
        this.parsedUrl = parsedUrl;
        if (CommonUtils.isNull(parsedUrl)) {
          return;
        }
        this.nameFormControl.setValidators([Validators.required]);
        this.nameFormControl.enable();
        this.formGroup.updateValueAndValidity();
      });
  }

  isButtonDisabled(destination: StreamingDestination): boolean {
    return CommonUtils.isNull(this.parsedUrl) || this.parsedUrl?.source === destination || this.formGroup.invalid;
  }

  convertPlaylist(destination: StreamingDestination): void {
    switch (destination) {
      default:
        console.log('Starting conversion...');
        break;
    }
  }
}
