var testConfig = [
  {
    label: 'Simple Scatter plot - linear vs. linear',
    settings: {
      max_width:500,
      x: {
        column: 'Melt',
        type: 'linear',
        label: 'Melting Point (K)'
      },
      y: {
        column: 'Boil',
        type: 'linear',
        label: 'Boiling Point (K)'
      },
      marks: [
        {
          type: 'circle',
          per: ['Element']
        }
      ]
    },
    dataPath: '../../data/elements.csv'
  },
  {
    label: 'Simple Scatter Plot - linear vs. ordinal',
    settings: {
      max_width:500,
      x: {
        column: 'Period',
        type: 'ordinal',
        label: 'Period'
      },
      y: {
        column: 'Boil',
        type: 'linear',
        label: 'Boiling Point (K)'
      },
      marks: [
        {
          type: 'circle',
          per: ['Element']
        }
      ]
    },
    dataPath: '../../data/elements.csv'
  },
  {
    label: 'Simple Scatter plot - ordinal vs. ordinal',
    settings: {
      max_width:500,
      x: {
        column: 'Period',
        type: 'ordinal',
        label: 'Period'
      },
      y: {
        column: 'Group',
        type: 'ordinal',
        label: 'Group'
      },
      marks: [
        {
          type: 'circle',
          per: ['Element'],
          attributes:{"fill-opacity":0.2,"stroke-opacity":1}
        }
      ]
    },
    dataPath: '../../data/elements.csv'
  },
  {
    label: 'Simple Scatter plot - log vs. log',
    settings: {
      max_width:500,
      x: {
        column: 'Melt',
        type: 'log',
        label: 'Melting Point (K)'
      },
      y: {
        column: 'Boil',
        type: 'log',
        label: 'Boiling Point (K)'
      },
      marks: [
        {
          type: 'circle',
          per: ['Element']
        }
      ]
    },
    dataPath: '../../data/elements.csv'
  }
];
