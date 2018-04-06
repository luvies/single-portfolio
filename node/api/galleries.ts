import { Router, Request, Response } from 'express';
import { ApiRoute, sqlPrimer } from './base';
import { Connection } from 'mysql';
import { GalleryService } from '../services/gallery.service';

export class Galleries implements ApiRoute {
    constructor(
        private galleryHelper: GalleryService
    ) { }

    mountRoutes(router: Router) {
        // GETs
        router.get('/galleries', (req, res) => this.listGalleries(req, res));
        router.get('/galleries/:galleryId', (req, res) => this.getGallery(req, res));
        router.get('/galleries/:galleryId/images', (req, res) => this.listImages(req, res));
        router.get('/galleries/:galleryId/images/:imageId', (req, res) => this.getImage(req, res));
        // POSTs
        router.post('/galleries', (req, res) => this.createGallery(req, res));
        router.post('/galleries/:galleryId/images', (req, res) => this.createImage(req, res));
        // PATCHes
        router.patch('/galleries/:galleryId', (req, res) => this.updateGallery(req, res));
        router.patch('/galleries/:galleryId/images/:imageId', (req, res) => this.updateImage(req, res));
        // DELETEs
        router.delete('/galleries/:galleryId', (req, res) => this.deleteGallery(req, res));
        router.delete('/galleries/:galleryId/images/:imageId', (req, res) => this.deleteImage(req, res));
    }

    // GET (read) endpoints

    private listGalleries(req: Request, res: Response): void {
        this.galleryHelper.listGalleries((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    }

    private getGallery(req: Request, res: Response): void {
        this.galleryHelper.getGallery(req.params.galleryId, (err, results) => {
            if (err) throw err;
            if (results.length === 0)
                res.status(404).json({
                    error: 'gallery not found',
                    message: `unable to find gallery with id ${req.params.galleryId}`
                });
            else
                res.json(results[0]);
        });
    }

    private listImages(req: Request, res: Response): void {
        this.galleryHelper.listImages(req.params.galleryId, (err, results) => {
            if (err) throw err;
            this.galleryHelper.processImages(results, imgs => {
                res.json(imgs);
            });
        });
    }

    private getImage(req: Request, res: Response): void {
        this.galleryHelper.getImage(req.params.galleryId, req.params.imageId, (err, results) => {
            if (err) throw err;
            if (results.length === 0)
                res.status(404).json({
                    error: 'gallery image not found',
                    message: `unable to find gallery image with id ${req.params.imageId} in gallery ${req.params.galleryId}`
                });
            else
                this.galleryHelper.processImage(results[0], img => {
                    res.json(img);
                });
        });
    }

    // POST (create) endpoints

    private createGallery(req: Request, res: Response): void {

    }

    private createImage(req: Request, res: Response): void {

    }

    // PATCH (update) endpoints

    private updateGallery(req: Request, res: Response): void {

    }

    private updateImage(req: Request, res: Response): void {

    }

    // DELETE (delete) endpoints

    private deleteGallery(req: Request, res: Response): void {

    }

    private deleteImage(req: Request, res: Response): void {

    }
}
