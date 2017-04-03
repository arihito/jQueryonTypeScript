'use strict';

import Model from './model';
import $ = require("jquery");

var user = new Model.Person("Mike");

$(() => {
  $("#name").html(user.getName());
});
