var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/cartmandb";
var products;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var res = db.collection("creditcards").find({}).toArray(function(err, result) {
    if (err) throw err;
  //  console.log(result);
	console.log(result.length);
	products = result;
	console.log(products.length);
    db.close();
module.exports = products;
	return result;
  });
  // Error in next line
	//console.log(res.length);
  return res;
});

module.exports.getData = function(callback){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		db.collection("creditcards").find({}).toArray(function(err, result) {
			if (err) throw err;
			console.log(result.length);
			db.close();
			return result;
		});
	});
}
  // Error in next line
	//console.log(products.length);
/*var products = [{
	_id: 1,
    imagePath: 'https://www.cashoverflow.in/wp-content/uploads/2017/05/Standard-Chartered-Platinum-Rewards-Card.png?x21615',
    title: 'Standard Chartered Platinum Rewards Card',
    description: 'https://apply.standardchartered.co.in/credit-card?selectedCardId=6&lp=no&source=email&se=ICL&cp=ICL_CC_IP_OCT&ag=CC_mailers_longform_prctext_16568',
    price: 10
  },{
	_id: 2,
    imagePath: 'https://www.cashoverflow.in/wp-content/uploads/2015/04/icici-plat-master.png',
    title: ' ICICI Instant Platinum Credit Card',
    description: 'https://www.m-icicibank.com/credit-card-desktop/index.html?se=pr-cc-sf-p2-c11-s11--cta1-380638&cp=icicibank-pr-cc-p2&utm_campaign=icicibank-pr-cc-p2&utm_content=pr-cc-sf-p2-c11-s11-cta1-p2&utm_medium=email&utm_source=email-p2&admitad_uid=295d1ea616775941d2dc247a5e406734',
    price: 20
  },{
	_id: 3,
    imagePath: 'https://www.cashoverflow.in/wp-content/uploads/2016/05/ALT-Standard-Chartered-manhattan-Credit-card.png',
    title: 'Standard Chartered Manhattan Credit Card',
    description: 'https://www.cashoverflow.in/recommends/scbmanhattan/',
    price: 30
  },{
	_id: 4,
    imagePath: 'https://www.cashoverflow.in/wp-content/uploads/2016/05/citi-cash-back-credit-card.png?x21615',
    title: 'Citibank Cashback Credit Card',
    description: 'https://www.online.citibank.co.in/portal/newgen/cards/May17/apply-now.htm?ecid=EM107DINCCAENCB&cardName=cashback&Campaign=External&site=ADMITAD&creative=MAILER&section=EXTMLROCT17ADMITADCBRETURNGIFTCPL_380638&agencyCode=IAPL&campaignCode=FAS&productCode=CARDS&admitad_uid=6b9092f44a841291ad447746a3291c80',
    price: 40
  },{
	_id: 5,
    imagePath: 'https://www.cashoverflow.in/wp-content/uploads/2016/05/ALT-HDFC-regalia-credit-card.png',
    title: "HDFC Regalia Credit Card",
    description: "https://www.hdfcbank.com",
    price: 50
  }];*/

