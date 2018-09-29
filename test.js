const config = require('./../backend/etc/public_contract_config.json')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.WebsocketProvider(config.contractWS));
const contractAbi = config.abi
const contractAddress = config.contractAddress
const lightwallet = require('eth-lightwallet')
const {
	promisify
} = require('util')
const keystore = lightwallet.keystore
const txutils = lightwallet.txutils
const signing = lightwallet.signing
var password = "321"
var seedPhrase = keystore.generateRandomSeed()
var hdPathString = "m/44'/60'/0'/0"



keystore.createVault({
	password: password,
	seedPhrase: seedPhrase,
	hdPathString: hdPathString
	// seedPhrase: seedPhrase, // Optionally provide a 12-word seed phrase
	// salt: fixture.salt,     // Optionally provide a salt.
	// A unique salt will be generated otherwise.
	// hdPathString: hdPath    // Optional custom HD Path String
}, function(err, ks) {
	if(err) Promise.reject(err)
	Promise.resolve(ks)
	// Some methods will require providing the `pwDerivedKey`,
	// Allowing you to only decrypt private keys on an as-needed basis.
	// You can generate that value with this convenient method:
	ks.keyFromPassword(password, function(err, pwDerivedKey) {
		if (err) throw err;

		// generate five new address/private key pairs
		// the corresponding private keys are also encrypted
		ks.generateNewAddress(pwDerivedKey, 1);
		var addr = ks.getAddresses();

		ks.passwordProvider = function(callback) {
			var pw = prompt("Please enter password", "Password");
			callback(null, pw);
		};
		// Now set ks as transaction_signer in the hooked web3 provider
		// and you can start using web3 using the keys/addresses in ks!
		var tx = txutils.functionTx(contractAbi, "exchange", [addr[0],10], {
			to: contractAddress,
			gasLimit: 3000000,
			gasPrice: 0,
		})
		var signedTx = '0x'+ signing.signTx(ks, pwDerivedKey, tx, addr[0], hdPathString)
		console.log(addr)
		// web3.eth.sendSignedTransaction(signedTx).then(receipt=>{
		// 	console.log(receipt)
		// 	if (receipt.status == '0x0') {
  //               Promise.reject(new Error("private pay transaction revert"))
  //           } else {
  //               console.log(110)
  //           }
		// })
		console.log(signedTx)
	});
})


createVault = promisify(keystore.createVault)

createVault({
	password: password,
	seedPhrase: seedPhrase,
	hdPathString: hdPathString
}).then(ks=>{

	keyFromPassword(password).then(pwDerivedKey=>{
		ks.generateNewAddress(pwDerivedKey, 1);
		var addr = ks.getAddresses();
		ks.passwordProvider = function(callback) {
			var pw = prompt("Please enter password", "Password");
			callback(null, pw);
		};
		var tx = txutils.functionTx(contractAbi, "exchange", [addr[0],10], {
			to: contractAddress,
			gasLimit: 3000000,
			gasPrice: 0,
		})
		var signedTx = signing.signTx(ks, pwDerivedKey, tx, addr[0], hdPathString)
		console.log(addr)
		console.log(signedTx)
	})

})