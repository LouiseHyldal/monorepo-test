"use strict";
const dayjs = require("dayjs");
const a = require("package-a");
console.log(`Today's date: ${dayjs().format()}`);
console.log(`From package a: ${a.getMessage()}`);
