// requrie statements
//#region 
// const request = require('supertest'),
app = require('../app');
const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiAsPromised = require('chai-as-promised')
const routingPoint = '/api/v1.0/'
chai.should();
chai.use(chaiAsPromised)
chai.use(chaiHttp);
const expect = chai.expect;
//#endregion
const ACCESS_KEY = process.env.CLIENT_KEY;
const id = '5f5b373bbcddcebee05adfbb'

//--------variables
const headers = {
  'Content-Type':'application/json',
  'Client-key':ACCESS_KEY,
  'languageId':'1'
}



describe('Integration tests', async () => {

  it("constact list", (done) => {
     chai.request(app)
    .get(routingPoint + '/contacts')
       .set(headers)
    .end((error, res) => {
      if (error) {return done(error)};
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.a('object')
      expect(res.body.data.contacts).to.be.a('array')
      done(); 
  })
  // done();  

  })


  it("contact list with query", (done) => {
     chai.request(app)
    .get(routingPoint + '/contacts')
       .set(headers)
       .query({q: 'Tony'})
       .end((error, res) => {
        if (error) {return done(error)};
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.a('object')
        done(); 
    })
  })


  it("create person", (done) => {
     chai.request(app)
    .post(routingPoint + '/people')
       .set(headers)
       .send({
        "name": "Falcon",
        "age": 28,
        "height": 175
    })
    .end((error, res) => {

      expect(res).to.have.status(200);
      expect(res.body.data).to.be.a('object')
      expect(res.body.data).to.include.keys(
          "name",
      "age",
      "height",
      "created_at",
      "updated_at",
      "person_id"
      );
    done();  
  })
  })


  it("create contact for person",  (done) => {
     chai.request(app)
    .post(routingPoint + `/people/${id}/contacts`)
       .set(headers)
       .send({
        "email": "ultron@avengers.com",
        "number": "0198345212"
        })
    .end((error, res) => {

      expect(res).to.have.status(200);
      expect(res.body.data).to.be.a('object')
      expect(res.body.data).to.include.keys(
        "email",
        "number",
        "person_id",
        "created_at",
        "updated_at",
        "contact_id"
      );
    done();  
  })
  })




  
})

