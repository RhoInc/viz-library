export default function onPreprocess() {
  //Define x- and y-axis ranges based on currently selected measure.
    const config = this.config;
    const measure = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.value_col && d.value_col === config.measure_col)
        .select('option:checked')
        .text();
    const measure_data = this.raw_data
        .filter(d => d[config.measure_col] === measure);
    this.config.x.domain = (config.x.type === 'ordinal')
        ? d3.set   (measure_data.map(d =>  d[config.x.column ])).values()
        : d3.extent(measure_data,    d => +d[config.x.column ]);
    this.config.y.domain =
          d3.extent(measure_data,    d => +d[config.value_col]);
}
