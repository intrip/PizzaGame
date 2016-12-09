describe('Player', () => {
  let subject;

  beforeEach(() => {
    subject = new Player({firstName: 'jacopo', lastName: 'beschi'})
  });

  describe('#toString', () => {
    it('returns the user info as string', function() {
      expect(subject.toString()).toEqual('jacopo beschi');
    });
  });

  describe('#isValid',() => {
    it('validates_presence_of firstName', () => {
      subject = new Player({firstName: '', lastName: 'beschi'});
      expect(subject.isValid()).toBe(false);
      subject.firstName = 'jacopo';
      expect(subject.isValid()).toBe(true);
    });

    it('validates_presence_of lastName', () => {
      subject = new Player({firstName: 'jacopo', lastName: ''});
      expect(subject.isValid()).toBe(false);
      subject.lastName = 'beschi';
      expect(subject.isValid()).toBe(true);
    });

    it('sets error messages', () => {
      subject = new Player({firstName: '', lastName: 'beschi'});
      subject.isValid();

      expect(subject.errors).toEqual({'firstName': 'campo obbligatorio'});
    });
  });
});
