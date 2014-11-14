/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react');
var PageActions = require('../actions/PageActions');
var DefaultLayout = require('../layouts/DefaultLayout');

/**
 * AJAX request to our API to retrieve container information
 * Note: refactor this to the Store later
 */
console.log('inside the default layout');
// $.ajax(
//
// );

var config = {
  dockerAPI: 'http://localhost:3123/api/docker/containers'
};

var getContainers = function(){
  // console.log('jQuery', $);
  // $.ajax({
  //   url: config.dockerAPI,
  //   type: 'GET',
  //   success: function(data){
  //     console.log(data);
  //   }
  // });
};

getContainers();

var HomePage = React.createClass({

  statics: {
    layout: DefaultLayout
  },

  componentWillMount() {
    PageActions.setTitle('Lifter UI');
  },

  render() {
    return (
      <div className="container">
        <table className="table">
        <caption>Optional table caption.</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      </div>
    );
  }

});

module.exports = HomePage;