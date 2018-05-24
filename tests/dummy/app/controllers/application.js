import Controller from '@ember/controller';
import { computed } from '@ember/object';
import DS from 'ember-data';
import { A } from '@ember/array';

export default Controller.extend({

  selectedProvince: null,
  selectedDivisions: A(),
  filteredPrefectures: computed('selectedProvince.id', function() {
    return DS.PromiseArray.create({
      promise: this.store.query('prefecture', { 'filter[province_id]': this.get('selectedProvince.id')})
    })
  }),

  selectedPrefecture: null,
  filteredCounties: computed('selectedPrefecture.id', function() {
    return DS.PromiseArray.create({
      promise: this.store.query('county', { 'filter[prefecture_id]': this.get('selectedPrefecture.id')})
    })
  }),

  selectedCounty: null,
  filteredTownships: computed('selectedCounty.id', function() {
    return DS.PromiseArray.create({
      promise: this.store.query('township', { 'filter[county_id]': this.get('selectedCounty.id')})
    })
  }),

  selectedTownship: null,
  filteredVillages: computed('selectedTownship.id', function() {
    return DS.PromiseArray.create({
      promise: this.store.query('village', { 'filter[township_id]': this.get('selectedTownship.id')})
    })
  }),

  prefectures: computed(function() {
    return this.store.query('prefecture', { 'filter[province_id]': 1 });
  })
});
