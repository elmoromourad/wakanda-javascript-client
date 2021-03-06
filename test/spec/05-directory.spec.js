/* eslint-disable */

describe('Directory API', function () {

  var dir;
  before(function () {
    dir = wakClient.directory;
  });


  describe('login method', function () {

    it('should be defined', function () {
      expect(dir.login).to.be.a('function');
    });

    it('should return a promise', function () {
      var p = dir.login();
      expect(p).to.be.a('promise');

      //Silence the error reported by Karma because there is a unhandled promise rejection
      p.catch(function () {
      });
    });

    it('should resolve with correct credentials', function () {
      return dir.login('bar', 'bar', 3600 * 24 * 365).then(function (result) {
        expect(result).to.be.true;
      });
    });

    it('should fail with bad credentials', function () {
      return dir.login('bad', 'credentials').catch(function (e) {
        expect(e).to.be.defined;
      });
    });

    it('should fail without any credentials', function () {
      return dir.login().catch(function (e) {
        expect(e).to.be.defined;
      });
    });

    it('should fail if given duration is not a number', function () {
      expect(function () {
        dir.login('foo', 'foo', '1 year');
      }).to.throw(Error);
    });

    it('should fail if given duration is a negative number', function () {
      expect(function () {
        dir.login('foo', 'foo', -3600);
      }).to.throw(Error);
    });
  });

  describe('logout method', function () {
    it('should be defined', function () {
      expect(dir.logout).to.be.a('function');
    });

    it('should return a promise', function () {
      expect(dir.logout()).to.be.a('promise');
    });

    it('should resolve', function () {
      return dir.logout().then(function (result) {
        expect(result).to.be.true;
      });
    });
  });

  describe('currentUser method', function () {
    it('should be defined', function () {
      expect(dir.currentUser).to.be.a('function');
    });

    it('should return a promise', function () {
      var p = dir.currentUser();

      expect(p).to.be.a('promise');

      //Silence Karma error report
      p.catch(function () {
      });
    });

    it('should return current user info if logged in', function () {
      return dir.login('bar', 'bar', 3600 * 24 * 365).then(function () {
        return dir.currentUser().then(function (user) {
          expect(user.userName).to.be.equal('bar');
          expect(user.fullName).to.be.equal('bar');
          expect(user.ID).to.be.a('string');
          expect(user.ID.length).to.be.at.least(1);
        });
      });
    });

    it('should fail if user is not logged in', function () {
      return dir.logout().then(function () {
        return dir.currentUser().catch(function (e) {
          expect(e).to.be.defined;
        });
      });
    });
  });

  describe('currentUserBelongsTo method', function () {
    it('should be defined', function () {
      expect(dir.currentUserBelongsTo).to.be.a('function');
    });

    it('should return a promise', function () {
      expect(dir.currentUserBelongsTo('')).to.be.a('promise');
    });

    it('should fail if no parameter is given', function () {
      expect(function () {
        dir.currentUserBelongsTo();
      }).to.throw(Error);
    });

    it('shoud fail if given parameter is not a string', function () {
      expect(function () {
        dir.currentUserBelongsTo({userName: 'bar'});
      }).to.throw(Error);
    });

    it('should resolve true if current user belongs to given group', function () {
      return dir.login('bar', 'bar', 3600 * 24 * 365).then(function (user) {
        return dir.currentUserBelongsTo('Admin').then(function (result) {
          expect(result).to.be.true;
        });
      });
    });

    it('should resolve false if current user doesn\'t belong to given group', function () {
      return dir.login('bar', 'bar', 3600 * 24 * 365).then(function (user) {
        return dir.currentUserBelongsTo('QA').then(function (result) {
          expect(result).to.be.false;
        });
      });
    });

    it('should resolve false if user is not logged in', function () {
      return dir.logout().then(function (user) {
        return dir.currentUserBelongsTo('QA').then(function (result) {
          expect(result).to.be.false;
        });
      });
    });
  });
});
