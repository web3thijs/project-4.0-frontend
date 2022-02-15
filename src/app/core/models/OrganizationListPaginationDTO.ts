import { Organization } from "./Organization";

export interface OrganizationListPaginationDTO {
  content: Organization[];
  totalPages: number;
}
