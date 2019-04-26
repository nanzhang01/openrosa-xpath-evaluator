describe('#format-date()', () => {
  _.forEach({
    'format-date("2001-12-31", "%b %e, %Y")': 'Dec 31, 2001',
  }, function(expected, expr) {
    it(expr + ' should evaluate to ' + expected, () => {
      assertString(expr, expected);
    });
  });
});


// // Karma config is setting timezone to America/Denver
it( 'format-date()', () => {
  TODO()
//     const date = new Date();
//     [
//         [ "format-date(.,  '%Y/%n | %y/%m | %b' )", g.doc.getElementById( "FunctionDateCase1" ), '2012/7 | 12/07 | Jul' ],
//         [ "format-date(., '%Y/%n | %y/%m | %b')", g.doc.getElementById( "FunctionDateCase2" ), '2012/8 | 12/08 | Aug' ],
//         [ "format-date(., '%M | %S | %3')", g.doc.getElementById( "FunctionDateCase2" ), '00 | 00 | 000' ],
//         [ `format-date('${date.toString()}', '%e | %a' )`, g.doc,
//             `${date.getDate()} | ${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]}`
//         ],
//         [ "format-date('not a date', '%M')", g.doc, 'Invalid Date' ],
//         //["format-date('Mon, 02 Jul 2012 00:00:00 GMT', )", g.doc, '']
//         // the test below probably only works in the GMT -6 timezone...
//         [ "format-date(., '%Y | %y | %m | %n | %b | %d | %e | %H | %h | %M | %S | %3 | %a')", g.doc.getElementById( "FunctionDateCase5" ),
//             '2012 | 12 | 08 | 8 | Aug | 08 | 8 | 06 | 6 | 07 | 08 | 123 | Wed'
//         ],
//     ].forEach( t => {
//         let expr = t[ 0 ];
//         let result = g.doc.evaluate( expr, t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );
//         expect( result.stringValue ).to.equal( t[ 2 ] );
//         // do the same tests for the alias format-date-time()
//         expr = expr.replace( 'format-date', 'format-date-time' );
//         result = g.doc.evaluate( expr, t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );
//         expect( result.stringValue ).to.equal( t[ 2 ] );
//     } );
// } );
//
// // Karma config is setting timezone to America/Denver
// it( 'format-date() - locale dependent', () => {
//     [
//         [ "format-date('2017-05-26T00:00:01-07:00', '%a %b')", g.doc, 'Fri May' ],
//         [ "format-date('2017-05-26T23:59:59-07:00', '%a %b')", g.doc, 'Fri May' ],
//         [ "format-date('2017-05-26T01:00:00-07:00', '%a %b')", g.doc, 'Fri May', 'en' ],
//         [ "format-date('2017-05-26T01:00:00-07:00', '%a %b')", g.doc, 'ven. mai', 'fr' ],
//         [ "format-date('2017-05-26T01:00:00-07:00', '%a %b')", g.doc, 'vr mei', 'nl' ],
//     ].forEach( t => {
//         g.win.enketoFormLocale = t[ 3 ];
//         let expr = t[ 0 ];
//         let result = g.doc.evaluate( expr, t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );
//         expect( result.stringValue ).to.equal( t[ 2 ] );
//         // do the same tests for the alias format-date-time()
//         expr = expr.replace( 'format-date', 'format-date-time' );
//         result = g.doc.evaluate( expr, t[ 1 ], helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );
//         expect( result.stringValue ).to.equal( t[ 2 ] );
//     } );
} );
