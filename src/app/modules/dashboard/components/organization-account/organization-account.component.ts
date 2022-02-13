import { Component, OnInit } from '@angular/core';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Organization } from 'src/app/core/models/Organization';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/modules/security/auth.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-organization-account',
  templateUrl: './organization-account.component.html',
  styleUrls: ['./organization-account.component.scss']
})
export class OrganizationAccountComponent implements OnInit {
  user: User = {id: 0, email: "", password: "", phoneNr: "", address: "", postalCode: "", country: "", role: ""};
  user$: Subscription = new Subscription();
  organization: Organization = {
    organizationName: '',
    companyRegistrationNr: '',
    vatNr: '',
    who: '',
    what: '',
    help: '',
    supportPhoneNr: '',
    supportEmail: '',
    imageUrl: '',
    id: 0,
    email: '',
    phoneNr: '',
    address: '',
    postalCode: '',
    country: '',
    role: '',
    password: ''
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';
  organization$: Subscription = new Subscription();
  putOrganization$: Subscription = new Subscription();

  imageSrc: string = '';
  showPhoto: boolean = false;
  isImageChanged: boolean = false;
  ref: AngularFireStorageReference | undefined;
  task: AngularFireUploadTask | undefined;
  filePath = `vzw/`;
  imageFile: any;
  uploadProgress: number | undefined;

  organizationForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    phoneNr: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    organizationName: new FormControl('', [Validators.required]),
    companyRegistrationNr: new FormControl('', [Validators.required]),
    vatNr: new FormControl('', [Validators.required]),
    who: new FormControl(''),
    what: new FormControl(''),
    help: new FormControl(''),
    supportPhoneNr: new FormControl(''),
    supportEmail: new FormControl(''),
    imageUrl: new FormControl(''),
    role: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private organizationService: OrganizationService, private authService: AuthService, private router: Router, private angularFireStorage: AngularFireStorage) {
    this.getOrganization();
  }

  ngOnInit(): void {
    this.organizationService.getOrganizationById(parseInt(this.authService.getUser()!.id)).subscribe(result => (this.organization = result));
  }

  ngOnDestroy(): void {
    this.putOrganization$.unsubscribe();
  }

  async getOrganization(){
    if(parseInt(this.authService.getUser()!.id) > 0 ) {
      this.organization$ = this.organizationService.getOrganizationById(parseInt(this.authService.getUser()!.id)).subscribe(result => {
        this.organizationForm.setValue({
          email: result.email,
          phoneNr: result.phoneNr,
          address: result.address,
          postalCode: result.postalCode,
          country: result.country,
          organizationName: result.organizationName,
          companyRegistrationNr: result.companyRegistrationNr,
          vatNr: result.vatNr,
          who: result.who,
          what: result.what,
          help: result.help,
          supportPhoneNr: result.supportPhoneNr,
          supportEmail: result.supportEmail,
          imageUrl: result.imageUrl,
          role: result.role,
          password: result.password
        });
        console.log("imageUrl result: " + result.imageUrl);
      });
    }
  }

  async updateOrganization() {
    this.organization.id = parseInt(this.authService.getUser()!.id);
    this.organization.email = this.organizationForm.controls['email'].value;
    this.organization.phoneNr = this.organizationForm.controls['phoneNr'].value;
    this.organization.address = this.organizationForm.controls['address'].value;
    this.organization.postalCode = this.organizationForm.controls['postalCode'].value;
    this.organization.country = this.organizationForm.controls['country'].value;
    this.organization.organizationName = this.organizationForm.controls['organizationName'].value;
    this.organization.companyRegistrationNr = this.organizationForm.controls['companyRegistrationNr'].value;
    this.organization.vatNr = this.organizationForm.controls['vatNr'].value;
    this.organization.who = this.organizationForm.controls['who'].value;
    this.organization.what = this.organizationForm.controls['what'].value;
    this.organization.help = this.organizationForm.controls['help'].value;
    this.organization.supportPhoneNr = this.organizationForm.controls['supportPhoneNr'].value;
    this.organization.supportEmail = this.organizationForm.controls['supportEmail'].value;
    this.organization.imageUrl = this.organizationForm.controls['imageUrl'].value;
    this.organization.role = this.organizationForm.controls['role'].value;
    this.organization.password = this.organizationForm.controls['password'].value;

    this.putOrganization$ = this.organizationService.putOrganization(this.organization).subscribe(result => {
        this.router.navigateByUrl("/organisatie");
      },
      error => {
        this.errorMessage = error.message;
      });
  }

  onImageSelected(event: any): void {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    this.filePath += randomId;
    // create a reference to the storage bucket location
    this.ref = this.angularFireStorage.ref(this.filePath);
    this.imageFile = event.target.files[0];
    this.isImageChanged = true;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if(this.imageFile === undefined) {
      this.isSubmitted = false;
      this.errorMessage = "Geen afbeelding geselecteerd";
    } else {
      if(this.isImageChanged) {
        this.task = this.angularFireStorage.upload(this.filePath, this.imageFile);
        this.task.snapshotChanges().subscribe(result => {
          this.ref?.getDownloadURL().subscribe(url => {
            console.log(url);
            this.organizationForm.patchValue({
              imageUrl: url
            });
            this.imageSrc = url
            console.log("ImageSrc " + this.imageSrc);
            if(url !== undefined) {
              this.submitData();
            }
          });
        });
        this.task.percentageChanges().subscribe(p => this.uploadProgress = p);
      } else {
        this.submitData();
      }
    }
  }

  async submitData() {
    this.updateOrganization();
  }

}
