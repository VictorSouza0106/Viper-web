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

    @ViewChild('rendererCanvas', {static: true}) rendererCanvas: ElementRef<HTMLCanvasElement>;

    public axisX: number = 1;
    public axisY: number = 0.7;

    public neckX: number = 1;
    public neckY: number = 0.7;
    public model:VRM;

    private clock: THREE.Clock;
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private canvas: HTMLCanvasElement;
    
    private width: number = window.innerWidth;
    private height: number = window.innerHeight;
    private smooth: number;

    private timeoutHandle: any;

  constructor(  
    private ngZone: NgZone,
  ) { }
  
  public ngOnInit(): void {
    this.create3DCanvas();
  }

  public ngAfterViewInit(){
    this.clock = new THREE.Clock();
    this.clock.start(); 
    this.animate();
    this.mouseMoveListener();
  }

  private create3DCanvas(){
    this.scene = new THREE.Scene();
    
    this.loadVRM();
    this.createRenderer();
    this.createCamera();
    this.createLight();
  }

  private createRenderer(){

    this.canvas = this.rendererCanvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      antialias:true,
      alpha:true,
      canvas: this.canvas,
    });

    this.renderer.setSize(window.innerWidth-20,window.innerHeight-255);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  private createCamera(){

    let aspectRatio = window.innerWidth/window.innerHeight;

    //camera eixo orbital
    this.camera = new THREE.PerspectiveCamera(25,aspectRatio,0.1,100.0);
    this.camera.position.set( 0, 1.6, -1.5);
    
    //camera eixo reto
    let controls = new OrbitControls(this.camera, this.renderer.domElement)
    controls.screenSpacePanning = true
    controls.target.set(0.0, 1.35, 0.0)
    controls.enabled = false;
    controls.update()
  }

  private createLight(){
    let light = new THREE.DirectionalLight(0xffffff,1);
    light.position.set(1.0, 1.0, 1.0).normalize()
    this.scene.add(light);
  }

  private loadVRM(){
    let loader = new GLTFLoader();

    loader.load(
  
    // URL of the VRM you want to load
    '../../../assets/Vipery2.vrm',
  
    // called when the resource is loaded
    async ( gltf ) => {
  
      // generate a VRM instance from gltf
      this.model = await VRM.from(gltf);

      // 0.0000011562 * x ^ 2 - 1;

      //bones
      this.model.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.LeftUpperArm).rotation.set(0,0,-5)
      this.model.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.RightUpperArm).rotation.set(0,0,5)

      //posição do pescoço
      this.model.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Neck).rotation.set(0,0,0)

      this.model.springBoneManager.reset();

     // this.smooth = 1.0 - Math.exp( - 10 * this.clock.getDelta() );

      //Posição 0 da cabeça: x: 930 y: 280
        const bones = [
          VRMSchema.HumanoidBoneName.Neck
        ].map((boneName) => {
          return this.model.humanoid.getBoneNode(boneName)
        })
        const clip = THREE.AnimationClip.parseAnimation({
          hierarchy: [{
            keys: [{
              rot: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0)).toArray(),
              time: 5.0,
            }]
          }]
        }, bones as any)

        // clip.tracks.some((track) => {
        //   track.name = track.name.replace(/^\.bones\[([^\]]+)\].(position|quaternion|scale)$/, '$1.$2')
        // })
    
        this.scene.add(this.model.scene)
      },
    
      // called while loading is progressing
      ( progress ) => console.log( 'Loading model...', 100.0 * ( progress.loaded / progress.total ), '%' ),
    
      // called when loading has errors
      ( error ) => console.error( error )
    
      );  
  }

  private animate(): void {
    this.ngZone.runOutsideAngular(() => {

      window.addEventListener('DOMContentLoaded', () => {
        this.render();
      });

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  private render(): void {
    let frameId = requestAnimationFrame(() => {
      this.render();
    });

    this.animateNeck();

    this.renderer.render(this.scene as any, this.camera as any);
  }

  private animateNeck(){
    let newPositionX = this.axisX ?? 1;
    let newPositionY = this.axisY ?? 0.7;

    let posX = newPositionX > 2 ? 2 : newPositionX;
    let posY = newPositionY > 1.2 ? 1.2 : newPositionY;

    if(Math.round(this.neckX * 10) < Math.round(posX * 10)) this.neckX += 0.13;
    if(Math.round(this.neckX * 10) > Math.round(posX * 10)) this.neckX -= 0.13; 

    if(Math.round(this.neckY * 10) < Math.round(posY * 10)) this.neckY += 0.07;
    if(Math.round(this.neckY * 10) > Math.round(posY * 10)) this.neckY -= 0.07;
    

    if(this.model)
    {
    //   //Animations
      this.model.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Neck).rotation.set((this.neckY - 1) * -0.5, (this.neckX - 1) * 0.5,0);
    //   this.model.blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Fun,this.axisX * -0.001);
    //   this.model.blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.u,this.axisX * -0.001);
    //   this.model.blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Sorrow,this.axisX * 0.001);
    //   this.model.blendShapeProxy.update()
      this.model.update( this.clock.getDelta() ); 
    }
  }

  private resize(): void {

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }

  private mouseMoveListener(){

    document.getElementById('rendererCanvas').addEventListener('mousemove', (event) => {
      this.axisX = event.clientX / (window.innerWidth / 2);
      this.axisY = event.clientY / (window.innerHeight/ 2);

      window.clearTimeout(this.timeoutHandle);

      this.timeoutHandle = window.setTimeout(() => {
        this.axisX = 1;
        this.axisY = 0.7;
      }, 2000);
      

    });
  }
}

 

