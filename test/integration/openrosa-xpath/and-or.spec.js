describe( 'and/or operators', () => {
  TODO()
  xit('and works without spacing', () => {
    assertTrue("1and1");
  });

  xit('and works without spacing AFTER and', () => {
    assertTrue("1 and1");
  });

  xit('and works with linebreak/tab spacing', () => {
    assertTrue("1 and\r\n\t1");
  });

  xit('and works without spacing BEFORE and', () => {
    assertTrue("1and 1");
  });

  xit('and works with numbers-as-string', () => {
    assertTrue("'1'and'1'");
  });

  xit('And (capitalized) fails miserably', () => {
    assert.throw(() => xEval("1 And 1"));//does not throw instance of error
  });

  it('and without potential spacing issues works', () => {
    assertTrue("true() and true()");
    assertFalse("false() and true()");
    assertFalse("true() and false()");
    assertFalse("false() and false()");
    assertTrue("1 and 1");
    assertFalse("0 and 1");
    assertFalse("-1 and 0");
    assertFalse("0 and 0");
    assertTrue("1 and -1");
    assertTrue("1 and (1 div 0)");
    assertTrue("(-1 div 0) and 1");
    assertFalse("number('') and 1");
    assertFalse("number('') and 0");
    assertFalse("1 and 1 and 0");
    assertTrue("1 and 1 and true()");
    assertFalse("false() and 1 and true()");
  });

  it('and laziness', () => {
    assertFalse("false() and $some-made-up-var");
    assertFalse("false() and $some-made-up-var and true()");
    assertFalse("true() and false() and $some-made-up-var");
  });

  xit('or works without spacing', () => {
    assertTrue("1or1");
  });

  xit('or works without spacing AFTER or', () => {
    assertTrue("1 or1");
  });

  xit('or works with newline/tab spacing', () => {
    assertTrue("1 or\r\n\t1");
  });

  xit('or works without spacing BEFORE or', () => {
    const result = g.doc.evaluate( "1or 1", g.doc, null, g.win.XPathResult.BOOLEAN_TYPE, null );
    expect( result.booleanValue ).to.equal( true );
  });

  xit('or works with numbers-as-string', () => {
    assertTrue("'1'or'1'");
  });

  xit('And (capitalized) fails miserably', () => {
    expect(xEval("1 OR 1")).to.throw(); // does not throw instance of error
  });

  it('or without potential spacing issues works', () => {
    [
      [ "true() or true()", true ],
      [ "false() or true()", true ],
      [ "true() or false()", true ],
      [ "false() or false()", false ],
      [ "1 or 1", true ],
      [ "0 or 1", true ],
      [ "0 or -1", true ],
      [ "0 or 0", false ],
      [ "1 or -1", true ],
      [ "1 or (1 div 0)", true ],
      [ "(-1 div 0) or 1", true ],
      [ "number('') or 1", true ],
      [ "number('') or 0", false ],
      [ "1 or 1 or 0", true ],
      [ "1 or 1 or true()", true ],
      [ "false() or 0 or 0", false ]
    ].forEach(t => {
        assertBoolean(t[0], t[1]);
    });
  });

  it('or laziness', () => {
    [
      [ "true() or $some-made-up-var", true ],
      [ "true() or $some-made-up-var and true()", true ],
      [ "false() or true() or $some-made-up-var", true ]
    ].forEach( t => {
      assertBoolean(t[0], t[1]);
    });
  });

  it('or/and precendence rules are applied correctly', () => {
    [
      [ "true() or true() and false()", true ],
      [ "true() and false() or true()", true ],
      [ "false() and false() or false()", false ],
      [ "0 or 1 and 0", false ],
      [ "0 or 1 and 0+1", true ]
    ].forEach( t => {
      assertBoolean(t[0], t[1]);
    } );
  });
});