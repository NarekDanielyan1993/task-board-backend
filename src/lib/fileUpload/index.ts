// import {
//     DeleteObjectCommand,
//     GetObjectCommand,
//     PutObjectCommand,
//     S3Client,
// } from '@aws-sdk/client-s3';
// import { Readable } from 'stream';
// import { IAttachment, IUploadFilesResponse } from 'types/attachment';
// import Config from 'utils/config';
// import { v4 as uuidV4 } from 'uuid';

// class AwsS3Service {
//     private s3Client: S3Client;

//     constructor() {
//         this.s3Client = new S3Client({
//             region: Config.getEnv('S3_REGION'),
//             credentials: {
//                 accessKeyId: Config.getEnv('S3_ACCESS_KEY'),
//                 secretAccessKey: Config.getEnv('S3_SECRET_KEY'),
//             },
//         });
//     }

//     private setS3BaseSettings(fileName: string) {
//         return {
//             Bucket: Config.getEnv('S3_BUCKET'),
//             Key: `${Config.getEnv('S3_BUCKET_IMAGES')}/${uuidV4()}_${fileName}`,
//         };
//     }

//     async uploadFile(fileData: IAttachment): Promise<string> {
//         try {
//             const buffer = Buffer.from(
//                 fileData.url.replace(/^data:image\/\w+;base64,/, ''),
//                 'base64',
//             );
//             const type = fileData.url.split(';')[0].split('/')[1];
//             const params = {
//                 ...this.setS3BaseSettings(fileData.name),
//                 Body: buffer,
//                 ContentEncoding: 'base64',
//                 ContentType: `image/${type}`,
//             };
//             const uploadCommand = new PutObjectCommand(params);
//             await this.s3Client.send(uploadCommand);
//             return params.Key;
//         } catch (err) {
//             console.error('Error uploading file:', err);
//             throw new Error('Error happened while creating file.');
//         }
//     }

//     async uploadMultipleFiles(
//         files: IAttachment[],
//     ): Promise<IUploadFilesResponse[]> {
//         try {
//             const uploadPromises = files.map(async (fileData: IAttachment) => {
//                 const buffer = Buffer.from(
//                     fileData.url.replace(/^data:image\/\w+;base64,/, ''),
//                     'base64',
//                 );
//                 const type = fileData.url.split(';')[0].split('/')[1];
//                 const params = {
//                     ...this.setS3BaseSettings(fileData.name),
//                     Body: buffer,
//                     ContentLength: buffer.length,
//                     ContentType: `image/${type}`,
//                 };
//                 const uploadCommand = new PutObjectCommand(params);
//                 await this.s3Client.send(uploadCommand);
//                 return {
//                     key: params.Key,
//                     name: fileData.name,
//                 };
//             });
//             return await Promise.all(uploadPromises);
//         } catch (err) {
//             console.error('Error uploading files:', err);
//             throw new Error('Error happened while creating files.');
//         }
//     }

//     async getFileStream(fileId: string): Promise<Readable> {
//         const params = {
//             ...this.setS3BaseSettings(fileId),
//         };

//         try {
//             const command = new GetObjectCommand(params);
//             const response = await this.s3Client.send(command);
//             if (response.Body instanceof Readable) {
//                 return response.Body;
//             }
//             throw new Error('Invalid response for file stream');
//         } catch (err) {
//             console.error('Error getting file stream:', err);
//             throw err;
//         }
//     }

//     async deleteFiles(fileIds: string[]): Promise<string[]> {
//         const deletedFileKeys: string[] = [];
//         try {
//             const deletePromises = fileIds.map(async (fileId) => {
//                 const params = {
//                     Bucket: Config.getEnv('S3_BUCKET'),
//                     Key: fileId,
//                 };
//                 const deleteCommand = new DeleteObjectCommand(params);
//                 await this.s3Client.send(deleteCommand);
//                 deletedFileKeys.push(params.Key);
//             });

//             await Promise.all(deletePromises);

//             return deletedFileKeys;
//         } catch (err) {
//             console.error('Error deleting files:', err);
//             throw err;
//         }
//     }
// }

// export default AwsS3Service;
