import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    async uploadFile(url: string) {
        try {
            const result: UploadApiResponse =
                await cloudinary.uploader.upload(url);
            return {
                url: `v${result.version}/${result.public_id}.${result.format}`,
                publicId: result.public_id,
            };
        } catch (err) {
            console.log(err);
            throw new Error('Error happened while creating file.');
        }
    }

    async uploadFiles(urls: string[]) {
        try {
            const filesPromise = urls.map(async (url) => {
                const result: UploadApiResponse =
                    await cloudinary.uploader.upload(url);
                return {
                    url: result.secure_url,
                    publicId: result.public_id,
                };
            });
            return await Promise.all(filesPromise);
        } catch (err) {
            console.log(err);
            throw new Error('Error happened while creating file.');
        }
    }

    async deleteFile(publicId: string) {
        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (err) {
            throw new Error('Error happened while deleting files.');
        }
    }

    async deleteFiles(publicIds: string[]) {
        try {
            const filesPromise = publicIds.map(async (publicId: string) => {
                await cloudinary.uploader.destroy(publicId);
            });
            return await Promise.all(filesPromise);
        } catch (err) {
            throw new Error('Error happened while deleting files.');
        }
    }
}

export const config = {
    api: { bodyParser: { sizeLimit: '20mb' } },
};

export default CloudinaryService;
