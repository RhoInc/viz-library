(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
            ? define(factory)
            : (global.vizLibrary = factory());
})(this, function() {
    'use strict';

    /* -----------------------------------------------------
     Takes a meta data and an array of properties for which
     standard filters (<select> elements) are created. Measures
     can take the form [attr1, attr2] or
     [{colName:"attr1",label:"Attribute #1"},{colName:"attr2",label:"Attribute #2"}]
     ----------------------------------------------------- */

    function buildFilters(meta, measures, parentElement) {
        meta.forEach(function(metum) {
            var main = metum.package.main;
            metum.languages = main.split('.')[main.split('.').length - 1].toLowerCase();
            var dependencies =
                metum.languages === 'js' ? 'dependencies' : metum.languages[0] + 'Dependencies';
            metum.libraries = Object.keys(metum.package[dependencies]);
        });
        measures = measures.map(function(m) {
            return m.length ? { colName: m, label: m } : m;
        });

        var wraps = d3
            .select(parentElement)
            .selectAll('div.controlWrap')
            .data(measures)
            .enter()
            .append('div')
            .attr('class', 'controlWrap');

        //create the select for the filter
        wraps
            .append('div')
            .attr('class', 'controlLabel')
            .text(function(d) {
                return d.label.charAt(0).toUpperCase() + d.label.slice(1);
            });

        var selects = wraps.append('select');
        selects
            .selectAll('option')
            .data(function(d) {
                // gets a list of values for the measure
                var measureName = d.colName;
                var valueArrays = meta.map(function(metaRow) {
                    return metaRow[measureName];
                });
                var allValues = [].concat.apply([], valueArrays);
                var uniqueValues = d3.set(allValues).values();
                return d3.merge([['All'], uniqueValues]);
            })
            .enter()
            .append('option')
            .text(function(d) {
                return d;
            });

        //add event listener for the filters
        selects.on('change', function(d) {
            var elements = d3.selectAll('div.media-tile');
            elements.classed('hidden', false);
            selects.each(function(e) {
                var value = this.value;
                var measure = e.colName;
                if (value != 'All')
                    elements
                        .filter(function(d) {
                            return d[measure].indexOf(value) == -1;
                        })
                        .classed('hidden', true);
            });
        });
    }

    /* -----------------------------------------------------
     Takes an array of metadata object (see sample input) and
     a valid css selector (`parentDiv`)  and renders divs
     styled for for the example gallery (see sample output)

    Sample Input for `meta`:
    	[
    		{
    			"id":"0001-density-lattice",
    			"title": "Custom Density Plot Example"
    			"repository":"lattice",
    			"technology":"R",
    			"url":"/0001-density-lattice",
    			"thumbnail":"default", //or "placeholder"
    			"description":"This is a sweet description"
    		},
    		... //add more objects here as desired
    	]

    Sample Output rendered to DOM (one per object in meta:
    <div class="media-tile">
        <a href="./examples/0001-density-lattice">
            <img src="./examples/0001-density-lattice/thumbnail.png" width="300" height="200" alt="0001-density-lattice">
        </a>
        <a href="./examples/0001-density-lattice" class="text-wrap">
            <p>
                <span class="media-title">Custom Density Plot Example</span>
            </p>
        </a>
    </div>
       ---------------------------------------------------- */

    function buildExampleList(meta, parentElement) {
        var parentDiv = d3.select(parentElement);
        var wrap = parentDiv.append('div').attr('class', 'media-list');
        var items = wrap
            .selectAll('div')
            .data(meta)
            .enter()
            .append('div')
            .attr('class', 'media-tile');

        //append image
        items
            .append('a')
            .attr('href', function(d) {
                return './examples/' + d.dir;
            })
            .append('img')
            .attr({
                width: 300,
                height: 200,
                alt: function alt(d) {
                    return d.id;
                },
                src: function src(d) {
                    return './examples/' + d.dir + '/thumb.png';
                }
            });

        //append text title
        items
            .append('a')
            .attr('class', 'text-wrap')
            .attr('href', function(d) {
                return d.url;
            })
            .append('p')
            .append('span')
            .attr('class', 'media-title')
            .text(function(d) {
                return d.package.label;
            });
    }

    function dataPreview(dataFiles) {
        var myFiles = d3.select('.file-list');

        var tbody = myFiles.append('tbody');
        var rows = tbody
            .selectAll('tr')
            .data(dataFiles)
            .enter()
            .append('tr');

        rows
            .append('td')
            .text(function(d) {
                return d.filename;
            })
            .attr('title', function(d) {
                return d.rel_path;
            })
            .style('cursor', 'help');

        rows
            .append('td')
            .append('small')
            .text(function(d) {
                return ' ' + d.rows + ' Rows x ' + d.cols + ' Cols';
            });

        rows
            .append('td')
            .html('&#128269;')
            .attr('title', 'Preview the data')
            .style('cursor', 'pointer')
            .on('click', function(d) {
                rows.classed('selected', false);
                rows
                    .filter(function(e) {
                        return e == d;
                    })
                    .classed('selected', true);
                var label = d3
                    .select('.data-preview')
                    .select('strong')
                    .text('A listing of ' + d.rel_path + ':');

                label
                    .append('button')
                    .text('Clear Preview')
                    .on('click', function() {
                        rows.classed('selected', false);
                        d3
                            .select('.data-preview')
                            .select('strong')
                            .html('Click &#128269; to preview a data set');
                        d3
                            .select('.data-preview')
                            .select('.data-table')
                            .selectAll('*')
                            .remove();
                    });

                d3.csv(d.rel_path, function(error, data) {
                    d3
                        .select('.data-preview')
                        .select('.data-table')
                        .selectAll('*')
                        .remove();
                    var preview = webCharts.createTable('.data-preview .data-table', {});
                    preview.init(data);
                });
            });

        rows
            .append('td')
            .append('a')
            .attr('href', function(d) {
                return d.rel_path;
            })
            .html('&#8595;')
            .attr('title', 'Download the data')
            .style('cursor', 'pointer');
    }

    function buildGistList(meta, parentElement) {
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
            .attr('href', function(d) {
                return './bin/gists/' + d.id;
            })
            .text(function(d) {
                return d.description ? d.description : '<no description available>';
            });

        //owner
        items.append('small').text(function(d) {
            return ' ' + d.owner.login;
        });
    }

    function buildPubList(meta, parentElement) {
        var parentDiv = d3.select(parentElement);
        var list = parentDiv.append('ul').attr('class', 'pubs');
        var items = list
            .selectAll('li')
            .data(meta)
            .enter()
            .append('li')
            .attr('class', 'pub');

        //thumb
        items.append('img').attr('src', function(d) {
            return './pubs/img/' + d.thumbnail;
        });
        //    .text(d => (d.description ? d.description : "<no description available>"));

        var wraps = items.append('div').attr('class', 'pub-wrap');

        //title
        wraps
            .append('p')
            .attr('class', 'title')
            .text(function(d) {
                return d.title;
            });

        //description
        wraps
            .append('p')
            .attr('class', 'description')
            .text(function(d) {
                return d.text;
            });

        //author
        wraps
            .append('p')
            .attr('class', 'author')
            .text(function(d) {
                return d.keyValues[0].value;
            });

        //tags
        function cap1(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        var taglist = wraps.append('ul').attr('class', 'tags');
        taglist
            .selectAll('li')
            .data(function(d) {
                return d.links;
            })
            .enter()
            .append('li')
            .append('a')
            .attr('href', function(d) {
                return d.href.indexOf('http') > -1 ? d.href : './pubs/' + d.href;
            })
            .attr('class', function(d) {
                return d.type;
            })
            .html(function(d) {
                return d.type == 'github' ? d.type : cap1(d.type);
            });
    }

    var index = {
        buildFilters: buildFilters,
        buildExampleList: buildExampleList,
        dataPreview: dataPreview,
        buildGistList: buildGistList,
        buildPubList: buildPubList
    };

    return index;
});
