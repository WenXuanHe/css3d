'use strict';

var _three = require('three');

var scene = new _three.Scene(); // Creating the scene 

var camera = new _three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new _three.WebGLRenderer();
var geometry = new _three.BoxGeometry();
var material = new _three.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new _three.Mesh(geometry, material);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);