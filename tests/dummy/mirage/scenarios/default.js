export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);
    server.loadFixtures('provinces');
    server.loadFixtures('prefectures');
    server.loadFixtures('counties');
    server.loadFixtures('townships');
    server.loadFixtures('villages');
}
