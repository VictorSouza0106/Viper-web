import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { Camera, PerspectiveCamera, WebGLRenderer } from 'three';

@Component({
  selector: 'app-three-loader',
  templateUrl: './three-loader.component.html',
  styleUrls: ['./three-loader.component.scss']
})
export class ThreeLoaderComponent implements OnInit {

  constructor(
    private renderer:THREE.WebGLRenderer,
    private camera:THREE.PerspectiveCamera,
    private scene:THREE.Scene,
    private light:THREE.DirectionalLight,
  ) { }
  
  public ngOnInit(){}
 
}
