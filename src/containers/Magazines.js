import React, { Component } from 'react';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  AutoSizer,
  WindowScroller,
} from 'react-virtualized';
import 'react-virtualized/styles.css';

import { Query } from 'react-apollo';

import getIssuesQuery from '../graphql/queries/getIssues';

class Magazines extends Component {
  constructor() {
    super();

    this.cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 225,
      fixedWidth: true,
    });

    this.cellPositioner = createMasonryCellPositioner({
      cellMeasurerCache: this.cache,
      columnCount: 4,
      columnWidth: 225,
      spacer: 30,
    });

    this._cellRenderer = this._cellRenderer.bind(this);
  }

  _cellRenderer(props) {
    const { index, key, parent, style, issues } = props;
    const datum = parent.props.issues[index];
    return (
      <CellMeasurer cache={this.cache} index={index} key={key} parent={parent}>
        <div className="magazine-wrapper" style={style}>
          <img
            alt={datum.title}
            src={datum.cover}
            style={{
              height: 250,
              width: 225,
            }}
          />
          <div className="metadata">
            <h5>{datum.title}</h5>
            <p className="ownername">
              <a>{datum.publisher.title}</a>
            </p>
            <p className="description">{datum.description}</p>
          </div>
        </div>
      </CellMeasurer>
    );
  }

  render() {
    return (
      <div className="magazine-container">
        <Query query={getIssuesQuery}>
          {({ loading, error, data: { issues } }) => {
            if (loading) {
              return <span> Loading </span>;
            } else {
              return (
                <WindowScroller>
                  {({ height, scrollTop, isScrolling }) => (
                    <AutoSizer
                      disableHeight
                      height={height}
                      scrollTop={scrollTop}
                    >
                      {({ width }) => (
                        <Masonry
                          autoHeight
                          cellCount={issues.length}
                          cellMeasurerCache={this.cache}
                          cellPositioner={this.cellPositioner}
                          cellRenderer={this._cellRenderer}
                          isScrolling={isScrolling}
                          scrollTop={scrollTop}
                          height={height}
                          width={width}
                          issues={issues}
                        />
                      )}
                    </AutoSizer>
                  )}
                </WindowScroller>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

export default Magazines;
