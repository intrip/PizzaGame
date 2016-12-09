describe('Player', function () {
  let subject;

  beforeEach(function () {
    subject = new Player({firstName: 'jacopo', lastName: 'beschi'})
  });

  describe('#toString', function () {
    it('returns the user info as string', function() {
      expect(subject.toString()).toEqual('jacopo beschi');
    });
  });

  describe('#isValid',function () {
    it('validates_presence_of firstName', function () {
      subject = new Player({firstName: '', lastName: 'beschi'});
      expect(subject.isValid()).toBe(false);
      subject.firstName = 'jacopo';
      expect(subject.isValid()).toBe(true);
    });

    it('validates_presence_of lastName', function () {
      subject = new Player({firstName: 'jacopo', lastName: ''});
      expect(subject.isValid()).toBe(false);
      subject.lastName = 'beschi';
      expect(subject.isValid()).toBe(true);
    });

    it('sets error messages', function () {
      subject = new Player({firstName: '', lastName: 'beschi'});
      subject.isValid();

      expect(subject.errors).toEqual({'firstName': 'campo obbligatorio'});
    });
  });
});
