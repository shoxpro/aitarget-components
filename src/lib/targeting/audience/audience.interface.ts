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
  reachestimate: ReachEstimate | {};
  formValue: any;
  budget: number;
  bid: number;
  active: number;
  valid: boolean;
}

export const audienceInitial: AudienceState = {
  name:                   '',
  spec:                   targetingSpecInitial,
  targetingsentencelines: [],
  reachestimate:          {},
  formValue:              {},
  budget:                 0.0,
  bid:                    0.0,
  active:                 1,
  valid:                  true
};
