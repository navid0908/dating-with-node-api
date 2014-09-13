var async = require('async');

exports.up = function (db, callback) {
	async.series([
	    db.createTable.bind(db, 'country', {
		    columns: {
		      id: { type: 'int', primaryKey: true, autoIncrement: true },
		      code: { type: 'string', length: 2},
		      name: { type: 'string', length: 100, unique:true}
		    },
		    ifNotExists: true
	  	}),
	  	db.insert.bind(db, 'country', ['code','name'], ['US','United States']),
		db.insert.bind(db, 'country', ['code','name'], ['GB','United Kingdom']),
		db.insert.bind(db, 'country', ['code','name'], ['CA','Canada']),
		db.insert.bind(db, 'country', ['code','name'], ['AT','Austria']),
		db.insert.bind(db, 'country', ['code','name'], ['SG','Singapore']),
	  	db.insert.bind(db, 'country', ['code','name'], ['AF','Afghanistan']),
		db.insert.bind(db, 'country', ['code','name'], ['AL','Albania']),
		db.insert.bind(db, 'country', ['code','name'], ['DZ','Algeria']),
		db.insert.bind(db, 'country', ['code','name'], ['AS','American Samoa']),
		db.insert.bind(db, 'country', ['code','name'], ['AD','Andorra']),
		db.insert.bind(db, 'country', ['code','name'], ['AO','Angola']),
		db.insert.bind(db, 'country', ['code','name'], ['AI','Anguilla']),
		db.insert.bind(db, 'country', ['code','name'], ['AQ','Antarctica']),
		db.insert.bind(db, 'country', ['code','name'], ['AG','Antigua and Barbuda']),
		db.insert.bind(db, 'country', ['code','name'], ['AR','Argentina']),
		db.insert.bind(db, 'country', ['code','name'], ['AM','Armenia']),
		db.insert.bind(db, 'country', ['code','name'], ['AW','Aruba']),
		db.insert.bind(db, 'country', ['code','name'], ['AU','Australia']),		
		db.insert.bind(db, 'country', ['code','name'], ['AZ','Azerbaijan']),
		db.insert.bind(db, 'country', ['code','name'], ['BS','Bahamas']),
		db.insert.bind(db, 'country', ['code','name'], ['BH','Bahrain']),
		db.insert.bind(db, 'country', ['code','name'], ['BD','Bangladesh']),
		db.insert.bind(db, 'country', ['code','name'], ['BB','Barbados']),
		db.insert.bind(db, 'country', ['code','name'], ['BY','Belarus']),
		db.insert.bind(db, 'country', ['code','name'], ['BE','Belgium']),
		db.insert.bind(db, 'country', ['code','name'], ['BZ','Belize']),
		db.insert.bind(db, 'country', ['code','name'], ['BJ','Benin']),
		db.insert.bind(db, 'country', ['code','name'], ['BM','Bermuda']),
		db.insert.bind(db, 'country', ['code','name'], ['BT','Bhutan']),
		db.insert.bind(db, 'country', ['code','name'], ['BO','Bolivia']),
		db.insert.bind(db, 'country', ['code','name'], ['BA','Bosnia and Herzegovina']),
		db.insert.bind(db, 'country', ['code','name'], ['BW','Botswana']),
		db.insert.bind(db, 'country', ['code','name'], ['BR','Brazil']),
		db.insert.bind(db, 'country', ['code','name'], ['IO','British Indian Ocean Territory']),
		db.insert.bind(db, 'country', ['code','name'], ['VG','British Virgin Islands']),
		db.insert.bind(db, 'country', ['code','name'], ['BN','Brunei']),
		db.insert.bind(db, 'country', ['code','name'], ['BG','Bulgaria']),
		db.insert.bind(db, 'country', ['code','name'], ['BF','Burkina Faso']),
		db.insert.bind(db, 'country', ['code','name'], ['MM','Burma (Myanmar)']),
		db.insert.bind(db, 'country', ['code','name'], ['BI','Burundi']),
		db.insert.bind(db, 'country', ['code','name'], ['KH','Cambodia']),
		db.insert.bind(db, 'country', ['code','name'], ['CM','Cameroon']),		
		db.insert.bind(db, 'country', ['code','name'], ['CV','Cape Verde']),
		db.insert.bind(db, 'country', ['code','name'], ['KY','Cayman Islands']),
		db.insert.bind(db, 'country', ['code','name'], ['CF','Central African Republic']),
		db.insert.bind(db, 'country', ['code','name'], ['TD','Chad']),
		db.insert.bind(db, 'country', ['code','name'], ['CL','Chile']),
		db.insert.bind(db, 'country', ['code','name'], ['CN','China']),
		db.insert.bind(db, 'country', ['code','name'], ['CX','Christmas Island']),
		db.insert.bind(db, 'country', ['code','name'], ['CC','Cocos (Keeling) Islands']),
		db.insert.bind(db, 'country', ['code','name'], ['CO','Colombia']),
		db.insert.bind(db, 'country', ['code','name'], ['KM','Comoros']),
		db.insert.bind(db, 'country', ['code','name'], ['CK','Cook Islands']),
		db.insert.bind(db, 'country', ['code','name'], ['CR','Costa Rica']),
		db.insert.bind(db, 'country', ['code','name'], ['HR','Croatia']),
		db.insert.bind(db, 'country', ['code','name'], ['CU','Cuba']),
		db.insert.bind(db, 'country', ['code','name'], ['CY','Cyprus']),
		db.insert.bind(db, 'country', ['code','name'], ['CZ','Czech Republic']),
		db.insert.bind(db, 'country', ['code','name'], ['CD','Democratic Republic of the Congo']),
		db.insert.bind(db, 'country', ['code','name'], ['DK','Denmark']),
		db.insert.bind(db, 'country', ['code','name'], ['DJ','Djibouti']),
		db.insert.bind(db, 'country', ['code','name'], ['DM','Dominica']),
		db.insert.bind(db, 'country', ['code','name'], ['DO','Dominican Republic']),
		db.insert.bind(db, 'country', ['code','name'], ['EC','Ecuador']),
		db.insert.bind(db, 'country', ['code','name'], ['EG','Egypt']),
		db.insert.bind(db, 'country', ['code','name'], ['SV','El Salvador']),
		db.insert.bind(db, 'country', ['code','name'], ['GQ','Equatorial Guinea']),
		db.insert.bind(db, 'country', ['code','name'], ['ER','Eritrea']),
		db.insert.bind(db, 'country', ['code','name'], ['EE','Estonia']),
		db.insert.bind(db, 'country', ['code','name'], ['ET','Ethiopia']),
		db.insert.bind(db, 'country', ['code','name'], ['FK','Falkland Islands']),
		db.insert.bind(db, 'country', ['code','name'], ['FO','Faroe Islands']),
		db.insert.bind(db, 'country', ['code','name'], ['FJ','Fiji']),
		db.insert.bind(db, 'country', ['code','name'], ['FI','Finland']),
		db.insert.bind(db, 'country', ['code','name'], ['FR','France']),
		db.insert.bind(db, 'country', ['code','name'], ['PF','French Polynesia']),
		db.insert.bind(db, 'country', ['code','name'], ['GA','Gabon']),
		db.insert.bind(db, 'country', ['code','name'], ['GM','Gambia']),
		db.insert.bind(db, 'country', ['code','name'], ['/','Gaza Strip']),
		db.insert.bind(db, 'country', ['code','name'], ['GE','Georgia']),
		db.insert.bind(db, 'country', ['code','name'], ['DE','Germany']),
		db.insert.bind(db, 'country', ['code','name'], ['GH','Ghana']),
		db.insert.bind(db, 'country', ['code','name'], ['GI','Gibraltar']),
		db.insert.bind(db, 'country', ['code','name'], ['GR','Greece']),
		db.insert.bind(db, 'country', ['code','name'], ['GL','Greenland']),
		db.insert.bind(db, 'country', ['code','name'], ['GD','Grenada']),
		db.insert.bind(db, 'country', ['code','name'], ['GU','Guam']),
		db.insert.bind(db, 'country', ['code','name'], ['GT','Guatemala']),
		db.insert.bind(db, 'country', ['code','name'], ['GN','Guinea']),
		db.insert.bind(db, 'country', ['code','name'], ['GW','Guinea-Bissau']),
		db.insert.bind(db, 'country', ['code','name'], ['GY','Guyana']),
		db.insert.bind(db, 'country', ['code','name'], ['HT','Haiti']),
		db.insert.bind(db, 'country', ['code','name'], ['VA','Holy See (Vatican City)']),
		db.insert.bind(db, 'country', ['code','name'], ['HN','Honduras']),
		db.insert.bind(db, 'country', ['code','name'], ['HK','Hong Kong']),
		db.insert.bind(db, 'country', ['code','name'], ['HU','Hungary']),
		db.insert.bind(db, 'country', ['code','name'], ['IS','Iceland']),
		db.insert.bind(db, 'country', ['code','name'], ['IN','India']),
		db.insert.bind(db, 'country', ['code','name'], ['ID','Indonesia']),
		db.insert.bind(db, 'country', ['code','name'], ['IR','Iran']),
		db.insert.bind(db, 'country', ['code','name'], ['IQ','Iraq']),
		db.insert.bind(db, 'country', ['code','name'], ['IE','Ireland']),
		db.insert.bind(db, 'country', ['code','name'], ['IM','Isle of Man']),
		db.insert.bind(db, 'country', ['code','name'], ['IL','Israel']),
		db.insert.bind(db, 'country', ['code','name'], ['IT','Italy']),
		db.insert.bind(db, 'country', ['code','name'], ['CI','Ivory Coast']),
		db.insert.bind(db, 'country', ['code','name'], ['JM','Jamaica']),
		db.insert.bind(db, 'country', ['code','name'], ['JP','Japan']),
		db.insert.bind(db, 'country', ['code','name'], ['JE','Jersey']),
		db.insert.bind(db, 'country', ['code','name'], ['JO','Jordan']),
		db.insert.bind(db, 'country', ['code','name'], ['KZ','Kazakhstan']),
		db.insert.bind(db, 'country', ['code','name'], ['KE','Kenya']),
		db.insert.bind(db, 'country', ['code','name'], ['KI','Kiribati']),
		db.insert.bind(db, 'country', ['code','name'], ['','Kosovo']),
		db.insert.bind(db, 'country', ['code','name'], ['KW','Kuwait']),
		db.insert.bind(db, 'country', ['code','name'], ['KG','Kyrgyzstan']),
		db.insert.bind(db, 'country', ['code','name'], ['LA','Laos']),
		db.insert.bind(db, 'country', ['code','name'], ['LV','Latvia']),
		db.insert.bind(db, 'country', ['code','name'], ['LB','Lebanon']),
		db.insert.bind(db, 'country', ['code','name'], ['LS','Lesotho']),
		db.insert.bind(db, 'country', ['code','name'], ['LR','Liberia']),
		db.insert.bind(db, 'country', ['code','name'], ['LY','Libya']),
		db.insert.bind(db, 'country', ['code','name'], ['LI','Liechtenstein']),
		db.insert.bind(db, 'country', ['code','name'], ['LT','Lithuania']),
		db.insert.bind(db, 'country', ['code','name'], ['LU','Luxembourg']),
		db.insert.bind(db, 'country', ['code','name'], ['MO','Macau']),
		db.insert.bind(db, 'country', ['code','name'], ['MK','Macedonia']),
		db.insert.bind(db, 'country', ['code','name'], ['MG','Madagascar']),
		db.insert.bind(db, 'country', ['code','name'], ['MW','Malawi']),
		db.insert.bind(db, 'country', ['code','name'], ['MY','Malaysia']),
		db.insert.bind(db, 'country', ['code','name'], ['MV','Maldives']),
		db.insert.bind(db, 'country', ['code','name'], ['ML','Mali']),
		db.insert.bind(db, 'country', ['code','name'], ['MT','Malta']),
		db.insert.bind(db, 'country', ['code','name'], ['MH','Marshall Islands']),
		db.insert.bind(db, 'country', ['code','name'], ['MR','Mauritania']),
		db.insert.bind(db, 'country', ['code','name'], ['MU','Mauritius']),
		db.insert.bind(db, 'country', ['code','name'], ['YT','Mayotte']),
		db.insert.bind(db, 'country', ['code','name'], ['MX','Mexico']),
		db.insert.bind(db, 'country', ['code','name'], ['FM','Micronesia']),
		db.insert.bind(db, 'country', ['code','name'], ['MD','Moldova']),
		db.insert.bind(db, 'country', ['code','name'], ['MC','Monaco']),
		db.insert.bind(db, 'country', ['code','name'], ['MN','Mongolia']),
		db.insert.bind(db, 'country', ['code','name'], ['ME','Montenegro']),
		db.insert.bind(db, 'country', ['code','name'], ['MS','Montserrat']),
		db.insert.bind(db, 'country', ['code','name'], ['MA','Morocco']),
		db.insert.bind(db, 'country', ['code','name'], ['MZ','Mozambique']),
		db.insert.bind(db, 'country', ['code','name'], ['NA','Namibia']),
		db.insert.bind(db, 'country', ['code','name'], ['NR','Nauru']),
		db.insert.bind(db, 'country', ['code','name'], ['NP','Nepal']),
		db.insert.bind(db, 'country', ['code','name'], ['NL','Netherlands']),
		db.insert.bind(db, 'country', ['code','name'], ['AN','Netherlands Antilles']),
		db.insert.bind(db, 'country', ['code','name'], ['NC','New Caledonia']),
		db.insert.bind(db, 'country', ['code','name'], ['NZ','New Zealand']),
		db.insert.bind(db, 'country', ['code','name'], ['NI','Nicaragua']),
		db.insert.bind(db, 'country', ['code','name'], ['NE','Niger']),
		db.insert.bind(db, 'country', ['code','name'], ['NG','Nigeria']),
		db.insert.bind(db, 'country', ['code','name'], ['NU','Niue']),
		db.insert.bind(db, 'country', ['code','name'], ['NF','Norfolk Island']),
		db.insert.bind(db, 'country', ['code','name'], ['KP','North Korea']),
		db.insert.bind(db, 'country', ['code','name'], ['MP','Northern Mariana Islands']),
		db.insert.bind(db, 'country', ['code','name'], ['NO','Norway']),
		db.insert.bind(db, 'country', ['code','name'], ['OM','Oman']),
		db.insert.bind(db, 'country', ['code','name'], ['PK','Pakistan']),
		db.insert.bind(db, 'country', ['code','name'], ['PW','Palau']),
		db.insert.bind(db, 'country', ['code','name'], ['PA','Panama']),
		db.insert.bind(db, 'country', ['code','name'], ['PG','Papua New Guinea']),
		db.insert.bind(db, 'country', ['code','name'], ['PY','Paraguay']),
		db.insert.bind(db, 'country', ['code','name'], ['PE','Peru']),
		db.insert.bind(db, 'country', ['code','name'], ['PH','Philippines']),
		db.insert.bind(db, 'country', ['code','name'], ['PN','Pitcairn Islands']),
		db.insert.bind(db, 'country', ['code','name'], ['PL','Poland']),
		db.insert.bind(db, 'country', ['code','name'], ['PT','Portugal']),
		db.insert.bind(db, 'country', ['code','name'], ['PR','Puerto Rico']),
		db.insert.bind(db, 'country', ['code','name'], ['QA','Qatar']),
		db.insert.bind(db, 'country', ['code','name'], ['CG','Republic of the Congo']),
		db.insert.bind(db, 'country', ['code','name'], ['RO','Romania']),
		db.insert.bind(db, 'country', ['code','name'], ['RU','Russia']),
		db.insert.bind(db, 'country', ['code','name'], ['RW','Rwanda']),
		db.insert.bind(db, 'country', ['code','name'], ['BL','Saint Barthelemy']),
		db.insert.bind(db, 'country', ['code','name'], ['SH','Saint Helena']),
		db.insert.bind(db, 'country', ['code','name'], ['KN','Saint Kitts and Nevis']),
		db.insert.bind(db, 'country', ['code','name'], ['LC','Saint Lucia']),
		db.insert.bind(db, 'country', ['code','name'], ['MF','Saint Martin']),
		db.insert.bind(db, 'country', ['code','name'], ['PM','Saint Pierre and Miquelon']),
		db.insert.bind(db, 'country', ['code','name'], ['VC','Saint Vincent and the Grenadines']),
		db.insert.bind(db, 'country', ['code','name'], ['WS','Samoa']),
		db.insert.bind(db, 'country', ['code','name'], ['SM','San Marino']),
		db.insert.bind(db, 'country', ['code','name'], ['ST','Sao Tome and Principe']),
		db.insert.bind(db, 'country', ['code','name'], ['SA','Saudi Arabia']),
		db.insert.bind(db, 'country', ['code','name'], ['SN','Senegal']),
		db.insert.bind(db, 'country', ['code','name'], ['RS','Serbia']),
		db.insert.bind(db, 'country', ['code','name'], ['SC','Seychelles']),
		db.insert.bind(db, 'country', ['code','name'], ['SL','Sierra Leone']),		
		db.insert.bind(db, 'country', ['code','name'], ['SK','Slovakia']),
		db.insert.bind(db, 'country', ['code','name'], ['SI','Slovenia']),
		db.insert.bind(db, 'country', ['code','name'], ['SB','Solomon Islands']),
		db.insert.bind(db, 'country', ['code','name'], ['SO','Somalia']),
		db.insert.bind(db, 'country', ['code','name'], ['ZA','South Africa']),
		db.insert.bind(db, 'country', ['code','name'], ['KR','South Korea']),
		db.insert.bind(db, 'country', ['code','name'], ['ES','Spain']),
		db.insert.bind(db, 'country', ['code','name'], ['LK','Sri Lanka']),
		db.insert.bind(db, 'country', ['code','name'], ['SD','Sudan']),
		db.insert.bind(db, 'country', ['code','name'], ['SR','Suriname']),
		db.insert.bind(db, 'country', ['code','name'], ['SJ','Svalbard']),
		db.insert.bind(db, 'country', ['code','name'], ['SZ','Swaziland']),
		db.insert.bind(db, 'country', ['code','name'], ['SE','Sweden']),
		db.insert.bind(db, 'country', ['code','name'], ['CH','Switzerland']),
		db.insert.bind(db, 'country', ['code','name'], ['SY','Syria']),
		db.insert.bind(db, 'country', ['code','name'], ['TW','Taiwan']),
		db.insert.bind(db, 'country', ['code','name'], ['TJ','Tajikistan']),
		db.insert.bind(db, 'country', ['code','name'], ['TZ','Tanzania']),
		db.insert.bind(db, 'country', ['code','name'], ['TH','Thailand']),
		db.insert.bind(db, 'country', ['code','name'], ['TL','Timor-Leste']),
		db.insert.bind(db, 'country', ['code','name'], ['TG','Togo']),
		db.insert.bind(db, 'country', ['code','name'], ['TK','Tokelau']),
		db.insert.bind(db, 'country', ['code','name'], ['TO','Tonga']),
		db.insert.bind(db, 'country', ['code','name'], ['TT','Trinidad and Tobago']),
		db.insert.bind(db, 'country', ['code','name'], ['TN','Tunisia']),
		db.insert.bind(db, 'country', ['code','name'], ['TR','Turkey']),
		db.insert.bind(db, 'country', ['code','name'], ['TM','Turkmenistan']),
		db.insert.bind(db, 'country', ['code','name'], ['TC','Turks and Caicos Islands']),
		db.insert.bind(db, 'country', ['code','name'], ['TV','Tuvalu']),
		db.insert.bind(db, 'country', ['code','name'], ['UG','Uganda']),
		db.insert.bind(db, 'country', ['code','name'], ['UA','Ukraine']),
		db.insert.bind(db, 'country', ['code','name'], ['AE','United Arab Emirates']),
		db.insert.bind(db, 'country', ['code','name'], ['UY','Uruguay']),
		db.insert.bind(db, 'country', ['code','name'], ['VI','US Virgin Islands']),
		db.insert.bind(db, 'country', ['code','name'], ['UZ','Uzbekistan']),
		db.insert.bind(db, 'country', ['code','name'], ['VU','Vanuatu']),
		db.insert.bind(db, 'country', ['code','name'], ['VE','Venezuela']),
		db.insert.bind(db, 'country', ['code','name'], ['VN','Vietnam']),
		db.insert.bind(db, 'country', ['code','name'], ['WF','Wallis and Futuna']),
		db.insert.bind(db, 'country', ['code','name'], ['','West Bank']),
		db.insert.bind(db, 'country', ['code','name'], ['EH','Western Sahara']),
		db.insert.bind(db, 'country', ['code','name'], ['YE','Yemen']),
		db.insert.bind(db, 'country', ['code','name'], ['ZM','Zambia']),
		db.insert.bind(db, 'country', ['code','name'], ['ZW','Zimbabwe'])
	  	], callback);
};

exports.down = function (db, callback) {
  db.dropTable('country', callback);
};