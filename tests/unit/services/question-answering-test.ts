import { module, test } from 'qunit';
import { setupTest } from 'frontend-decide-question-answering/tests/helpers';

module('Unit | Service | question', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:question');
    assert.ok(service);
  });
});
