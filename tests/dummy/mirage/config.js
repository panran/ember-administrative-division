export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/

  */
    this.get('/provinces');
    this.get('/provinces/:id');


    this.get('/prefectures', (schema, request) => {
      return schema.prefectures.where({ province_id: request.queryParams['filter[province_id]']});
    });

    this.get('/counties', (schema, request) => {
      return schema.counties.where({ prefecture_id: request.queryParams['filter[prefecture_id]']});
    });
    this.get('/counties/:id');

    this.get('/townships', (schema, request) => {
      return schema.townships.where({ county_id: request.queryParams['filter[county_id]']})
    });
    this.get('/townships/:id');

    this.get('/villages', (schema, request) => {
      return schema.villages.where({ township_id: request.queryParams['filter[township_id]']})
    });
    this.get('/villages/:id');
}
