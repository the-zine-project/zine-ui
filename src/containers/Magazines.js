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

    this.state = {
      isLoading: true,
      magazines: [],
    };

    this._cellRenderer = this._cellRenderer.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3001/magazines')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        this.setState({
          magazines: data || [],
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        });
      });
  }

  _cellRenderer(props) {
    const { index, key, parent, style } = props;
    const datum = this.state.magazines[index];
    return (
      <CellMeasurer cache={this.cache} index={index} key={key} parent={parent}>
        <div className="magazine-wrapper" style={style}>
          <img
            alt={datum.title}
            src={datum.imageUrl}
            style={{
              height: 250,
              width: 225,
            }}
          />
          <div className="metadata">
            <h5>{datum.title}</h5>
            <p className="ownername">
              <a>{datum.ownerName}</a>
            </p>
            <p className="description">{datum.description}</p>
          </div>
        </div>
      </CellMeasurer>
    );
  }

  render() {
    const { magazines } = this.state;
    return (
      <div className="magazine-container">
        {magazines && (
          <WindowScroller>
            {({ height, scrollTop, isScrolling }) => (
              <AutoSizer disableHeight height={height} scrollTop={scrollTop}>
                {({ width }) => (
                  <Masonry
                    autoHeight
                    cellCount={magazines.length}
                    cellMeasurerCache={this.cache}
                    cellPositioner={this.cellPositioner}
                    cellRenderer={this._cellRenderer}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                    height={height}
                    width={width}
                    magazines={magazines}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </div>
    );
  }
}

export default Magazines;
