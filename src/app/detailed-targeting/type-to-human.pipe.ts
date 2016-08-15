import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeToHuman'
})
export class TypeToHumanPipe implements PipeTransform {

  transform (value: any, args?: any): any {
    let map = {
      interests: 'Interests',
      behaviors: 'Behaviors',
      relationship_statuses: 'Relationship Status',
      interested_in: 'Interested In',
      life_events: 'Life Events',
      politics: 'Politics',
      industries: 'Industries',
      income: 'Income',
      net_worth: 'Net Worth',
      home_type: 'Home Type',
      home_ownership: 'Home Ownership',
      ethnic_affinity: 'Ethnic Affinity',
      generation: 'Generation',
      household_composition: 'Household Composition',
      moms: 'Moms',
      family_statuses: 'Family Status',
      office_type: 'Office Type',
      education_schools: 'Schools',
      education_statuses: 'Education Level',
      college_years: 'College Years',
      education_majors: 'Fields Of Study',
      work_employers: 'Employers',
      work_positions: 'Job Titles'
    };
    return map[value] || value;
  }

}
