import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { StepDirective } from '../step.directive';
import { StepService } from '../step.service';
import { StepComponent } from '../step/step.component';
import { Status, UiHelper } from '../ui-helper';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends UiHelper implements OnInit, AfterContentInit {

  itemLength: number = 0

  @Input() public set selectedIndex(value: any) {
    this.activeIndex = value || 0;
  }

  @Output() public stateChange = new EventEmitter<{
    activeIndex: number;
    activeStep: StepComponent;
  }>();

  @ContentChildren(StepComponent)
  public steps!: QueryList<
    StepComponent
  >;

  constructor(protected stepService: StepService) {
    super(stepService);
  }

  ngOnInit(): void {
    this.stepService.eventHelper.subscribe({
      next: ({ prev, next }) => {
        if (next) {
          this.next();
        }

        if (prev) {
          this.prev();
        }
      },
    });
  }

  ngAfterContentInit() {
    this.initProgress(this.progressSteps.length);
    this.setActiveActiveStep(this.activeIndex);
    this.initStepIndex();
  }

  public next() {
    this.increaseStep();
  }

  public prev() {
    this.decreaseStep();
  }

  private increaseStep() {
    if (
      this.activeIndex === this.itemLength - 1 &&
      this.itemProgressList[this.activeIndex].status !== Status.COMPLETED
    ) {
      this.completeLastStep();
    }

    if (this.activeIndex < this.itemLength - 1) {
      this.activeIndex++;
      this.switchStatusNext(this.activeIndex);
      this.setActiveActiveStep(this.activeIndex);
      this.emitStateChange();
    }
  }

  private decreaseStep() {
    if (
      this.activeIndex === this.itemLength - 1 &&
      this.itemProgressList[this.activeIndex].status === Status.COMPLETED
    ) {
      this.undoLastComplete();
    } else {
      if (this.activeIndex > 0) {
        this.activeIndex--;
        this.switchStatusPrev(this.activeIndex);
        this.setActiveActiveStep(this.activeIndex);
        this.emitStateChange();
      }
    }
  }

  private emitStateChange(): void {
    this.stateChange.emit({
      activeIndex: this.activeIndex,
      activeStep: this.activeStep,
    });
  }

  private setActiveActiveStep(index: number): void {
    if (this.stepsExists) {
      this.removeActiveStep();
      this.updateActiveStep(index);
    }
  }

  private updateActiveStep(index: any) {
    this.progressSteps[index].activeState = this.progressSteps[index];
  }

  private removeActiveStep() {
    this.progressSteps.map((step) => {
      if (step.isActive) {
        step.isActive = false;
      }
    });
  }

  private initStepIndex() {
    this.progressSteps.forEach((step, i) => (step.stepIndex = i));
  }

  public get activeStep(): StepComponent {
    return this.progressSteps[this.activeIndex];
  }

  private get stepsExists(): boolean {
    return this.progressSteps && Array.isArray(this.progressSteps);
  }

  private get progressSteps(): StepComponent[] {
    return this.steps.toArray();
  }

  protected generateProgressArray(length: any): any[] {
    return [...Array(length).keys()].map((key) => {
      return {
        stepIndex: key,
        status: key === this.activeIndex ? Status.IN_PROGRESS : Status.PENDING,
      };
    });
  }

  private initProgress(value: any): void {
    this.itemLength = value || 0;
    this.itemProgressList = this.generateProgressArray(this.itemLength);
  }

  returnClass = true;
  getClass() {
    if(this.returnClass) {
        return "complete";
    } else {
        return "";
    }
  }
}
