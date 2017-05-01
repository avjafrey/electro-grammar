const assert  = require('assert')

const parseElectronicComponent = require('../lib/index')

describe('SMD Capacitors', () => {
  it('parses a capacitor', () => {
    const c = parseElectronicComponent('2uF 0603')
    assert(c.capacitance === (2 * 10e-6), 'capacitance value is wrong')
    assert(c.size === '0603', 'size is wrong')
  })
  it('parses tolerance', () => {
    const c = parseElectronicComponent('2uF 0603 30%')
    assert(c.capacitance === (2 * 10e-6), 'capacitance value is wrong')
    assert(c.size === '0603', 'size is wrong')
    assert(c.tolerance === 30, 'tolerance is wrong')
  })
  it('parses +/- in tolerance', () => {
    const c = parseElectronicComponent('2uF 0603 +/-30%')
    assert(c.capacitance === (2 * 10e-6), 'capacitance value is wrong')
    assert(c.size === '0603', 'size is wrong')
    assert(c.tolerance === 30, 'tolerance is wrong')
  })
  it('parses ± in tolerance', () => {
    const c = parseElectronicComponent('2uF 0603 ±30%')
    assert(c.capacitance === (2 * 10e-6), 'capacitance value is wrong')
    assert(c.size === '0603', 'size is wrong')
    assert(c.tolerance === 30, 'tolerance is wrong')
  })
  it('parses +- in tolerance', () => {
    const c = parseElectronicComponent('2uF 0603 +-30%')
    assert(c.capacitance === (2 * 10e-6), 'capacitance value is wrong')
    assert(c.size === '0603', 'size is wrong')
    assert(c.tolerance === 30, 'tolerance is wrong')
  })
  it('parses all the various ways of saying micro', () => {
    const descriptions = [
      '10uF 0402',
      '10 micro Farad 0402',
      '10𝛍F 0402',
      '10𝜇F 0402',
      '10𝝁 F 0402',
      '10    𝝻F 0402',
      '10𝞵F 0402',
    ]
    descriptions.forEach(d => {
      const c = parseElectronicComponent(d)
      assert(c.capacitance === (10 * 10e-6), 'capacitance is wrong')
      assert(c.size === '0402', 'size is wrong')
    })
  })
})

describe('SMD Resistors', () => {
  it('parses a resistor', () => {
    const c = parseElectronicComponent('1k 0603')
    assert(c.resistance === (1 * 10e3), 'resistance value is wrong')
    assert(c.size === '0603', 'size is wrong')
  })
  it('parses "ohm"', () => {
    const c = parseElectronicComponent('1k ohm 0603')
    assert(c.resistance === (1 * 10e3), 'resistance value is wrong')
    assert(c.size === '0603', 'size is wrong')
  })
})
