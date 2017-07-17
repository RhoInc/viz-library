import updateSubjectCount
    from './util/updateSubjectCount';

export default function onDraw() {
  //Annotate sample and population counts.
    updateSubjectCount(this, this.config.id_col, '.annote');

  //Clear current multiples.
    this.wrap.select('.multiples').select('.wc-small-multiples').remove();
}
