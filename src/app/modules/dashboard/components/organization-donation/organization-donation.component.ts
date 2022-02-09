import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Donation } from 'src/app/core/models/Donation';
import { AuthService } from 'src/app/modules/security/auth.service';
import { DonationService } from 'src/app/shared/services/donation.service';
import { Order } from 'src/app/core/models/Order';

@Component({
  selector: 'app-organization-donation',
  templateUrl: './organization-donation.component.html',
  styleUrls: ['./organization-donation.component.scss']
})
export class OrganizationDonationComponent implements OnInit {
  donations$: Observable<Donation[]>;

  constructor(private donationService: DonationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getDonations();
  }

  getDonations() {
    this.donations$ = this.donationService.getDonationsByOrganizationId(parseInt(this.authService.getUser()!.id)).pipe(
      map(response => response)
    );
  }

}
