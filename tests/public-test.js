process.env.NODE_ENV = 'test';

const public = require('../routes/public');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

/*

describe('/POST signup', () => {
    it('user should create account', (done) => {
        let a = {
            Email: "test1@gmail.com",
            Password: "trial",
            FirstName: "lucia",
            LastName: "lucia",

        }
        chai.request('localhost:3000/public')
            .post('/signup')
            .send(a)
            .end((err, res) => {
                console.log(res);
                res.should.have.status(200);
                res.body.should.have.property('text').eql('all was done');
                done();
            });
    });
});

*/



describe('/POST login', () => {
    it('user should login', (done) => {
        let user = {
            email: "44@gmail.com",
            password: "123",
        }
        chai.request('localhost:3000/public')
            .post('/login')
            .send(user)
            .end((err, res) => {
                console.log(res.body);
                token = res.body.token
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Enjoy your token!');
                done();


                describe('/GET friends', () => {
/*
                    var access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzczLCJpYXQiOjE1MTI2ODU4MTAsImV4cCI6MTUxMjY4NzI1MH0.rcO1dobOW4zp_JMs_IgsQZNYIPaPn-VorIMV-m1NnFw';
*/
                    it('it should GET all the friends', (done) => {
                        chai.request("localhost:3000")
                            .get('/friends')
                            .set('Authorization', 'Bearer ' + res.body.token)
                            .end((err, res) => {
                                res.should.have.status(200);
                                done();
                            });
                    });
                });



                describe('/POST createPost', () => {
                    it('user creates a post', (done) => {
                        let user = {
                            PostContent: "Hello",

                        }
                        chai.request('localhost:3000')
                            .post('/posts/createpost')
                            .set('Authorization', 'Bearer ' + res.body.token)
                            .send(user)
                            .end((err, res) => {
                                res.body.should.have.property('text').eql('all was done');
                                done();

                            });
                    });

                });


                describe('/POST findGroup', () => {
                    it('user is looking for a group', (done) => {
                        let user = {
                            title: "KEA STUDENTS",

                        }
                        chai.request('localhost:3000')
                            .post('/groups/findGroup')
                            .set('Authorization', 'Bearer ' + res.body.token)
                            .send(user)
                            .end((err, res) => {
                                res.should.have.status(200);
                                done();

                            });
                    });

                });

            });
    });
});

