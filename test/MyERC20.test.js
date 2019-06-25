const {
  BN,
  expectEvent,
  shouldFail,
  constants
} = require('openzeppelin-test-helpers');

const MyERC20Factory = artifacts.require('MyERC20');

contract('MyERC20', accounts => {
  const [owner, receiver] = accounts;

  let MyERC20;

  beforeEach(async () => {
    MyERC20 = await MyERC20Factory.new('MyERC20', 'ERC', new BN('18'), {
      from: owner
    });
  });

  describe('#transfer()', () => {
    const amount = new BN('100');

    it('should emit events', async () => {
      const { logs } = await MyERC20.transfer(receiver, amount);
      expectEvent.inLogs(logs, 'Transfer', {
        from: owner,
        value: amount
      });
    });

    it('should increase receiver balance', async () => {
      const { logs } = await MyERC20.transfer(receiver, amount);
      (await MyERC20.balanceOf(receiver)).should.be.bignumber.equal(amount);
    });
  });
});
