import { TargetingSpec, targetingSpecInitial } from '../interfaces/targeting-spec.interface';

interface ReachEstimate {
  bid_estimations: any;
  data_source: string;
  estimate_ready: boolean;
  users: number;
}

export interface AudienceState {
  name: string;
  spec: TargetingSpec;
  targetingsentencelines: Array<{content: string, children: Array<string>}>;
  reachestimate: ReachEstimate | any;
  formValue: any;
  budget: number | null;
  bid: number | null;
  bidAuto: boolean;
  active: boolean;
  valid: boolean;
  validForFacebook: boolean;
}

export const audienceInitial: AudienceState = {
  name:                   '',
  spec:                   targetingSpecInitial,
  targetingsentencelines: [],
  reachestimate:          {},
  formValue:              {},
  budget:                 null,
  bid:                    null,
  bidAuto:                true,
  active:                 true,
  valid:                  true,
  validForFacebook:       true
};
