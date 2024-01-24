import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-tshirt-design',
  standalone: true,
  imports: [],
  templateUrl: './tshirt-design.component.html',
  styleUrl: './tshirt-design.component.css'
})

export class TshirtDesignComponent implements OnInit {
  canvas: any;
  designImages: string[] = ['1.jpg', '2.jpg', /* ... */];
  selectedTShirtImage: any;

  artworkCategories: any[] = [
    {
      name: 'Text',
      items: [
        { name: 'Good Vibes', path: '../../assets/artwork/text/1.jpg' },
        { name: 'Hello World', path: '../../assets/artwork/text/2.jpg' },
        { name: 'Hello World 2', path: '../../assets/artwork/text/3.jpg' }
      ]
    },
    {
      name: 'Shapes',
      items: [
        { name: 'Circle', path: '../../assets/artwork/shapes/1.jpg' },
        { name: 'Heart', path: '../../assets/artwork/shapes/2.jpg' },
        { name: 'Heart1', path: '../../assets/artwork/shapes/3.jpg' }
      ]
    }
    // Add more categories and items as needed
  ];

  frontImage: any;


  ngOnInit(): void {
    this.canvas = new fabric.Canvas('frontCanvas');
    this.loadDefaultTShirtImage();
  }

  changeTShirtImage(imagePath: string) {
    this.canvas.clear(); 
    this.selectedTShirtImage = imagePath;
    fabric.Image.fromURL(this.selectedTShirtImage, (img) => {
      img.scaleToWidth(this.canvas.width);
      img.scaleToHeight(this.canvas.height);
      this.canvas.add(img);
    });
  }

  loadDefaultTShirtImage() {
    this.selectedTShirtImage = '../../assets/designs/front/1.jpg';
    fabric.Image.fromURL(this.selectedTShirtImage, (img) => {
      img.scaleToWidth(this.canvas.width);
      img.scaleToHeight(this.canvas.height);
      this.canvas.add(img);
    });
  }

  addText() {
    const text = new fabric.Textbox('Type your text here', {
      left: 100,
      top: 100,
      fill: 'black',
      fontFamily: 'Roboto',
      fontSize: 20,
      hoverCursor: 'default'
    });
    this.canvas.add(text);
  }

  addArt(artPath: string) {
    fabric.Image.fromURL(artPath, (img) => {
      img.scaleToWidth(50); 
      img.scaleToHeight(50);
      this.canvas.add(img);
    });
  }

  loadArtworkCategory(category: any) {
    category.items.forEach((item: any) => {
      this.addArt(item.path);
    });
  }

  loadShapesCategory() {
    const shapesCategory = this.artworkCategories.find(category => category.name === 'Shapes');
    if (shapesCategory) {
      this.loadArtworkCategory(shapesCategory);
    }
  }

  loadTextArtCategory() {
    const textArtCategory = this.artworkCategories.find(category => category.name === 'Text');
    if (textArtCategory) {
      this.loadArtworkCategory(textArtCategory);
    }
  }

  handleMouseWheel(event: any) {
    const delta = event.e.deltaY;
    let zoom = this.canvas.getZoom();
    zoom = zoom - delta / 200;

    if (zoom > 5) zoom = 5;
    if (zoom < 0.5) zoom = 0.5;

    this.canvas.setZoom(zoom);
    event.e.preventDefault();
    event.e.stopPropagation();
  }


  zoomIn() {
    let zoom = this.canvas.getZoom();
    zoom += 0.1;

    if (zoom > 5) zoom = 5;

    this.canvas.setZoom(zoom);
  }

  zoomOut() {
    let zoom = this.canvas.getZoom();
    zoom -= 0.1;

    if (zoom < 0.5) zoom = 0.5;

    this.canvas.setZoom(zoom);
  }

  downloadImage() {
    const dataURL = this.canvas.toDataURL({ format: 'png' });
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'tshirt_design.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

}
