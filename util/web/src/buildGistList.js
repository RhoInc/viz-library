export default function buildGistList(meta, parentElement) {
    var parentDiv = d3.select(parentElement);
    var list = parentDiv.append('ul');
    var items = list
        .selectAll('li')
        .data(meta)
        .enter()
        .append('li');

    //id
    items
        .append('a')
        .attr('href', d => './bin/gists/' + d.id)
        .text(d => (d.description ? d.description : '<no description available>'));

    //owner
    items.append('small').text(d => ' ' + d.owner.login);
}
