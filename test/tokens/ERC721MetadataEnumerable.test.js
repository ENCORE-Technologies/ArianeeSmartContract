const ERC721MetadataEnumerable = artifacts.require('ERC721MetadataEnumerableMock');
const util = require('ethjs-util');
const assertRevert = require('../helpers/assertRevert');

contract('ERC721MetadataEnumerableMock', (accounts) => {
  let nftoken;
  let id1 = 1;
  let id2 = 2;
  let id3 = 3;
  let id4 = 40;

  beforeEach(async function () {
    nftoken = await ERC721MetadataEnumerable.new('Foo', 'F');
  });

  it('returns the correct issuer name', async () => {
    const name = await nftoken.name();
    assert.equal(name, 'Foo');
  });

  it('returns the correct issuer symbol', async () => {
    const symbol = await nftoken.symbol();
    assert.equal(symbol, 'F');
  });

  it('returns the correct NFToken id 2 url', async () => {
    await nftoken.mint(accounts[1], id2, 'url2');
    const tokenURI = await nftoken.tokenURI(id2);
    assert.equal(tokenURI, 'url2');
  });

  it('throws when trying to get uri of none existant NFToken id', async () => {
    await assertRevert(nftoken.tokenURI(id4));
  });

  it('returns the correct total supply', async () => {
    var totalSupply = await nftoken.totalSupply();
    assert.equal(totalSupply, 0);

    await nftoken.mint(accounts[1], id1, 'url1');
    await nftoken.mint(accounts[1], id2, 'url2');

    var totalSupply = await nftoken.totalSupply();
    assert.equal(totalSupply, 2);
  });

  it('returns the correct total supply', async () => {
    var totalSupply = await nftoken.totalSupply();
    assert.equal(totalSupply, 0);

    await nftoken.mint(accounts[1], id1, 'url1');
    await nftoken.mint(accounts[1], id2, 'url2');

    var totalSupply = await nftoken.totalSupply();
    assert.equal(totalSupply, 2);
  });

  it('returns the correct token by index', async () => {
    await nftoken.mint(accounts[1], id1, 'url1');
    await nftoken.mint(accounts[1], id2, 'url2');
    await nftoken.mint(accounts[2], id3, 'url3');

    var tokenId = await nftoken.tokenByIndex(1);
    assert.equal(tokenId, id2);
  });

  it('throws when trying to get token by unexistant index', async () => {
    await nftoken.mint(accounts[1], id1, 'url1');
    await assertRevert(nftoken.tokenByIndex(1));
  });

  it('returns the correct token of owner by index', async () => {
    await nftoken.mint(accounts[1], id1, 'url1');
    await nftoken.mint(accounts[1], id2, 'url2');
    await nftoken.mint(accounts[2], id3, 'url3');

    var tokenId = await nftoken.tokenOfOwnerByIndex(accounts[1], 1);
    assert.equal(tokenId, id2);
  });

  it('throws when trying to get token of owner by unexistant index', async () => {
    await nftoken.mint(accounts[1], id1, 'url1');
    await nftoken.mint(accounts[2], id3, 'url3');

    await assertRevert(nftoken.tokenOfOwnerByIndex(accounts[1], 1));
  });

});