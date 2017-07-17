export default function onLayout(){
  //Add div for participant counts.
    this.controls.wrap
        .append('p')
        .classed('annote', true);

  //Define x-axis column control behavior.
    let xColSelect = this.controls.wrap.selectAll('.control-group')
        .filter(f => f.option === 'x.column')
        .select('select');

  //Map column names to column labels.
    xColSelect
        .selectAll('option')
        .text(d =>
            this.config.time_cols[
                this.config.time_cols
                    .map(d => d.value_col)
                    .indexOf(d)].label);

  //Define event listener.
    xColSelect.on('change', d => {
        const time_col = this.config.time_cols[
            this.config.time_cols
                .map(di => di.label)
                .indexOf(xColSelect.property('value'))];

      //Redefine settings properties based on x-axis column selection.
        this.config.x.column = time_col.value_col;
        this.config.x.type = time_col.type;
        this.config.x.label = time_col.label;
        this.config.marks[1].per[2] = time_col.value_col;
        this.config.rotate_x_tick_labels = time_col.rotate_tick_labels;
        this.config.margin.bottom = time_col.vertical_space;

        this.draw();
    });

  //Add wrapper for small multiples.
    this.wrap
        .append('div')
        .attr('class', 'multiples');
}
