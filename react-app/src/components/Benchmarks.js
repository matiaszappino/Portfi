import React from 'react';
import "./main/Main.css";
import MouseOverPopover from "./Popover"

const Benchmarks = () => {
  return (
    <main>
<div className="main__container">
        {/* <!-- CHARTS STARTS HERE --> */}
        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Widget Title</h1>
                <p>Subtitle</p>
              </div>
              <MouseOverPopover />
            </div>
          </div>

          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Widget Title</h1>
                <p>Subtitle</p>
              </div>
              <MouseOverPopover />
            </div>
          </div>

          <div className="charts__left">
          <div className="charts__left__title">
              <div>
                <h1>Widget Title</h1>
                <p>Subtitle</p>
              </div>
              <MouseOverPopover />
            </div>
          </div>
          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Widget Title</h1>
                <p>Subtitle</p>
              </div>
              <MouseOverPopover />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default Benchmarks;
