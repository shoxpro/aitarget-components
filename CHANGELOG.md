<a name="0.0.9-0"></a>
## 0.0.9-0 (2016-09-29)

* chore: bump version patch to v0.0.7 50c9d40
* chore: bump version patch to v0.0.8 0a9278c
* chore: bump version prerelease to v0.0.7-1 f82ee85
* chore: bump version prerelease to v0.0.7-2 5315862
* chore: bump version prerelease to v0.0.9-0 bb2d09c
* chore(): install packages for changelog update c0db3e3
* chore(angular2-final): update project to angular@2.0.0, fix tests environment, close #69 b7f3f51, closes #69
* chore(e2e): run lite-server before e2e tests, #21 7dc28e8
* chore(gh-pages): remove custom gh-pages script 1e16115
* chore(heo-targeting): add sample files for geo-component, #72 396c74a
* chore(package.json): add gh-pages script shortcut 9ec592b
* chore(test): test environment works, #17 b9032c6
* chore(travis): add cache folder, run e2e tests, run linting a293100
* chore(travis): add travis badge and travis support for unit tests, #21 93a4adc
* chore(travis): remove unnecessary steps in travis build, #21 c942de0
* fix(): multiple fixes before integrating to fb.aitarget tool, #76 a8b3b71, closes #76
* fix(): remove checking for spec equality in detailed-targeting component a8e0b2d
* fix(): some fixes and improvements before integrating to fb.aitarget.com, #87 624d5f8, closes #87
* fix(adaccount): use adaccount passed to detailed-targeting component, #67 2f177a5
* fix(appendToBody): change clientRect for counting position 54da142
* fix(full-name): don't include country name twice for countries 1785472
* fix(geo-targeting-info): auto height and vertical-align middle, close #84 7242097, closes #84
* fix(geo-targeting-mode): make the component visualy clickable daa1c84
* fix(remove): fix removing items 903b05c
* fix(remove): switch off user select of remove button, #76 62abb0c
* feat(appendTo): fixes to append to directive 92a636a
* feat(directives): add clickOutside and appendToBody directives and rewrite radius dropdown using the dfa7bb9
* feat(excluded): update targeting spec with  included and excluded locations, #75 b851425
* feat(geo-targeting-info): show info block when change locations from broader to narrower or visa ver 996d4b2
* feat(geo-targeting-info): update info component, support error mode, #75 7562a40
* feat(geo-targeting-mode): add mode component for including and excluding locations, #75 6f6fe3e
* feat(geo-targeting-pin): add included and excluded pin icons 2e374dd
* feat(geo-targeting-radius): add component for showing and selecting radius, #76 8d3b777
* feat(geo-targeting-radius): add styling to the component, #76 bb26834
* feat(geo-targeting-type): add component basic functionality, #93 19d4031
* feat(localization): add translations, fix updating mode when language change, #83 3ed0dd7, closes #83
* feat(LocationType): add component styling, add arrow-drop component, #93 4b44c23
* feat(locationTypes): add realization for geo-targeting-type, missing styling, #93 3344485
* feat(radius): add saved radius to returned by adgeolocationmeta items, #76 cabafd6
* feat(radius): basic geo-targeting-radius realization, #76 acbeb50
* feat(selected-service): save previous items and items to replace, #74 96a9c15
* feat(selected): validate selecting new items (included and excluded) and show proper info messages,  be4d1db
* feat(spec): show preselected geo locations, #74 358145f
* feat(targeting spec): update targeting spec when selected locations changes, #74 06ffefe
* feature(): search for locations and show results in dropdown, #72 9f0b433
* feature(full-name): add fullName pipe, #74 0815263
* feature(geo-targeting-dropdown): add dropdown with items for searched location, #72 b79bf83
* feature(geo-targeting): add geo-targeting-input component, improve routing, #72 a74c161
* feature(routing): add geo-targeting component, enable routing navigation, #17 #71 e2d5928
* feature(selected): replace broader and narrower locations when adding new item, #74 504641b
* feature(targeting-spec-geo): add interface and default const for geo targeting spec, #74 979cf3a
* feature(type): add location types to translations, #83 f651144
* test(e2e): add e2e sample tetsts for detailed-targeting, #17 d57e7bb
* test(e2e): add some e2e tests, enable login, #17 773fc4d
* test(full-name): add tests for full-name pipe, #74 5249bd4
* test(unit): fix unit tests, #17 c722283, closes #17
* WIP(selected): add geo-targeting-item interface, basic selection mode, #74 add8909
* WIP(selected): add styling for selected items, fix closing dropdown when select, #74 af3c0e2, closes #74
* refactor(tests): remove all old tests, #17 7085677
* refactor(tslint): ng lint all files, #17 aa07c7e



<a name="0.0.8"></a>
## 0.0.8 (2016-09-25)

* chore: bump version patch to v0.0.7 50c9d40
* chore: bump version patch to v0.0.8 37db250
* chore: bump version prerelease to v0.0.7-1 f82ee85
* chore: bump version prerelease to v0.0.7-2 5315862
* chore(): install packages for changelog update c0db3e3
* chore(angular2-final): update project to angular@2.0.0, fix tests environment, close #69 b7f3f51, closes #69
* chore(e2e): run lite-server before e2e tests, #21 7dc28e8
* chore(gh-pages): remove custom gh-pages script 1e16115
* chore(heo-targeting): add sample files for geo-component, #72 396c74a
* chore(package.json): add gh-pages script shortcut 9ec592b
* chore(test): test environment works, #17 b9032c6
* chore(travis): add cache folder, run e2e tests, run linting a293100
* chore(travis): add travis badge and travis support for unit tests, #21 93a4adc
* chore(travis): remove unnecessary steps in travis build, #21 c942de0
* fix(): remove checking for spec equality in detailed-targeting component a8e0b2d
* fix(): some fixes and improvements before integrating to fb.aitarget.com, #87 624d5f8, closes #87
* fix(adaccount): use adaccount passed to detailed-targeting component, #67 2f177a5
* fix(full-name): don't include country name twice for countries 1785472
* fix(geo-targeting-info): auto height and vertical-align middle, close #84 7242097, closes #84
* fix(remove): fix removing items 903b05c
* feat(excluded): update targeting spec with  included and excluded locations, #75 b851425
* feat(geo-targeting-info): show info block when change locations from broader to narrower or visa ver 996d4b2
* feat(geo-targeting-info): update info component, support error mode, #75 7562a40
* feat(geo-targeting-mode): add mode component for including and excluding locations, #75 6f6fe3e
* feat(geo-targeting-pin): add included and excluded pin icons 2e374dd
* feat(localization): add translations, fix updating mode when language change, #83 3ed0dd7, closes #83
* feat(selected-service): save previous items and items to replace, #74 96a9c15
* feat(selected): validate selecting new items (included and excluded) and show proper info messages,  be4d1db
* feat(spec): show preselected geo locations, #74 358145f
* feat(targeting spec): update targeting spec when selected locations changes, #74 06ffefe
* feature(): search for locations and show results in dropdown, #72 9f0b433
* feature(full-name): add fullName pipe, #74 0815263
* feature(geo-targeting-dropdown): add dropdown with items for searched location, #72 b79bf83
* feature(geo-targeting): add geo-targeting-input component, improve routing, #72 a74c161
* feature(routing): add geo-targeting component, enable routing navigation, #17 #71 e2d5928
* feature(selected): replace broader and narrower locations when adding new item, #74 504641b
* feature(targeting-spec-geo): add interface and default const for geo targeting spec, #74 979cf3a
* feature(type): add location types to translations, #83 f651144
* test(e2e): add e2e sample tetsts for detailed-targeting, #17 d57e7bb
* test(e2e): add some e2e tests, enable login, #17 773fc4d
* test(full-name): add tests for full-name pipe, #74 5249bd4
* test(unit): fix unit tests, #17 c722283, closes #17
* WIP(selected): add geo-targeting-item interface, basic selection mode, #74 add8909
* WIP(selected): add styling for selected items, fix closing dropdown when select, #74 af3c0e2, closes #74
* refactor(tests): remove all old tests, #17 7085677
* refactor(tslint): ng lint all files, #17 aa07c7e



<a name="0.0.7-2"></a>
## [0.0.7-2](https://github.com/aitarget/aitarget-components/compare/v0.0.7-2...0.0.7-2) (2016-09-14)


### Bug Fixes

* **adaccount:** use adaccount passed to detailed-targeting component, #67 ([2f177a5](https://github.com/aitarget/aitarget-components/commit/2f177a5))
* **remove:** fix removing items ([903b05c](https://github.com/aitarget/aitarget-components/commit/903b05c))



<a name="0.0.7-1"></a>
## [0.0.7-1](https://github.com/aitarget/aitarget-components/compare/v0.0.7-1...0.0.7-1) (2016-09-12)


### Bug Fixes

* **remove:** fix removing items ([903b05c](https://github.com/aitarget/aitarget-components/commit/903b05c))



<a name="0.0.7-0"></a>
## [0.0.7-0](https://github.com/aitarget/aitarget-components/compare/v0.0.7-0...0.0.7-0) (2016-09-12)


### Bug Fixes

* **browse:** always switch to browse when clicking on crumbs, even from browse search mode ([cb2959c](https://github.com/aitarget/aitarget-components/commit/cb2959c))
* **browse:** specify fields when requesting for browse list, close #60 ([f976a43](https://github.com/aitarget/aitarget-components/commit/f976a43)), closes [#60](https://github.com/aitarget/aitarget-components/issues/60)
* **dropdown:** set fixed suggested dropdown height ([648fc6f](https://github.com/aitarget/aitarget-components/commit/648fc6f))
* **edit:** fix showing previously selected items, #54 ([7cb7fa0](https://github.com/aitarget/aitarget-components/commit/7cb7fa0)), closes [#54](https://github.com/aitarget/aitarget-components/issues/54)
* **enum values:** use ids instead of objects in value arrays in resulting spec, close #56 ([0056575](https://github.com/aitarget/aitarget-components/commit/0056575)), closes [#56](https://github.com/aitarget/aitarget-components/issues/56)
* **enums:** distinct enums in detailed targeting spec, close #49 ([bb89cc3](https://github.com/aitarget/aitarget-components/commit/bb89cc3)), closes [#49](https://github.com/aitarget/aitarget-components/issues/49)
* **exception:** workaround for 'Attempt to use a destroyed view: detectChanges' exception, close #46 ([4794e79](https://github.com/aitarget/aitarget-components/commit/4794e79)), closes [#46](https://github.com/aitarget/aitarget-components/issues/46)
* **info:** close all info blocks when clicked ourside, close #48 ([92f0c80](https://github.com/aitarget/aitarget-components/commit/92f0c80)), closes [#48](https://github.com/aitarget/aitarget-components/issues/48)
* **mode:** if clicked of the current mode, set mode to null ([f7fe54b](https://github.com/aitarget/aitarget-components/commit/f7fe54b))
* **placeholder:** make input font-weight: normal, close #38 ([8ad7333](https://github.com/aitarget/aitarget-components/commit/8ad7333)), closes [#38](https://github.com/aitarget/aitarget-components/issues/38)
* **search:** open browse search mode when clicking on search icon ([e7f32a3](https://github.com/aitarget/aitarget-components/commit/e7f32a3))
* **selected:** support both types of selected values, #56 ([c8d468f](https://github.com/aitarget/aitarget-components/commit/c8d468f))
* **style:** improve style of detailed-targeting-selected component, close #45 ([3d879c3](https://github.com/aitarget/aitarget-components/commit/3d879c3)), closes [#45](https://github.com/aitarget/aitarget-components/issues/45)
* **style:** minor style fixes ([afe97be](https://github.com/aitarget/aitarget-components/commit/afe97be))
* **style:** small style fix ([1f3bdf6](https://github.com/aitarget/aitarget-components/commit/1f3bdf6))
* **sync selected:** toggle selected property after browse items loaded or selected items change, close #59 ([9519bb8](https://github.com/aitarget/aitarget-components/commit/9519bb8)), closes [#59](https://github.com/aitarget/aitarget-components/issues/59)
* updating external spec, #54 ([64173eb](https://github.com/aitarget/aitarget-components/commit/64173eb))


### Features

* **onchange:** trigger spec onchange function if it is really changed and skip triggering on initialization ([47cb9c6](https://github.com/aitarget/aitarget-components/commit/47cb9c6))
* **spec:** when updating spec with new detailed targeting, don't leave properties with empty arrays ([0f0670e](https://github.com/aitarget/aitarget-components/commit/0f0670e))



<a name="0.0.6"></a>
## [0.0.6](https://github.com/aitarget/aitarget-components/compare/v0.0.7-0...0.0.6) (2016-09-11)


### Bug Fixes

* **browse:** always switch to browse when clicking on crumbs, even from browse search mode ([cb2959c](https://github.com/aitarget/aitarget-components/commit/cb2959c))
* **browse:** specify fields when requesting for browse list, close #60 ([f976a43](https://github.com/aitarget/aitarget-components/commit/f976a43)), closes [#60](https://github.com/aitarget/aitarget-components/issues/60)
* **dropdown:** set fixed suggested dropdown height ([648fc6f](https://github.com/aitarget/aitarget-components/commit/648fc6f))
* **edit:** fix showing previously selected items, #54 ([7cb7fa0](https://github.com/aitarget/aitarget-components/commit/7cb7fa0)), closes [#54](https://github.com/aitarget/aitarget-components/issues/54)
* **enum values:** use ids instead of objects in value arrays in resulting spec, close #56 ([0056575](https://github.com/aitarget/aitarget-components/commit/0056575)), closes [#56](https://github.com/aitarget/aitarget-components/issues/56)
* **enums:** distinct enums in detailed targeting spec, close #49 ([bb89cc3](https://github.com/aitarget/aitarget-components/commit/bb89cc3)), closes [#49](https://github.com/aitarget/aitarget-components/issues/49)
* **exception:** workaround for 'Attempt to use a destroyed view: detectChanges' exception, close #46 ([4794e79](https://github.com/aitarget/aitarget-components/commit/4794e79)), closes [#46](https://github.com/aitarget/aitarget-components/issues/46)
* **info:** close all info blocks when clicked ourside, close #48 ([92f0c80](https://github.com/aitarget/aitarget-components/commit/92f0c80)), closes [#48](https://github.com/aitarget/aitarget-components/issues/48)
* **mode:** if clicked of the current mode, set mode to null ([f7fe54b](https://github.com/aitarget/aitarget-components/commit/f7fe54b))
* updating external spec, #54 ([64173eb](https://github.com/aitarget/aitarget-components/commit/64173eb))
* **placeholder:** make input font-weight: normal, close #38 ([8ad7333](https://github.com/aitarget/aitarget-components/commit/8ad7333)), closes [#38](https://github.com/aitarget/aitarget-components/issues/38)
* **search:** open browse search mode when clicking on search icon ([e7f32a3](https://github.com/aitarget/aitarget-components/commit/e7f32a3))
* **selected:** support both types of selected values, #56 ([c8d468f](https://github.com/aitarget/aitarget-components/commit/c8d468f))
* **style:** improve style of detailed-targeting-selected component, close #45 ([3d879c3](https://github.com/aitarget/aitarget-components/commit/3d879c3)), closes [#45](https://github.com/aitarget/aitarget-components/issues/45)
* **style:** small style fix ([1f3bdf6](https://github.com/aitarget/aitarget-components/commit/1f3bdf6))
* **sync selected:** toggle selected property after browse items loaded or selected items change, close #59 ([9519bb8](https://github.com/aitarget/aitarget-components/commit/9519bb8)), closes [#59](https://github.com/aitarget/aitarget-components/issues/59)


### Features

* **onchange:** trigger spec onchange function if it is really changed and skip triggering on initialization ([47cb9c6](https://github.com/aitarget/aitarget-components/commit/47cb9c6))
* **spec:** when updating spec with new detailed targeting, don't leave properties with empty arrays ([0f0670e](https://github.com/aitarget/aitarget-components/commit/0f0670e))



<a name="0.0.6-13"></a>
## [0.0.6-13](https://github.com/aitarget/aitarget-components/compare/v0.0.7-0...0.0.6-13) (2016-09-08)


### Bug Fixes

* updating external spec, #54 ([64173eb](https://github.com/aitarget/aitarget-components/commit/64173eb))
* **browse:** specify fields when requesting for browse list, close #60 ([f976a43](https://github.com/aitarget/aitarget-components/commit/f976a43)), closes [#60](https://github.com/aitarget/aitarget-components/issues/60)
* **dropdown:** set fixed suggested dropdown height ([648fc6f](https://github.com/aitarget/aitarget-components/commit/648fc6f))
* **edit:** fix showing previously selected items, #54 ([7cb7fa0](https://github.com/aitarget/aitarget-components/commit/7cb7fa0)), closes [#54](https://github.com/aitarget/aitarget-components/issues/54)
* **enum values:** use ids instead of objects in value arrays in resulting spec, close #56 ([0056575](https://github.com/aitarget/aitarget-components/commit/0056575)), closes [#56](https://github.com/aitarget/aitarget-components/issues/56)
* **enums:** distinct enums in detailed targeting spec, close #49 ([bb89cc3](https://github.com/aitarget/aitarget-components/commit/bb89cc3)), closes [#49](https://github.com/aitarget/aitarget-components/issues/49)
* **exception:** workaround for 'Attempt to use a destroyed view: detectChanges' exception, close #46 ([4794e79](https://github.com/aitarget/aitarget-components/commit/4794e79)), closes [#46](https://github.com/aitarget/aitarget-components/issues/46)
* **info:** close all info blocks when clicked ourside, close #48 ([92f0c80](https://github.com/aitarget/aitarget-components/commit/92f0c80)), closes [#48](https://github.com/aitarget/aitarget-components/issues/48)
* **placeholder:** make input font-weight: normal, close #38 ([8ad7333](https://github.com/aitarget/aitarget-components/commit/8ad7333)), closes [#38](https://github.com/aitarget/aitarget-components/issues/38)
* **style:** improve style of detailed-targeting-selected component, close #45 ([3d879c3](https://github.com/aitarget/aitarget-components/commit/3d879c3)), closes [#45](https://github.com/aitarget/aitarget-components/issues/45)


### Features

* **onchange:** trigger spec onchange function if it is really changed and skip triggering on initialization ([47cb9c6](https://github.com/aitarget/aitarget-components/commit/47cb9c6))
* **spec:** when updating spec with new detailed targeting, don't leave properties with empty arrays ([0f0670e](https://github.com/aitarget/aitarget-components/commit/0f0670e))



<a name="0.0.6-12"></a>
## [0.0.6-12](https://github.com/aitarget/aitarget-components/compare/v0.0.7-0...0.0.6-12) (2016-09-05)


### Bug Fixes

* **enums:** distinct enums in detailed targeting spec, close #49 ([bb89cc3](https://github.com/aitarget/aitarget-components/commit/bb89cc3)), closes [#49](https://github.com/aitarget/aitarget-components/issues/49)
* **exception:** workaround for 'Attempt to use a destroyed view: detectChanges' exception, close #46 ([4794e79](https://github.com/aitarget/aitarget-components/commit/4794e79)), closes [#46](https://github.com/aitarget/aitarget-components/issues/46)
* **info:** close all info blocks when clicked ourside, close #48 ([92f0c80](https://github.com/aitarget/aitarget-components/commit/92f0c80)), closes [#48](https://github.com/aitarget/aitarget-components/issues/48)
* **placeholder:** make input font-weight: normal, close #38 ([8ad7333](https://github.com/aitarget/aitarget-components/commit/8ad7333)), closes [#38](https://github.com/aitarget/aitarget-components/issues/38)
* **style:** improve style of detailed-targeting-selected component, close #45 ([3d879c3](https://github.com/aitarget/aitarget-components/commit/3d879c3)), closes [#45](https://github.com/aitarget/aitarget-components/issues/45)


### Features

* **onchange:** trigger spec onchange function if it is really changed and skip triggering on initialization ([47cb9c6](https://github.com/aitarget/aitarget-components/commit/47cb9c6))
* **spec:** when updating spec with new detailed targeting, don't leave properties with empty arrays ([0f0670e](https://github.com/aitarget/aitarget-components/commit/0f0670e))



<a name="0.0.6-11"></a>
## [0.0.6-11](https://github.com/aitarget/aitarget-components/compare/v0.0.7-0...0.0.6-11) (2016-09-05)


### Bug Fixes

* **enums:** distinct enums in detailed targeting spec, close #49 ([bb89cc3](https://github.com/aitarget/aitarget-components/commit/bb89cc3)), closes [#49](https://github.com/aitarget/aitarget-components/issues/49)
* **info:** close all info blocks when clicked ourside, close #48 ([92f0c80](https://github.com/aitarget/aitarget-components/commit/92f0c80)), closes [#48](https://github.com/aitarget/aitarget-components/issues/48)
* **placeholder:** make input font-weight: normal, close #38 ([8ad7333](https://github.com/aitarget/aitarget-components/commit/8ad7333)), closes [#38](https://github.com/aitarget/aitarget-components/issues/38)
* **style:** improve style of detailed-targeting-selected component, close #45 ([3d879c3](https://github.com/aitarget/aitarget-components/commit/3d879c3)), closes [#45](https://github.com/aitarget/aitarget-components/issues/45)


### Features

* **onchange:** trigger spec onchange function if it is really changed and skip triggering on initialization ([47cb9c6](https://github.com/aitarget/aitarget-components/commit/47cb9c6))
* **spec:** when updating spec with new detailed targeting, don't leave properties with empty arrays ([0f0670e](https://github.com/aitarget/aitarget-components/commit/0f0670e))



<a name="0.0.6-10"></a>
## [0.0.6-10](https://github.com/aitarget/aitarget-components/compare/v0.0.6-9...0.0.6-10) (2016-09-02)


### Bug Fixes

* **placeholder:** make input font-weight: normal, close #38 ([8ad7333](https://github.com/aitarget/aitarget-components/commit/8ad7333)), closes [#38](https://github.com/aitarget/aitarget-components/issues/38)


### Features

* **onchange:** trigger spec onchange function if it is really changed and skip triggering on initialization ([47cb9c6](https://github.com/aitarget/aitarget-components/commit/47cb9c6))
* **spec:** when updating spec with new detailed targeting, don't leave properties with empty arrays ([0f0670e](https://github.com/aitarget/aitarget-components/commit/0f0670e))



<a name="0.0.6-9"></a>
## [0.0.6-9](https://github.com/aitarget/aitarget-components/compare/v0.0.6-9...0.0.6-9) (2016-08-31)


### Bug Fixes

* **placeholder:** make input font-weight: normal, close #38 ([8ad7333](https://github.com/aitarget/aitarget-components/commit/8ad7333)), closes [#38](https://github.com/aitarget/aitarget-components/issues/38)



<a name="0.0.6-8"></a>
## [0.0.6-8](https://github.com/aitarget/aitarget-components/compare/v0.0.6-8...0.0.6-8) (2016-08-31)


### Bug Fixes

* **placeholder:** make input font-weight: normal, close #38 ([8ad7333](https://github.com/aitarget/aitarget-components/commit/8ad7333)), closes [#38](https://github.com/aitarget/aitarget-components/issues/38)



<a name="0.0.6-7"></a>
## [0.0.6-7](https://github.com/aitarget/aitarget-components/compare/v0.0.6-7...0.0.6-7) (2016-08-31)


### Bug Fixes

* **placeholder:** make input font-weight: normal, close #38 ([8ad7333](https://github.com/aitarget/aitarget-components/commit/8ad7333)), closes [#38](https://github.com/aitarget/aitarget-components/issues/38)



## [v0.0.6-6](https://github.com/aitarget/aitarget-components/tree/v0.0.6-6) (2016-08-31)
[Full Changelog](https://github.com/aitarget/aitarget-components/compare/v0.0.6-5...v0.0.6-6)

## [v0.0.6-5](https://github.com/aitarget/aitarget-components/tree/v0.0.6-5) (2016-08-31)
[Full Changelog](https://github.com/aitarget/aitarget-components/compare/v0.0.6-4...v0.0.6-5)

## [v0.0.6-4](https://github.com/aitarget/aitarget-components/tree/v0.0.6-4) (2016-08-31)
[Full Changelog](https://github.com/aitarget/aitarget-components/compare/v0.0.6-3...v0.0.6-4)

**Merged pull requests:**

- Feature/detailed targeting [\#40](https://github.com/aitarget/aitarget-components/pull/40) ([yuriMalakhov](https://github.com/yuriMalakhov))

## [v0.0.6-3](https://github.com/aitarget/aitarget-components/tree/v0.0.6-3) (2016-08-30)
[Full Changelog](https://github.com/aitarget/aitarget-components/compare/v0.0.6-2...v0.0.6-3)

**Closed issues:**

- Customize detailed-targeting design according to fb.aitarget.com tool [\#36](https://github.com/aitarget/aitarget-components/issues/36)

**Merged pull requests:**

- Feature/detailed targeting [\#39](https://github.com/aitarget/aitarget-components/pull/39) ([yuriMalakhov](https://github.com/yuriMalakhov))

## [v0.0.6-2](https://github.com/aitarget/aitarget-components/tree/v0.0.6-2) (2016-08-30)
[Full Changelog](https://github.com/aitarget/aitarget-components/compare/v0.0.6-1...v0.0.6-2)

## [v0.0.6-1](https://github.com/aitarget/aitarget-components/tree/v0.0.6-1) (2016-08-26)
[Full Changelog](https://github.com/aitarget/aitarget-components/compare/v0.0.6-0...v0.0.6-1)

**Closed issues:**

- Support webpack dev and prod mods [\#33](https://github.com/aitarget/aitarget-components/issues/33)
- Rename class names [\#27](https://github.com/aitarget/aitarget-components/issues/27)

**Merged pull requests:**

- refactor\(webpack\): some linting and refactoring of webpack.config [\#35](https://github.com/aitarget/aitarget-components/pull/35) ([yuriMalakhov](https://github.com/yuriMalakhov))
- Add dev and prod modes, speed up development [\#34](https://github.com/aitarget/aitarget-components/pull/34) ([yuriMalakhov](https://github.com/yuriMalakhov))
- Rename and classes according to BEM notation [\#32](https://github.com/aitarget/aitarget-components/pull/32) ([yuriMalakhov](https://github.com/yuriMalakhov))

## [v0.0.6-0](https://github.com/aitarget/aitarget-components/tree/v0.0.6-0) (2016-08-25)
[Full Changelog](https://github.com/aitarget/aitarget-components/compare/v0.0.5-0...v0.0.6-0)

**Closed issues:**

- Move npm publish logic to external scripts [\#28](https://github.com/aitarget/aitarget-components/issues/28)

**Merged pull requests:**

- Chore/npm/scripts [\#29](https://github.com/aitarget/aitarget-components/pull/29) ([yuriMalakhov](https://github.com/yuriMalakhov))

## [v0.0.5-0](https://github.com/aitarget/aitarget-components/tree/v0.0.5-0) (2016-08-24)
[Full Changelog](https://github.com/aitarget/aitarget-components/compare/v0.0.4...v0.0.5-0)

## [v0.0.4](https://github.com/aitarget/aitarget-components/tree/v0.0.4) (2016-08-24)
[Full Changelog](https://github.com/aitarget/aitarget-components/compare/v0.0.3...v0.0.4)

**Closed issues:**

- Make library work in demo html file [\#25](https://github.com/aitarget/aitarget-components/issues/25)
- Add tags when deploy library to NPM [\#24](https://github.com/aitarget/aitarget-components/issues/24)

**Merged pull requests:**

- One of the first library versions that work with main tool [\#26](https://github.com/aitarget/aitarget-components/pull/26) ([yuriMalakhov](https://github.com/yuriMalakhov))

## [v0.0.3](https://github.com/aitarget/aitarget-components/tree/v0.0.3) (2016-08-23)
[Full Changelog](https://github.com/aitarget/aitarget-components/compare/v0.0.1...v0.0.3)

## [v0.0.1](https://github.com/aitarget/aitarget-components/tree/v0.0.1) (2016-08-22)
**Closed issues:**

- NPM publish library [\#20](https://github.com/aitarget/aitarget-components/issues/20)
- Add extended support for npm scripts [\#19](https://github.com/aitarget/aitarget-components/issues/19)
- Add custom config/webpack.config.js [\#18](https://github.com/aitarget/aitarget-components/issues/18)
- Move from System to webpack [\#14](https://github.com/aitarget/aitarget-components/issues/14)
- Add 'Select All' and 'Unselect All' to multi checkboxes on hover [\#12](https://github.com/aitarget/aitarget-components/issues/12)
- Add pipe for types  [\#11](https://github.com/aitarget/aitarget-components/issues/11)
- Multiple select in browse mode [\#3](https://github.com/aitarget/aitarget-components/issues/3)

**Merged pull requests:**

- Chore/npm/publish [\#23](https://github.com/aitarget/aitarget-components/pull/23) ([yuriMalakhov](https://github.com/yuriMalakhov))
- chore\(webpack\): move from System to Webpack module loader, close \#14 [\#15](https://github.com/aitarget/aitarget-components/pull/15) ([yuriMalakhov](https://github.com/yuriMalakhov))
- Feature/detailed targeting [\#13](https://github.com/aitarget/aitarget-components/pull/13) ([yuriMalakhov](https://github.com/yuriMalakhov))
- Feature/detailed targeting [\#10](https://github.com/aitarget/aitarget-components/pull/10) ([yuriMalakhov](https://github.com/yuriMalakhov))
