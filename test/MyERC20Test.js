const truffleAssert = require('truffle-assertions');
const MyERC20 = artifacts.require('MyERC20');
const SafeMath = artifacts.require('SafeMath');
const ProxySafeMath = artifacts.require('ProxySafeMath');

contract('MyERC20', accounts => {
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
  });

  it('Should fail transfer(address,uint256) when NOT comply with: recipient != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractMyERC20.transfer(
        '0x0000000000000000000000000000000000000000',
        4,
        { from: accounts[1] }
      ),
      'revert'
    );
  });
  it('Should fail approve(address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractMyERC20.approve(
        '0x0000000000000000000000000000000000000000',
        1336,
        { from: accounts[4] }
      ),
      'revert'
    );
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractMyERC20.transferFrom(
        '0x0000000000000000000000000000000000000000',
        accounts[0],
        2014223715,
        { from: accounts[1] }
      ),
      'revert'
    );
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: recipient != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractMyERC20.transferFrom(
        accounts[5],
        '0x0000000000000000000000000000000000000000',
        2014223715,
        { from: accounts[1] }
      ),
      'revert'
    );
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractMyERC20.transferFrom(
        '0x0000000000000000000000000000000000000000',
        accounts[0],
        2014223715,
        { from: accounts[1] }
      ),
      'revert'
    );
  });
  it('Should fail increaseAllowance(address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractMyERC20.increaseAllowance(
        '0x0000000000000000000000000000000000000000',
        4,
        { from: accounts[8] }
      ),
      'revert'
    );
  });
  it('Should fail decreaseAllowance(address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(
      contractMyERC20.decreaseAllowance(
        '0x0000000000000000000000000000000000000000',
        2014223715,
        { from: accounts[4] }
      ),
      'revert'
    );
  });
});
