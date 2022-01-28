import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  public stepIndex: number = 0;

  @HostBinding('class.activeStep')
  public isActive = false;

  @Input() public set activeState(step: any){
    this.isActive = step === this;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
