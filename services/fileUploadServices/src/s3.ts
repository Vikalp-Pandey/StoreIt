import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


// const s3Variables = {
//     region:env.REGION,
//     accessKeyId:env.ACCESS_KEY_ID,
//     secretAccessKey:env.SECRET_ACCESS_KEY
// }

export const S3 = async (region:string,accessKeyId:string,secretAccessKey:string)=>{
    const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    }
});
    return s3Client;
}


/*
 * Uploading a file to a specific S3 bucket
 */

export interface AwsS3Credentials{
   bucket_name:string,
    region:string,
    accessKeyId:string,
    secretAccessKey:string 
}

const generateUploadUrl = async (fileName:string, fileType:string, {
    bucket_name,
    region,
    accessKeyId,
    secretAccessKey   
}:AwsS3Credentials) => {
    const cleanFileName = fileName.replace(/[^\w.-]/g, '');
    // Path where uploaded file gets stored in S3 bucket
    const uniqueKey = `uploads/${cleanFileName}`;

    // ^ PutObjectCommand :"I want to upload a file into the bucket."
    const command = new PutObjectCommand({
        Bucket: bucket_name,
        Key: uniqueKey,
        ContentType: fileType,
        // Optional: Force the file to be private by default
        ACL: 'private' 
    });

    const s3Client = await S3(region,accessKeyId,secretAccessKey)
    const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
    return { url, key: uniqueKey };
};





