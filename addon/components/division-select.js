import Component from '@ember/component';
import layout from '../templates/components/division-select';
export default Component.extend({
    layout: layout,
    selected: true,
    allowClear: true,

    actions: {
        changeSelection(selected) {
            this.set('selected', selected);
        }
    }
})
