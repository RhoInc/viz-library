export default function onDataTransform() {
  //Define y-axis label.
    const measure = this.filters
        .filter(filter => filter.col === this.config.measure_col)[0].val;
    const measureData = this.raw_data
        .filter(d => d[this.config.measure_col] === measure);
    this.config.y.label = `${measureData[0][this.config.measure_col]} (`
        + `${measureData[0][this.config.unit_col]})`;
}
