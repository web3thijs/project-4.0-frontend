import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-organization',
  templateUrl: './register-organization.component.html',
  styleUrls: ['./register-organization.component.scss']
})
export class RegisterOrganizationComponent implements OnInit {
  formPartOneIsShown = true;
  formPartTwoIsShown = false;
  formPartThreeIsShown = false;

  organizationName = '';
  companyNumber = '';
  phoneNumber = '';
  address = '';
  phoneNumberSupport = '';
  emailSupport = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor() { }

  ngOnInit(): void {
  }

  toFormStep2() {
    this.formPartOneIsShown = false;
    this.formPartTwoIsShown = true;

    this.organizationName = (<HTMLInputElement>document.getElementById("vzwnaam")).value;
    this.companyNumber = (<HTMLInputElement>document.getElementById("ondernemingsnummer")).value;
    this.phoneNumber = (<HTMLInputElement>document.getElementById("telefoonnummer")).value;
    this.address = (<HTMLInputElement>document.getElementById("adres")).value;
    /*
    */

    console.log("Naam vzw = " + this.organizationName);
    console.log("Ondernemingsnummer = " + this.companyNumber);
    console.log("Telefoonnummer = " + this.phoneNumber);
    console.log("Adres = " + this.address);
  }

  toFormStep3() {
    this.formPartTwoIsShown = false;
    this.formPartThreeIsShown = true;

    this.phoneNumberSupport = (<HTMLInputElement>document.getElementById("telefoonnummersupport")).value;
    this.emailSupport = (<HTMLInputElement>document.getElementById("emailsupport")).value;

    console.log("Telefoonnummer support = " + this.phoneNumberSupport);
    console.log("E-mail support = " + this.emailSupport);
  }

  registerOrganization() {
    this.email = (<HTMLInputElement>document.getElementById("email")).value;
    this.password = (<HTMLInputElement>document.getElementById("wachtwoord")).value;
    this.confirmPassword = (<HTMLInputElement>document.getElementById("wachtwoordbevestiging")).value;

    console.log("E-mail = " + this.email);
    console.log("Wachtwoord = " + this.password);
    console.log("Bevestiging wachtwoord = " + this.confirmPassword);
  }
}
