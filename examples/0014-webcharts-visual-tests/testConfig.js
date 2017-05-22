var testConfig = [
  {
    label: 'Testing Axis Types - linear vs. linear',
    notes: '',
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
    label: 'Testing Axis Types - linear vs. ordinal',
    notes:'',
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
    label: 'Testing Axis Types - ordinal vs. ordinal',
    notes:'Opacity set to identify overlapping points. As shown, ordinal axis treat missing values as just another level to be plotted. (e.g. `group=""` or  `group=" "`)',
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
    label: 'Testing Axis Types - log vs. log',
    notes: 'log axes are buggy as of 1.7.1.',
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
  },
  {
    label: 'Testing Axis Types - date vs. linear ',
    notes: 'This charts shows the number of records at each given date. Note that no `y.column` is specified; instead, marks.summarizeY specifies a simple calculation.',
    settings: {
      max_width:500,
      x: {
        column: 'Query Open Date',
        type: 'time',
        format:'%y-%m'
      },
      y: {
        type:'linear',
        label:'count',
        domain:[0]
      },
      date_format:"%Y-%m-%d",
      marks: [
        {
          type: 'circle',
          per: ['Query Open Date'],
          summarizeY:'count'
        }
      ]
    },
    dataPath: '../../data/queries/queries.csv'
  }
];