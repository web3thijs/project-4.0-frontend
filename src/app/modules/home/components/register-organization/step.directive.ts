import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { StepService } from './step.service';

@Directive({
  selector: '[formStepNext], [formStepPrev]',
})
export class StepDirective implements OnInit {
  @Input('formStepNext') next: any;
  @Input('formStepPrev') prev: any;

  private methods = {
    next: false,
    prev: false,
  };

  @HostListener('click', ['$event']) listen(e: any) {
    this.stepService.eventHelper.next(this.methods);
  }

  constructor(
    private stepService: StepService,
    private el: ElementRef<HTMLButtonElement>
  ) {}

  ngOnInit() {
    this.initMethods();
  }

  private initMethods(): void {
    if ('next' in this) {
      this.methods = {
        ...this.methods,
        next: true,
      };
    }

    if ('prev' in this) {
      this.methods = {
        ...this.methods,
        prev: true,
      };
    }
  }
}
