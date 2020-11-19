const truffleAssert = require('truffle-assertions');
const MyERC20 = artifacts.require('MyERC20');
const SafeMath = artifacts.require('SafeMath');
const ProxySafeMath = artifacts.require('ProxySafeMath');

contract('contractProxySafeMath', accounts => {
  let contractProxySafeMath = null;
  let trace = false;
  let contractSafeMath = null;
  let contractMyERC20 = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({ from: accounts[0] });
    if (trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    MyERC20.link('SafeMath', contractSafeMath.address);
    contractMyERC20 = await MyERC20.new(
      'UsesExample',
      '\x19Ethereum Signed Message:\n32',
      254,
      { from: accounts[3] }
    );
    if (trace)
      console.log(
        'SUCESSO: MyERC20.new("UsesExample","\x19Ethereum Signed Message:\n32",254,{from:accounts[3]}'
      );
    ProxySafeMath.link('SafeMath', contractSafeMath.address);
    contractProxySafeMath = await ProxySafeMath.new({ from: accounts[0] });
  });

  it('Should fail testsub(uint256,uint256) when NOT comply with: b <= a', async () => {
    let result = await truffleAssert.fails(
      contractProxySafeMath.testsub(3, 4, { from: accounts[0] }),
      'revert'
    );
  });
  it('Should fail testdiv(uint256,uint256) when NOT comply with: b > 0', async () => {
    let result = await truffleAssert.fails(
      contractProxySafeMath.testdiv(2014223714, 0, { from: accounts[0] }),
      'revert'
    );
  });
  it('Should fail testmod(uint256,uint256) when NOT comply with: b != 0', async () => {
    let result = await truffleAssert.fails(
      contractProxySafeMath.testmod(255, 0, { from: accounts[0] }),
      'revert'
    );
  });
});