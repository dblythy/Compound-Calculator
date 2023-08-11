import Calculator from '../Calculator.vue';

describe('Calculator.vue Test', () => {
  it(`Does compute undefined when values aren't passed`, () => {
    expect(Calculator.computed.balance.call({})).toEqual({});
  });

  const expected = [
    {
      options: {
        interest: 1.1,
        deposit: 10000,
        term: 3,
        termPeriod: 'months',
        interestPeriod: 'Monthly',
      },
      output: 10027.525216035878,
    },
    {
      options: {
        interest: 2.1,
        deposit: 10000,
        term: 3,
        termPeriod: 'months',
        interestPeriod: 'Monthly',
      },
      output: 10052.591928593749,
    },
    {
      options: {
        interest: 1.1,
        deposit: 20000,
        term: 3,
        termPeriod: 'months',
        interestPeriod: 'Monthly',
      },
      output: 20055.050432071755,
    },
    {
      options: {
        interest: 1.1,
        deposit: 10000,
        term: 3,
        termPeriod: 'years',
        interestPeriod: 'Annually',
      },
      output: 10333.64331,
    },
    {
      options: {
        interest: 1.1,
        deposit: 10000,
        term: 4,
        termPeriod: 'months',
        interestPeriod: 'At Maturity',
      },
      output: 10036.666666666666,
    },
  ];
  for (const { options, output } of expected) {
    it(`Does correctly compute output ${output}`, () => {
      expect(Calculator.computed.balance.call(options).result).toBe(output);
    });
  }

  it(`Does correctly handle errors`, () => {
    expect(
      Calculator.computed.balance.call({
        interest: 1.1,
        deposit: 10000,
        term: 3,
        termPeriod: 'months',
        interestPeriod: 'Annually',
      }).error
    ).toBe('Annually must have a minimum of 12 months');
  });
});
