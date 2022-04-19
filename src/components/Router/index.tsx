import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Spider from '../Spider';
import FreeCell from '../FreeCell';

export default function App () {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/spider">Spider</Link>
            </li>
            <li>
              <Link to="/freecell">FreeCell</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/spider">
            <Spider />
          </Route>
          <Route path="/freecell">
            <FreeCell />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}