import { Field } from '../../lib/components/filtering/field.interface';
import { Operator } from '../../lib/components/filtering/operator.class';

export const FIELDS: Array<Field> = [
  {
    'type':     'string',
    'name':     'Delivery',
    'id':       'effective_status',
    'input':    'select',
    'values':   {
      'ACTIVE':               'Active',
      'PAUSED':               'Paused',
      'DELETED':              'Deleted',
      'ARCHIVED':             'Archived',
      'DISAPPROVED':          'Dis-approved',
      'PREAPPROVED':          'Pre-approved',
      'ADSET_PAUSED':         'Ad set paused',
      'PENDING_REVIEW':       'Pending review',
      'CAMPAIGN_PAUSED':      'Campaign paused',
      'PENDING_BILLING_INFO': 'Pending billing info'
    },
    'multiple': true,
    'operator': [
      Operator.IN,
      Operator.NOT_IN
    ]
  }, {
    'type':     'string',
    'name':     'Campaign Name',
    'id':       'campaign_name',
    'input':    'input',
    'operator': [
      Operator.CONTAIN,
      Operator.NOT_CONTAIN
    ]
  }
];
