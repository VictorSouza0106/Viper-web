import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { VRM, VRMSchema } from '@pixiv/three-vrm';

@Component({
  selector: 'app-three-loader',
  templateUrl: './three-loader.component.html',
  styleUrls: ['./three-loader.component.scss']
})
export class ThreeLoaderComponent implements OnInit,AfterViewInit {

    @ViewChild('rendererCanvas', {static: true})
    public rendererCanvas?: ElementRef<HTMLCanvasElement>;

    private renderer?:THREE.WebGLRenderer;
    private camera?:THREE.PerspectiveCamera;
    private scene?:THREE.Scene;
    private light?:THREE.AmbientLight
    private canvas?:any;

    private frameId?: number;

  constructor(  
    private ngZone: NgZone  
  ) { }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(){
    
    this.setRenderer();
    this.animate();
  }

  setRenderer(){

    this.canvas = this.rendererCanvas?.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      antialias:true,
      alpha:true,
      canvas: this.canvas,
    });
    this.renderer.setSize(window.innerWidth-20,window.innerHeight-255);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.scene = new THREE.Scene();

   this.setCamera();
  }

  setCamera(){

    let aspectRatio = window.innerWidth/window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(25,aspectRatio,0.1,100);
    this.camera.position.set(0,0,2.5);

    let controls = new OrbitControls(this.camera, this.renderer?.domElement)
    controls.screenSpacePanning = true
    controls.target.set(0.0, 1.25, 0.0)
    controls.update()

    this.setLight();
  }

  setLight(){
    let light = new THREE.DirectionalLight(0xffffff,1);
    light.position.set(1.0, 1.0, 1.0).normalize()
    this.scene?.add(light);

    this.loadVRM();
  }

  loadVRM(){
    let loader = new GLTFLoader();
    
    loader.load(
  
    // URL of the VRM you want to load
    '../../../assets/Vipery2.vrm',
  
    // called when the resource is loaded
    async ( gltf ) => {
  
      // generate a VRM instance from gltf
      let model = await VRM.from(gltf);
  
        const bones = [
          VRMSchema.HumanoidBoneName.Neck
        ].map((boneName) => {
          return model?.humanoid?.getBoneNode(boneName)
        })
        const clip = THREE.AnimationClip.parseAnimation({
          hierarchy: [{
            keys: [{
              rot: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0)).toArray(),
              time: 5.0,
            }]
          }]
        }, bones as any)
        clip.tracks.some((track) => {
          track.name = track.name.replace(/^\.bones\[([^\]]+)\].(position|quaternion|scale)$/, '$1.$2')
        })
    
        this.scene?.add(model.scene)
    
      },
    
      // called while loading is progressing
      ( progress ) => console.log( 'Loading model...', 100.0 * ( progress.loaded / progress.total ), '%' ),
    
      // called when loading has errors
      ( error ) => console.error( error )
    
      );  
    }

    public animate(): void {
      this.ngZone.runOutsideAngular(() => {
        if (document.readyState !== 'loading') {
          this.render();
        } else {
          window.addEventListener('DOMContentLoaded', () => {
            this.render();
          });
        }
      });
    }

    public render(): void {
      this.frameId = requestAnimationFrame(() => {
        this.render();
      });
      this.renderer?.render(this.scene as any, this.camera as any);
    }
}

 

