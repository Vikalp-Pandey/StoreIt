import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
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

export const generateUploadUrl = async (fileName:string, fileType:string, {
    bucket_name,
    region,
    accessKeyId,
    secretAccessKey   
}:AwsS3Credentials) => {
    
    const cleanFileName = fileName.replace(/[^\w.-]/g, '') || fileName;
    // Path where uploaded file gets stored in S3 bucket
    const uniqueKey = `uploads/${cleanFileName}`;

    // ^ PutObjectCommand :"I want to upload a file into the bucket."
    const putCommand = new PutObjectCommand({
        Bucket: bucket_name,
        Key: uniqueKey,
        ContentType: fileType,
        // Optional: Force the file to be private by default
        ACL: 'private' 
    });

    const getCommand = new GetObjectCommand({
        Bucket: bucket_name,
        Key: uniqueKey, 
    });
    const s3Client = await S3(region,accessKeyId,secretAccessKey)


    //^ The File URL is the permanent location of the file inside the bucket.
    // const fileUrl = `https://${bucket_name}.s3.amazonaws.com/${uniqueKey}`

    const fileUrl = await getSignedUrl(s3Client,getCommand,{expiresIn:300});
    
    // ^ An Upload URL is a temporary presigned URL that allows a client to upload a file directly to S3.
    // It is generated using the AWS SDK.
    const uploadUrl = await getSignedUrl(s3Client, putCommand, { expiresIn: 300 });

    return { fileUrl,uploadUrl, key: uniqueKey };
};





