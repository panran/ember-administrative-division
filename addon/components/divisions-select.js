import Component from '@ember/component';
import {
  computed
} from '@ember/object';
import { inject } from '@ember/service';
import layout from '../templates/components/divisions-select';
import DS from 'ember-data';

export default Component.extend({
  store: inject(),
  layout: layout,
  displayProvinceSelect: computed('firstLevel', function () {
    return this.get('firstLevel') == 0
  }),
  displayPrefectureSelect: computed('firstLevel', 'lastLevel', function () {
    return this.get('firstLevel') <= 1 && this.get('lastLevel') >= 1;
  }),
  displayCountySelect: computed('firstLevel', 'lastLevel', function () {
    return this.get('firstLevel') <= 2 && this.get('lastLevel') >= 2;
  }),
  displayTownshipSelect: computed('firstLevel', 'lastLevel', function () {
    return this.get('firstLevel') <= 3 && this.get('lastLevel') >= 3;
  }),
  displayVillageSelect: computed('firstLevel', 'lastLevel', function () {
    return this.get('firstLevel') <= 4 && this.get('lastLevel') == 4;
  }),

  firstLevel: computed('first', function () {
    return this.get('levels').indexOf(this.get('first'));
  }),

  lastLevel: computed('last', function () {
    return this.get('levels').indexOf(this.get('last'));
  }),

  first: 'province',
  last: 'village',

  levels: computed(function () {
    return ['province', 'prefecture', 'county', 'township', 'village'];
  }),

  provinces: computed('first', function () {
    if (this.get('first') == 'province') {
      return this.get('options');
    }
  }),
  selectedProvince: null,

  prefectures: computed('first', 'selectedProvince.id', function () {
    if (this.get('first') == 'prefecture') {
      return this.get('options');
    }

    return DS.PromiseArray.create({
      promise: this.get('store').query('prefecture', {
        'filter[province_id]': this.get('selectedProvince.id')
      })
    });
  }),
  selectedPrefecture: null,

  counties: computed('first', 'selectedPrefecture.id', function () {
    if (this.get('first') == 'county') {
      return this.get('options');
    }

    return DS.PromiseArray.create({
      promise: this.get('store').query('county', {
        'filter[prefecture_id]': this.get('selectedPrefecture.id')
      })
    });
  }),
  selectedCounty: null,

  townships: computed('first', 'selectedCounty.id', function () {
    if (this.get('first') == 'township') {
      return this.get('options');
    }

    return DS.PromiseArray.create({
      promise: this.get('store').query('township', {
        'filter[county_id]': this.get('selectedCounty.id')
      })
    });
  }),
  selectedTownship: null,

  villages: computed('first', 'selectedTownship.id', function () {
    if (this.get('first') == 'village') {
      return this.get('options');
    }

    return DS.PromiseArray.create({
      promise: this.get('store').query('village', {
        'filter[township_id]': this.get('selectedTownship.id')
      })
    });
  })
});
