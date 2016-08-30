import {Component, OnInit} from '@angular/core';
import {TargetingSpecService, TargetingSpec} from '../../targeting/targeting-spec.service';
import {DetailedTargetingSelectedService} from './detailed-targeting-selected.service';
import {DetailedTargetingItem} from '../detailed-targeting-item';
import {DetailedTargetingModeService} from '../detailed-targeting-mode/detailed-targeting-mode.service';
import {DetailedTargetingDropdownBrowseService} from '../detailed-targeting-dropdown-browse/detailed-targeting-dropdown-browse.service';

@Component({
    selector: 'detailed-targeting-selected',
    templateUrl: 'detailed-targeting-selected.component.html',
    styleUrls: ['detailed-targeting-selected.component.css']
})
export class DetailedTargetingSelectedComponent implements OnInit {

    private spec: TargetingSpec;
    private items: DetailedTargetingItem[];

    private structuredSelectedItems;

    constructor(private TargetingSpecService: TargetingSpecService,
                private DetailedTargetingDropdownBrowseService: DetailedTargetingDropdownBrowseService,
                private DetailedTargetingModeService: DetailedTargetingModeService,
                private DetailedTargetingSelectedService: DetailedTargetingSelectedService) {
    }

    /**
     * Open clicked crumb in browse dropdown and scroll to it
     * @param key
     * @param index
     */
    public showCrumb(key: string, index: number) {
        let path = key.split(' > ');
        let defaultOpenItems = this.DetailedTargetingDropdownBrowseService.defaultOpenItems;
        let openItems = (<any>Object).assign({}, defaultOpenItems);

        path.forEach((crumb: string, pos: number) => {
            if (pos <= index) {
                let openItemKey = path.slice(0, pos + 1)
                    .join(' > ');

                openItems._scrollTo = openItemKey;
                openItems[openItemKey] = true;
            }
        });

        this.DetailedTargetingModeService.set('browse');
        this.DetailedTargetingDropdownBrowseService.updateOpenItems(openItems);
    }

    public removeGroup(key) {
        let selectedItems = this.DetailedTargetingSelectedService.get();
        let idsToRemove = this.structuredSelectedItems.map[key].map(item => item.id);

        selectedItems = selectedItems.filter(item => idsToRemove.indexOf(item.id) === -1);

        this.DetailedTargetingSelectedService.updateSelected(selectedItems);
    }

    public removeItem(itemToRemove: DetailedTargetingItem) {
        let selectedItems = this.DetailedTargetingSelectedService.get();

        selectedItems = selectedItems.filter(item => item.id !== itemToRemove.id);

        this.DetailedTargetingSelectedService.updateSelected(selectedItems);
    }

    ngOnInit() {
        this.TargetingSpecService.spec.subscribe((spec: TargetingSpec) => {
            this.spec = spec;
            console.log('Targeting Spec: ', this.spec);
        });

        this.DetailedTargetingSelectedService.items.subscribe((items: DetailedTargetingItem[]) => {
            this.items = items;
            this.TargetingSpecService.updateWithDetailedTargeting(this.items);
        });

        this.DetailedTargetingSelectedService.items
            .map(this.DetailedTargetingSelectedService.structureSelectedItems)
            .subscribe((structuredSelectedItems) => {
                this.structuredSelectedItems = structuredSelectedItems;
            });
    }

}
