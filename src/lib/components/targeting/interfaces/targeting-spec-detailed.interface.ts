type Id = number;

interface SelectedItem {
  id: Id;
  name?: string;
}

enum relationshipStatuses {
  'single'                    = 1,
  'in_relationship'           = 2,
  'married'                   = 3,
  'engaged'                   = 4,
  'not specified'             = 6,
  'in a civil union'          = 7,
  'in a domestic partnership' = 8,
  'In an open relationship'   = 9,
  'It is complicated'         = 10,
  'Separated'                 = 11,
  'Divorced'                  = 12,
  'Widowed'                   = 13
}

enum InterestedIn {
  'men'           = 1,
  'women'         = 2,
  'men and women' = 3,
  'not specified' = 4
}

enum EducationStatuses {
  'HIGH_SCHOOL'         = 1,
  'UNDERGRAD'           = 2,
  'ALUM'                = 3,
  'HIGH_SCHOOL_GRAD'    = 4,
  'SOME_COLLEGE'        = 5,
  'ASSOCIATE_DEGREE'    = 6,
  'IN_GRAD_SCHOOL'      = 7,
  'SOME_GRAD_SCHOOL'    = 8,
  'MASTER_DEGREE'       = 9,
  'PROFESSIONAL_DEGREE' = 10,
  'DOCTORATE_DEGREE'    = 11,
  'UNSPECIFIED'         = 12,
  'SOME_HIGH_SCHOOL'    = 13
}

export interface DetailedSpec {
  interests?: Array<SelectedItem | Id>;
  behaviors?: Array<SelectedItem | Id>;
  relationship_statuses?: relationshipStatuses[]; // Array of enum values
  interested_in?: InterestedIn[]; // Array of enum values
  life_events?: Array<SelectedItem | Id>;
  politics?: Array<SelectedItem | Id>;
  industries?: Array<SelectedItem | Id>;
  income?: Array<SelectedItem | Id>;
  net_worth?: Array<SelectedItem | Id>;
  home_type?: Array<SelectedItem | Id>;
  home_ownership?: Array<SelectedItem | Id>;
  ethnic_affinity?: Array<SelectedItem | Id>;
  generation?: Array<SelectedItem | Id>;
  household_composition?: Array<SelectedItem | Id>;
  moms?: Array<SelectedItem | Id>;
  office_type?: Array<SelectedItem | Id>;
  education_schools?: Array<SelectedItem | Id>; // Limit: 200 education schools.
  education_statuses?: EducationStatuses[]; // Array of enum values
  college_years?: Array<number>; // Array of integers for graduation year from college. The earliest year is 1980.
  education_majors?: Array<SelectedItem | Id>; // Limit: 200 education majors.
  work_employers?: Array<SelectedItem | Id>; // Limit: 200 employers.
  work_positions?: Array<SelectedItem | Id>; // Limit: 200 work positions.
}

export interface DetailedTargetingSpec {
  flexible_spec: Array<DetailedSpec>;
  exclusions: DetailedSpec | null;
}

export const detailedSpecInitial: DetailedSpec = {
  interests:             [],
  behaviors:             [],
  relationship_statuses: [],
  interested_in:         [],
  life_events:           [],
  politics:              [],
  industries:            [],
  income:                [],
  net_worth:             [],
  home_type:             [],
  home_ownership:        [],
  ethnic_affinity:       [],
  generation:            [],
  household_composition: [],
  moms:                  [],
  office_type:           [],
  education_schools:     [],
  education_statuses:    [],
  college_years:         [],
  education_majors:      [],
  work_employers:        [],
  work_positions:        []
};

export const detailedTargetingSpecInitial: DetailedTargetingSpec = {
  flexible_spec: [{}],
  exclusions:    null
};
