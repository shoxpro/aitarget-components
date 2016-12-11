enum gender {
  'men'   = 1,
  'women' = 2
}

export interface GendersSpec {
  genders?: Array<gender> | null;
}
